import multer from "multer";

const storage = multer.memoryStorage();

export const image = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error("File format is not supported."));
    }
    cb(null, true);
  }
});