const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dymoxplvj',
    api_key: '581447427373614',
    api_secret: '27sumSswK98mD2EqhPtc41WreyE'
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // specify the folder name
      format: async (req, file) => 'png', // specify the file format to be uploaded
      public_id: (req, file) => `${Date.now()}-${file.originalname}` // generate a unique public id for each image
    }
  });
  const upload = multer({ storage: storage });

  
  module.exports={upload,cloudinary}