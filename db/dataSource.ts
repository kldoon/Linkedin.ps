import { DataSource } from "typeorm";
import { Application } from "./entities/Application.js";
import { CompanyProfile } from "./entities/CompanyProfile.js";
import { EmployeeProfile } from "./entities/EmployeeProfile.js";
import { Job } from "./entities/Job.js";
import { User } from "./entities/User.js";

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'linkedin_ps',
  entities: [
    Application,
    CompanyProfile,
    EmployeeProfile,
    Job,
    User
  ],
  migrations: ['./**/migration/*.ts'],
  synchronize: true,
  logging: true
});

dataSource.initialize().then(() => {
  console.log("Connected to DB!");
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

export default dataSource;