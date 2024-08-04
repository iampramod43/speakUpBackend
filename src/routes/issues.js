const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
router.post('/create', upload.array('attachments'), issueController.createIssue);
router.get('/get', issueController.getIssues);
router.post('/status', issueController.changeStatus);

module.exports = router;
