const fs = require("fs");

const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/README.md", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "\n--------------------\nFile created!\n--------------------",
      });
    });
  });
};

const copyFile = (imagePath) => {
  if (!imagePath) {
    return false;
  }

  return new Promise((resolve, reject) => {
    fs.copyFile(imagePath, "./dist/screenshot.png", (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "Image copied!\n--------------------",
      });
    });
  });
};

module.exports = { writeFile, copyFile };
