const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multerS3({
  s3,
  acl: "public-read",
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: (req, file, callback) => {
    callback(null, file.mimetype);
  },
});

const deleteAudio = async (req, res, next) => {
  const { filename } = req.body;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log("aws video delete error");
      console.log(err, err.stack);
    } else {
      console.log("aws video delete success" + data);
    }
  });

  next();
};

const uploadAudio = multer({ storage }).single("file");

module.exports = { uploadAudio, deleteAudio };
