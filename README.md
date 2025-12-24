# Social Group Chat App – Backend

Backend service for a real-time **group chat application** that allows users to send text and images in groups, with **push notifications** for new messages.

This backend focuses on **real-time communication, media handling, and notifications**, keeping authentication intentionally minimal for simplicity and demo purposes.

---

## 🔗 Related Project
- Frontend Repository: https://github.com/YashwantBhole/MERN-Social-ChatApp-Frontend
- Live App: https://firemern.netlify.app/

---

## 🚀 Features

- Real-time group messaging using WebSockets
- Group chat without authentication (demo-focused)
- Image sharing via Cloudinary
- Push notifications using Firebase Cloud Messaging (FCM)
- Message persistence in database
- REST APIs for chat operations

---

## 🧠 Architecture Overview

Client (Frontend)  
→ WebSocket connection (real-time messages)  
→ REST APIs (message storage, notifications)  
→ Cloudinary (image uploads)  
→ Firebase FCM (push notifications)

---

## 🛠 Tech Stack

- Backend Framework: Node.js + Express
- Real-time Communication: Socket.IO
- Database: MongoDB
- Image Storage: Cloudinary
- Push Notifications: Firebase Cloud Messaging (FCM)
- Environment Config: dotenv

---

## 📦 Core Modules

- Message handling (text & images)
- Group-based message broadcasting
- Cloudinary image upload integration
- FCM token registration & notification trigger
- WebSocket connection management

---

## 🔔 Push Notifications (FCM)

- Each client generates an FCM token on login/load
- Token is stored on backend
- Notifications are triggered when a new message is sent to the group
- Supports background and foreground notifications

---

## 🖼 Image Upload Flow

1. Client uploads image
2. Backend uploads image to Cloudinary
3. Cloudinary URL is saved with the message
4. URL is broadcast to all group members in real time

---

## ⚠ Authentication Note

This application **does not implement authentication**.

Reason:
- Designed as a **real-time systems demo**
- Focuses on messaging, sockets, media handling, and notifications
- Any user can join using a display name

> Authentication (JWT / OAuth) can be added easily in future iterations.

---

## 📁 Environment Variables

Create a `.env` file with the following:

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
---
## 👤 Author & Connect With Me

<div align="left">

### **Yashwant Bhole**

<p align="left">  
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

