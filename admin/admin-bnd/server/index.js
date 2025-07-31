require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const modules = require('./models/model');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));
app.use(express.json());
app.use('/api', router);


app.use(errorHandler);


const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)});
  } catch (e) {
    console.error(e);
  }
};


start();