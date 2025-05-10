const multer = require('multer');
const { storage } = require('../utils/cloudinary');

// Initialize Multer with Cloudinary storage
const upload = multer({ storage ,limits: { fileSize: 5 * 1024 * 1024 } }); // 5 MB limit});

module.exports = upload;