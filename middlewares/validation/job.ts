import express from 'express';

const validateJob = (req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const values = ['company', 'title', 'description', 'postDate', 'deadline'];
  const user = req.body;
  const errorList = values.map(key => !user[key] && `${key} is Required!`).filter(Boolean);

  if (errorList.length) {
    res.status(400).send(errorList);
  } else {
    next();
  }
}



export {
  validateJob
}