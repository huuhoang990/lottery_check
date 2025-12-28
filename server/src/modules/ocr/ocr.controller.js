const fs = require("fs").promises;
const ocrService = require("./ocr.service");
const { parseLotteryTicket } = require("./ocr.parser");

class OCRController {
  async handleOCR(req, res) {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    try {
      // Extract text from the uploaded image
      const text = await ocrService.extractText(req.file.path);

      // If no text detected, return 404
      if (!text) {
        return res.status(404).json({ message: "No text detected" });
      }

      // Parse the OCR result into lottery ticket data
      const parsed = parseLotteryTicket(text);

      // Return the parsed result
      res.json({
        success: true,
        data: parsed
      });

    } catch (err) {
      console.error("OCR Controller Error:", err);
      res.status(500).json({ error: err.message });
    } finally {
      // Delete the temporary uploaded file
      try {
        if (req.file && req.file.path) {
          await fs.unlink(req.file.path);
        }
      } catch (unlinkErr) {
        console.error("Failed to delete file:", unlinkErr);
      }
    }
  }
}

module.exports = new OCRController();
