const issueService = require('../services/issues');
const s3Utils = require('../utils/s3');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.createIssue = async (req, res) => {
  const { issue_title, issue_description, category, oid, issueId } = req.body;
  console.log("🚀 ~ file: issues.js:7 ~ exports.createIssue= ~ req.body:", req.user);

  const attachments = req.files;

  console.log("🚀 ~ file: issues.js:13 ~ exports.createIssue= ~ attachments:", attachments);

  const fileUrls = [];

  for (const element of attachments) {
    const filePath = path.resolve(element.path);
    const fileName = element.originalname;
    try {
      const fileUrl = await s3Utils.putObjectUrl(fileName, element.mimetype);

      // Read file content
      const fileContent = fs.readFileSync(filePath);

      // Upload file to the generated URL
      await axios.put(fileUrl, fileContent, {
        headers: {
          'Content-Type': element.mimetype,
        },
      });

      // get signedUrl
      const downloadUrl = await s3Utils.getObjectUrl(fileName);
      // Delete the file from the uploads directory after successful upload
    //   fs.unlinkSync(filePath);

      fileUrls.push(downloadUrl);

      // Delete the file from the uploads directory after successful upload
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      return res.status(500).json({ message: 'Error uploading file to S3', error });
    }
  }

  // Save issue to your database
  const issue = await issueService.add({
    title: issue_title,
    description: issue_description,
    category,
    attachments: fileUrls, // Save file URLs in your database
    status: 'open',
    oid,
    issueId,
  });

  console.log("🚀 ~ file: issues.js:13 ~ exports.createIssue= ~ issue:", issue);

  res.json({
    message: 'Issue created successfully',
    issue: {
      issue_title,
      issue_description,
      category,
      attachments: fileUrls,
    },
  });
};

exports.changeStatus = async function(req, res) {
  const { reason, issueId, status } = req.body;


  console.log("🚀 ~ file: issues.js:75 ~ exports.getIssues=function ~ { reason, issueId, status }:", { reason, issueId, status });

  let criteria = {};
    criteria = {
      issueId: issueId
  };
    const issues = await issueService.updateOne(criteria, { reason, $set: { status: status }});
    res.json(issues);
};

exports.getIssues = async function(req, res) {
  const { orgId, issueId } = req.query;

  console.log("🚀 ~ file: issues.js:75 ~ exports.getIssues=function ~ orgId:", orgId);

  let criteria = {};
    criteria = {
      ...(orgId && {oid: orgId}),
      ...(issueId && { issueId: issueId})
  };
    const issues = await issueService.get(criteria, {}, { sort: { created_at: -1 }});
    res.json(issues);
};
