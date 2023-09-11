import dataSource from "../db/dataSource.js";

import { Job } from "../db/entities/Job.js";

const insertJob = (payload: Job) => {
  const newJob = Job.create(payload);
  return newJob.save();
}

const getAllJobs = async (payload: GetAll) => {
  const page = parseInt(payload.page);
  const pageSize = parseInt(payload.pageSize);

  const [jobs, total] = await Job.findAndCount({
    skip: pageSize * (page - 1),
    take: pageSize,
    order: {
      createdAt: 'ASC'
    },
  })

  return {
    page,
    pageSize: jobs.length,
    total,
    jobs
  };
}

export { insertJob, getAllJobs }