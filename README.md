# 📶 LocalDrop - Local Wi-Fi File & Text Sharing

LocalDrop is a lightweight, fast, and local network file & text sharing web application. It allows devices (smartphones, laptops, tablets) connected to the same Wi-Fi network to seamlessly share files and text snippets without requiring an active internet connection.

---

## ✨ Features

- 📁 **Instant File Sharing:** Upload and download documents, images, videos, audio, and archives across local devices.
- 💬 **Quick Text / Link Share:** Share links, code snippets, passwords, or text notes instantly across the network.
- 📱 **QR Code Connection:** Easily join and access the application from mobile devices by scanning the auto-generated QR code.
- 🌐 **Auto Local IP Detection:** Automatically detects and displays your computer's local Wi-Fi IP address and port.
- ⚡ **Offline & Private:** Operates entirely within your local local area network (LAN), preserving privacy and data security.
- 🔄 **Browser Preview Fallback:** Works in local preview mode using `localStorage` even if the backend Node server is offline.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Tailwind CSS (via CDN), Lucide Icons, QRCode.js
- **Backend:** Node.js, Express.js
- **File Processing:** Multer (for handling multi-part file uploads)

---

## 🚀 Quick Setup & Installation

Follow these steps to run the application on your local machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/WiFi-File-Share.git
cd WiFi-File-Share
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Folder Structure Setup
Ensure your HTML file (`index.html`) is placed inside a `public` folder so Express can serve it correctly:
```text
WiFi-File-Share/
├── public/
│   └── index.html
├── uploads/         (Auto-generated)
├── server.js
├── package.json
└── README.md
```

### 4. Start the Server
```bash
npm start
```
*or directly using node:*
```bash
node server.js
```

### 5. Access the App
Once started, the console will display your local IP address:
```bash
🚀 Server is running on port 3000
-------------------------------------------
📲 Open in Phone/Laptop: http://192.168.1.X:3000
-------------------------------------------
```
- Open `http://localhost:3000` on your host PC.
- Open the displayed IP URL (or scan the QR code) on any phone or tablet connected to the same Wi-Fi network.

---

## 📝 License

This project is open-source and available under the [ISC License](LICENSE).
