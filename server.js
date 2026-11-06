const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = 3000;

// Uploads Folder එක සාදන්න
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadDir));

let sharedTexts = [];

// API Endpoints
app.get('/api/files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Cannot list files' });
        const list = files.map(file => {
            const stats = fs.statSync(path.join(uploadDir, file));
            return {
                id: file,
                name: file.replace(/^\d+-/, ''),
                size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
                url: `/uploads/${file}`,
                uploadedAt: stats.mtime
            };
        });
        res.json(list);
    });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ success: true, file: req.file });
});

app.delete('/api/files/:id', (req, res) => {
    const filePath = path.join(uploadDir, req.params.id);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return res.json({ success: true });
    }
    res.status(404).json({ error: 'File not found' });
});

app.get('/api/texts', (req, res) => res.json(sharedTexts));
app.post('/api/texts', (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Text required' });
    const item = { id: Date.now().toString(), content, createdAt: new Date() };
    sharedTexts.unshift(item);
    res.json(item);
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Server is running on port ${PORT}`);
    console.log('-------------------------------------------');
    
    // Get Local IP
    const interfaces = os.networkInterfaces();
    for (let dev in interfaces) {
        for (let details of interfaces[dev]) {
            if (details.family === 'IPv4' && !details.internal) {
                console.log(`📲 Open in Phone/Laptop: http://${details.address}:${PORT}`);
            }
        }
    }
    console.log('-------------------------------------------\n');
});