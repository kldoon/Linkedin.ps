import '../config.js';
import dataSource, { init } from '../dist/db/dataSource.js';
import { login } from "../dist/controllers/user.js";

beforeAll(async () => {
    await init();
});

describe("login", () => {
    it('return token', async () => {
        const token = await login('sarah@gmail.com', '123456');
        expect(token).toBeTruthy()
    })
})