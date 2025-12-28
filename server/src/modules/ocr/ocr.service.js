const client = require("../../config/vision.config");

async function extractText(imagePath) {
  const [result] = await client.textDetection(imagePath);
  const detections = result.textAnnotations;

  if (!detections || detections.length === 0) {
    return null;
  }

  return detections[0].description;
}

module.exports = {
  extractText
};
