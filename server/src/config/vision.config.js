const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs");

const keyPath = path.join(
  __dirname,
  "../",
  process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH
);

if (!fs.existsSync(keyPath)) {
  throw new Error("Google Vision credential file not found");
}

const client = new vision.ImageAnnotatorClient({
  keyFilename: keyPath
});

module.exports = client;
