<div align="center">

# 💬 Social Group Chat App — Backend

A **real-time group chat backend** that supports text & image messaging with **push notifications**, built using Socket.IO, MongoDB, Cloudinary, and Firebase Cloud Messaging (FCM).

This backend focuses on **real-time messaging, media handling, and notifications**, while keeping authentication intentionally minimal for demo and learning purposes.

</div>

---

## 🔗 Related Repository

- **Frontend App:** https://github.com/YashwantBhole/mern-social-chatapp-frontend
- **Live Demo:** https://firemern.netlify.app/  

---

## 🚀 Features

- ⚡ **Real-time group messaging** via Socket.IO  
- 🖼 **Image sharing** with Cloudinary file hosting  
- 🔔 **Push notifications** using Firebase Cloud Messaging  
- 💬 **Persistent chat history** stored in MongoDB  
- 🌍 **Broadcast messaging** across group users  
- 🛠 **REST APIs for message and media operations**  
- 🔓 **No authentication (demo-friendly)** — anyone can join with a name  

---

## 🧠 Architecture Overview

Client (Frontend)  
→ WebSocket connection (real-time messages)  
→ REST APIs (message storage, notifications)  
→ Cloudinary (image uploads)  
→ Firebase FCM (push notifications)


---

## 🛠 Tech Stack

**Backend Framework**
- Node.js + Express

**Real-Time Layer**
- Socket.IO

**Database**
- MongoDB + Mongoose

**Media Storage**
- Cloudinary

**Push Notifications**
- Firebase Cloud Messaging (FCM)

**Configuration**
- dotenv

---

## 📦 Core Capabilities

### 📨 Real-Time Messaging
- Messages broadcast instantly to all group members  
- Supports multiple users simultaneously  

### 🖼 Image Uploads
- Images uploaded from client  
- Stored securely in **Cloudinary**  
- Shared back as hosted URLs  

### 🔔 Push Notifications
- Every client registers an **FCM token**  
- Notifications pushed when messages are sent  
- Works in **foreground & background**  

### 💾 Message Persistence
- All chat messages stored in MongoDB  
- New users can still see previous chats  

---

## 🔔 Push Notification Flow (FCM)

1️⃣ Client generates FCM token  
2️⃣ Token is registered with backend  
3️⃣ When a new message is sent  
4️⃣ Backend triggers an FCM push notification  
5️⃣ All users receive an alert  

---

## 🖼 Image Upload Flow

1️⃣ User uploads an image  
2️⃣ Backend uploads to **Cloudinary**  
3️⃣ Cloudinary returns a public URL  
4️⃣ URL is stored + broadcast to all group users  

---

## ⚠️ Authentication Note

This project **does not use authentication by design**.

Why?

✔ Focus is on **real-time systems, sockets & notifications**  
✔ Reduces onboarding friction for demo usage  
✔ Any user can join with a simple display name  

> Authentication (JWT, OAuth, etc.) can be added easily in future releases.

---

## 🔧 Environment Variables

Create a **`.env`** file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

```
>🔒 Keep your keys private — never commit .env files.

---

# ▶️ Local Development

### Install dependencies
```bash
npm install
```

### Start Dev Server
```bash
npm run dev
```
### server runs at
```bash
localhost:4000
```

---

## 👤 Author & Connect With Me

<div align="center">
  
### **Yashwant Bhole**

<p align="center">  
  <a href="https://www.linkedin.com/in/yashwantbhole/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="mailto:yashwantbhole2004@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
  </a>
  <a href="https://github.com/YashwantBhole" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
</p>

💼 *Full Stack Developer — MERN • Java • Spring Boot*  
🌟 *Building AI-powered systems with clean architecture and strong UI/UX.*

</div>

---

