const express = require('express');
const excelFileRoutes = require('./routes/excel-file.route');

const app = express();
excelFileRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
