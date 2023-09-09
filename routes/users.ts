import express from 'express';
import { validateUser } from '../middlewares/validation/user.js';
import { insertUser, login } from '../controllers/user.js';
var router = express.Router();

router.post('/', validateUser, (req, res, next) => {
  insertUser(req.body).then(() => {
    res.status(201).send()
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  login(email, password)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(401).send(err);
    })
});

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;
