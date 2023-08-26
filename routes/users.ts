import express from 'express';
import { validateUser } from '../middlewares/validation/user.js';
import { insertUser } from '../controllers/user.js';
var router = express.Router();

router.post('/', validateUser, (req, res, next) => {
  insertUser(req.body).then(() => {
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
