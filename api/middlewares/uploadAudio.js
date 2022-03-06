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
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  bucket: process.env.AWS_BUCKET_NAME,
});

// const awsDeleteVideo = async (req, res, next) => {
//   const {
//     params: { id }
//   } = req
//   const video = await Video.findById(id)  // 현재 URL에 전달된 id값을 받아서 db찾음
//   const url = video.fileUrl.split('/')    // video에 저장된 fileUrl을 가져옴
//   const delFileName = url[url.length - 1]  // 버킷에 저장된 객체 URL만 가져옴
//   const params = {
//     Bucket: '버킷이름/video',
//     Key: delFileName
//   }
//   s3.deleteObject(params, function(err, data) {
//     if (err) {
//       console.log('aws video delete error')
//       console.log(err, err.stack)
//     } else {
//       console.log('aws video delete success' + data)
//     }
//   })
//   next()
// }

const uploadFile = multer({ storage }).single("file");

module.exports = { uploadFile };
