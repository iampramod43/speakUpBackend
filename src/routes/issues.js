const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
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
