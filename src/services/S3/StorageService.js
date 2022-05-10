const AWS = require('aws-sdk');

class StorageService {
  constructor() {
    this._S3 = new AWS.S3();
  }

  writeFile(file, meta) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME, // The S3's bucket name
      Key: +new Date() + meta.filename, // File name that will be saved
      Body: file._data, // File (in Buffer form) that will be saved
      ContentType: meta.headers['content-type'], // MIME Type of file that will be saved
    };

    return new Promise((resolve, reject) => {
      this._S3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data.Location);
      });
    });
  }
}

module.exports = StorageService;
