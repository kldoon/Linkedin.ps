import { NSUser } from "../@types/user.js";
import { User } from "../db/entities/User.js";
import { EmployeeProfile } from "../db/entities/EmployeeProfile.js";
import { CompanyProfile } from "../db/entities/CompanyProfile.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

const login = async (email: string, password: string) => {
  try {
    const user = await User.findOneBy({
      email
    });

    const passwordMatching = await bcrypt.compare(password, user?.password || '');

    if (user && passwordMatching) {
      const token = jwt.sign(
        {
          email: user.email,
          fullName: user.fullName
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: "30m"
        }
      );

      return token;
    } else {
      throw ("Invalid Username or password!");
    }
  } catch (error) {
    throw ("Invalid Username or password!");
  }
}

export {
  insertUser,
  login
}