const express = require('express');
const router = express.Router();
const multer = require('multer');
const ocrController = require('./ocr.controller');

const upload = multer({ dest: 'uploads/' });

// Upload ảnh và xử lý OCR
router.post(
  '/upload', 
  upload.single('image'), 
  ocrController.handleOCR.bind(ocrController)
);

module.exports = router;
