import { NSUser } from "../@types/user.js";
import { User } from "../db/entities/User.js";
import { EmployeeProfile } from "../db/entities/EmployeeProfile.js";
import { CompanyProfile } from "../db/entities/CompanyProfile.js";
import dataSource from "../db/dataSource.js";

const insertUser = (payload: NSUser.Item) => {
  return dataSource.manager.transaction(async transaction => {
    const newUser = User.create(payload);
    await transaction.save(newUser);
    if (payload.type === 'employee') {
      const employee = EmployeeProfile.create({
        applications: [],
        cvUrl: payload.cvUrl || ''
      });
      employee.user = newUser;
      await transaction.save(employee);
    } else if (payload.type === 'employer') {
      const company = new CompanyProfile();
      company.user = newUser;
      company.description = payload.description || '';
      company.name = payload.fullName || '';
      await transaction.save(company);
    }
  });
}

export { insertUser }