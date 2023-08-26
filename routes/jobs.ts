import express from 'express';

import { validateJob } from '../middlewares/validation/job.js';
import { getAllJobs, insertJob } from '../controllers/job.js';
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
  const payload = {
    page: req.query.page?.toString() || '1',
    pageSize: req.query.pageSize?.toString() || '10'
  };

  getAllJobs(payload)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Something went wrong')
    });
});

export default router;


