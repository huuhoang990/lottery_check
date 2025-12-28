require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 5000;
const vision = require('@google-cloud/vision');
const path = require('path');
const fs = require('fs');

const keyPath = path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH);

if (!fs.existsSync(keyPath)) {
    console.error("❌ KHÔNG TÌM THẤY FILE KEY TẠI:", keyPath);
}

const client = new vision.ImageAnnotatorClient({
  keyFilename: keyPath
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/test", (req, res) => {
  res.send({
    message: "Your React frontend is connected to the Node-Express backend cccc!",
  });
});

app.post("/test-ocr", async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '..', 'sample3.png');

    // Thực hiện nhận diện văn bản (OCR)
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;

    if (detections.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy văn bản trong ảnh." });
    }

    // detections[0] chứa toàn bộ đoạn văn bản quét được
    const fullText = detections[0].description;

    res.json({
      success: true,
      data: fullText
    });

  } catch (error) {
    console.error('Lỗi OCR:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi quét ảnh.' });
  }
});