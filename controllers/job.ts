import dataSource from "../db/dataSource.js";
import { Job } from "../db/entities/Job.js";

const insertJob = (payload: Job) => {
  const newJob = Job.create(payload);
  return newJob.save();
}

export { insertJob }