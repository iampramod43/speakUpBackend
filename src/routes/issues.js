const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues');
const multer = require('multer');
const fs = require('fs'); // Import the file system module
const path = require('path');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';

    // Check if the directory exists
    if (!fs.existsSync(dir)) {
      // Create the directory if it doesn't exist
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    } else {
      console.log(`Directory already exists: ${dir}`);
    }

    console.log(`Saving file to: ${dir}`);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    console.log(`Saving file as: ${filename}`);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });
router.post('/create', upload.array('attachments'), issueController.createIssue);
router.get('/get', issueController.getIssues);
router.post('/status', issueController.changeStatus);

module.exports = router;
