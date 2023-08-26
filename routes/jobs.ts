import express from 'express';

import { validateJob } from '../middlewares/validation/job.js';
import { insertJob } from '../controllers/job.js';
var router = express.Router();

router.post('/', validateJob, (req, res, next) => {
  insertJob(req.body).then(() => {
    res.status(201).send()
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;


