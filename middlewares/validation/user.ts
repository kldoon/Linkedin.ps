import express from 'express';
import isEmail from 'validator/lib/isEmail.js';

const validateUser = (req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const values = ['fullName', 'email', 'password', 'type'];
  const user = req.body;
  const errorList: string[] = [];

  values.forEach(key => {
    if (!user[key]) {
      errorList.push(`${key} is Required!`);
    }
  });

  if (errorList.length) {
    return next({
      code: "INVALID_INPUT",
      message: errorList.join(' ')
    });
  } 

  if (!isEmail.default(user.email)) {
    errorList.push('Email is not Valid');
  }

  if (user.password?.length < 6) {
    errorList.push('Password should contain at least 6 characters!');
  }

  if (!['employee', 'employer'].includes(user.type)) {
    errorList.push('User type unknown!');
  }

  if (errorList.length) {
    next({
      code: "INVALID_INPUT",
      message: errorList.join(', ')
    });
  } else {
    next();
  }
}



export {
  validateUser
}