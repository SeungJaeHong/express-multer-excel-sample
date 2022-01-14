const multer = require('multer');

const excelFilter = (req, file, cb) => {
  if (!file) {
    cb(new Error('파일을 등록 해 주세요.'));
  }
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml')
  ) {
    cb(null, true);
  } else {
    cb(new Error('엑셀 파일만 등록 가능합니다.'), false);
  }
};

const uploadExcelFileExceptionHandler = (err, req, res, next) => {
  if (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
  next();
};

const uploadExcelFile = multer({
  fileFilter: excelFilter,
});

module.exports = {
  uploadExcelFile,
  uploadExcelFileExceptionHandler,
};
