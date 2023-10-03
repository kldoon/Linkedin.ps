import './config.js';
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import cookieParser from 'cookie-parser';

import dataSource, { initDB } from './db/dataSource.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import jobsRouter from './routes/jobs.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticate } from './middlewares/auth/authenticate.js';
import baseLogger from './logger.js';
import { error404Handler, errorLogger, errorSender } from './middlewares/errorHandlers/genericHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

const PORT = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobs', authenticate, jobsRouter);

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(500).send("Failed Upload File!");
    return;
  }
  const fileURL = req.file.destination + req.file.filename;
  res.send({
    message: 'File Uploaded Successfully!',
    file: fileURL
  });
});

app.get('/file', (req, res) => {
  const fileName = req.query.name?.toString() || '';
  try {
    const data = fs.readFileSync('uploads/' + fileName, 'utf-8');
    const JSONData = JSON.parse(data) as any[];
    res.send(JSONData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.use(errorLogger);
app.use(errorSender);
app.use(error404Handler);

app.listen(PORT, () => {
  baseLogger.info(`App is listening on port ${PORT}`);
  initDB();
});

export default app;
