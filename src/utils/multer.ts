
import multer from 'multer';
import path  from 'path'
const MESSAGE_TYPE: string = 'File type is not supported';
// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../public/upload'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+ file.originalname );
  }
})
export default multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/gif"){
        cb(null, true);
    }else{
        return cb(new Error(MESSAGE_TYPE))
    }
  }
});
