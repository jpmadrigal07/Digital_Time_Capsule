const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("file", 10);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async file => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `bezkoder-${filename}-${Date.now()}.jpeg`;

      await sharp(file.buffer)
        .resize(1024, 1024)
        .toFormat("jpg")
        .jpeg({ quality: 90 })
        .toFile(`./public/uploads/${newFilename}`);

      req.body.mediaURL = 'uploads/'+newFilename;
    })
  );

  next();
};

const resizeImagesSmaller = async (req, res, next) => {
    if (!req.files) return next();
  
    await Promise.all(
      req.files.map(async file => {
        const filename = file.originalname.replace(/\..+$/, "");
        const newFilename = `small-bezkoder-${filename}-${Date.now()}.jpeg`;
  
        await sharp(file.buffer)
          .resize(512, 512)
          .toFormat("jpg")
          .jpeg({ quality: 90 })
          .toFile(`./public/uploads/${newFilename}`);
  
        req.body.smallerMediaURL = 'uploads/'+newFilename;
      })
    );
  
    next();
  };

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  resizeImagesSmaller: resizeImagesSmaller
};