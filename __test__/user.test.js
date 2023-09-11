import '../config.js';
import dataSource, { initDB } from '../dist/db/dataSource.js';
import { login } from "../dist/controllers/user.js";
import jwt from 'jsonwebtoken';

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await dataSource.destroy();
});

const tmpData = {
  "email": "ahmad@email.com",
  "password": "123456"
};

describe("Login process", () => {
  let token;
  beforeAll(async () => {
    token = await login(tmpData.email, tmpData.password);
  })

  it("returns a token", async () => {
    expect(token).toBeTruthy();
  });

  it("has a valid token", () => {
    const tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
    expect(tokenIsValid).toBeTruthy();
  });

  it("has valid payload", () => {
    const payload = jwt.decode(token, { json: true });
    expect(payload?.email).toEqual(tmpData.email);
  });
});