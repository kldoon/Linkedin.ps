import express from "express";
import baseLogger from "../../logger.js";

const errorLogger = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  baseLogger.error("Something went wrong [From middleware]:");
  baseLogger.error(error.message || error);
  next(error);
}

const errorSender = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {    
  if (error.code === "INVALID_CREDENTIALS") {
    res.status(401).send("Invalid Credentials!");
  } else if (error.code === "INVALID_INPUT") {
    res.status(400).send(error.message || error);
  } else {
    res.status(500).send("Something went wrong!");
  }
}

const error404Handler = (
  req: express.Request,
  res: express.Response,
) => {
  res.status(404).send("Invalid Request Path!");
}

export {
  errorLogger,
  errorSender,
  error404Handler
}