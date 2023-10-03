import express from 'express';
import { validateUser } from '../middlewares/validation/user.js';
import { insertUser, login, insertRole, insertPermission, getRoles } from '../controllers/user.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';

var router = express.Router();

router.post('/', validateUser, (req, res, next) => {
  insertUser(req.body).then(() => {
    res.status(201).send();
  }).catch(err => {
    next(err);
  });
});

router.post('/role', authorize('POST_users/role'), authenticate, (req, res, next) => {
  insertRole(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/permission', authenticate, (req, res, next) => {
  insertPermission(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  login(email, password)
    .then(data => {
      res.cookie('fullName', data.fullName, {
        maxAge: 60 * 60 * 1000
      });
      res.cookie('loginTime', Date.now(), {
        maxAge: 60 * 60 * 1000
      });
      res.cookie('token', data.token, {
        maxAge: 60 * 60 * 1000
      });

      res.send();
    })
    .catch(err => {
      next({
        code: "INVALID_CREDENTIALS",
        message: err
      });
    })
});

router.get('/roles', authorize('GET_users/role'), authenticate, async (req, res, next) => {
  try {
    const roles = await getRoles();
    res.send(roles);
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res, next) => {
  res.cookie('fullName', '', {
    maxAge: -1,  // This means the cookie will be deleted
    expires: new Date(Date.now() - 1000)
  });
  res.cookie('loginTime', '', {
    maxAge: -1
  });
  res.cookie('token', '', {
    maxAge: -1
  });

  res.send();
});

export default router;
