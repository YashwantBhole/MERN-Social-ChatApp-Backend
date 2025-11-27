// backend/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./db');
const admin = require('firebase-admin')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: ['https://firemern.netlify.app', 'http://localhost:5173'] } });

app.use(cors({
  origin :[ 'https://firemern.netlify.app', 'http://localhost:5173' ]
}));
app.use(express.json());


//firebase-admin init
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("firebase-admin initialized");
  } catch (err) {
    console.log("Invalid Firebase Service Account JSON", err.message);
  }
} else {
  console.log("Firebase service account is not initialized, Push notifications disabled");
}


//cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})


// multer memory storage (no temp files)
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Mongoose models
const MessageSchema = new mongoose.Schema({
  from: String,
  text: String,
  image: String
}, { timestamps: true });
const Message = mongoose.model('Message', MessageSchema);

const User = require('./models/User');

// Connect DB
connectDB();


//Save/Update fcm token for users
//Expects email , token, name
app.post('/api/token', async (req, res) => {
  try {
    const { email, token, name } = req.body;
    if (!email || !token) return res.status(400).json({ error: "email and token required" });

    const update = { email, fcmToken: token };
    if (name) update.name = name;

    const user = await User.findOneAndUpdate({ email }, update, { upsert: true, new: true, setDefaultsOnInsert: true });
    return res.json({ ok: true, user });

  } catch (err) {
    console.error("token save error", err);
    res.status(500).json({ error: "server error " });
  }
});



// POST /api/upload  -> accepts form field 'file'
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });


    // helper: upload buffer with upload_stream
    const uploadFromBuffer = (buffer) => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'social-min' }, // optional folder (no trailing space)
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(buffer);
    });

    const result = await uploadFromBuffer(req.file.buffer);
    return res.json({ url: result.secure_url, raw: result });
  } catch (err) {
    console.error('upload error', err);
    return res.status(500).json({ error: 'upload failed' });
  }
});


//delete route => to delete uploaded images
app.delete("/api/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Message not found" });

    // Delete uploaded image file if exists
    if (deleted.image) {
      const filePath = path.join(process.cwd(), "uploads", path.basename(deleted.image));
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Image delete error:", err.message);
      });
    }

    io.emit("messageDeleted", id);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


//Endpoints to list users
app.get('/api/users', async (req, res) => {
  const users = await User.find().lean();
  res.json(users);
});


//scoket.io for chat + push notifications 
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on('join', (user) => {
    socket.user = user;
    console.log('join', user);
  });


  socket.on('message', async (payload) => {
    //payload {from, text, image}
    try {
      const msg = await Message.create(payload);
      io.emit("message", msg);

      //send fcm pushes to other users if Firebase Service Account Initialized
      if (admin.apps.length) {
        //find reciepiennts with tokens exxcluding sender
        const recipients = await User.find({ email: { $ne: payload.from }, fcmToken: { $exists: true, $ne: null } }).lean();
        let tokens = recipients.map(r => r.fcmToken).filter(Boolean);
        tokens = Array.from(new Set(tokens)); 

        if (tokens.length) {
          const fcmMessage = {
            notification: {
              title: payload.from,
              body: payload.text ? payload.text.slice(0, 100) : "Sent an image",
            },
            data: {
              type: 'chat',
              sender: payload.from,
              //include message id
              messageId: msg._id.toString(),
            },
            tokens,
          };

          const response = await admin.messaging().sendEachForMulticast(fcmMessage);
      

          //clean up invalid tokens
          if (response.failureCount > 0) {
            const toRemove = [];
            response.responses.forEach((r, idx) => {
              if (!r.success) {
                const code = r.error && r.error.code;
                if (code === 'messaging/invalid-registration-token' || code === 'messaging/registration-token-not-registered') {
                  toRemove.push(tokens[idx]);
                }
              }
            });
            if (toRemove.length) {
              await User.updateMany({ fcmToken: { $in: toRemove } }, { $unset: { fcmToken: "" } });
              console.log('Removed invalid tokens:', toRemove.length);
            }
          }

        }
      }

    } catch (err) {
      console.log(err, "message handler error")
    }
  });



  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });

});


// API: last messages
app.get('/api/messages', async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: 1 }).limit(200);
  res.json(msgs);
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('Backend listening on', PORT));
