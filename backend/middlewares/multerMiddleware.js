import multer from "multer";
// const upload = multer({ dest: "./public/temp" });
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname);
  },
});
export const upload = multer;
({ storage: storage });

