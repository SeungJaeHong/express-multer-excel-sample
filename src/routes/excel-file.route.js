const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excel-file.controller');
const {
  uploadExcelFile,
  uploadExcelFileExceptionHandler,
} = require('../middlewares/excel-file.middleware');

const routes = (app) => {
  router.post(
    '/members',
    uploadExcelFile.single('file'),
    uploadExcelFileExceptionHandler,
    excelController.readMembersFromExcelFile
  );

  app.use('/api/v1/excel', router);
};

module.exports = routes;
