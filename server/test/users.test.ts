import request from 'supertest';
import mongoose from 'mongoose';
import { User } from '../src/models/user.model';
import app from '../src/app';

const ROOT_URI = '/api/users';
const users = [
    {
        email: 'safiusername@gmail.com',
        password: 'safipassword',
        username: 'safiusername',
    },
    {
        username: 'admin',
        password: 'admin@Pass331',
        email: 'admin@easyhackctf.com',
        isAdmin: true,
    },
];

describe('User controller', () => {
    // init the db with some seed
    beforeAll(async () => {
        mongoose.connect(process.env.TEST_DB, { useNewUrlParser: true, autoIndex: false });
        await User.create(users[0]);
        await User.create(users[1]);
        console.log('DB is ready');
    });

    // login mock login for testing
    const login = async ({ username, password }: { username: string, password: string }) => {
        const data = {
            password,
            username,
        };
        const response = await request(app)
            .post(`${ROOT_URI}/login`)
            .send(data);
        return response.body;
    };

    it('Should get users', async () => {
        const response = await request(app).get(ROOT_URI);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
    });

    it('Should signup a user', async () => {
        const data = {
            email: 'safiahmed@gmail.com',
            password: '123456789',
            username: 'mustafabalila44',
        };
        const response = await request(app)
            .post(`/api/users/signup`)
            .send(data);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
    }, 10000);

    it('Should get a user by id', async () => {
        const data = await login({
            password: 'safipassword',
            username: 'safiusername',
        });
        const response = await request(app).get(`${ROOT_URI}/${data.user._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
    });

    it('Should updates a user by id', async () => {
        const data = await login({
            password: 'safipassword',
            username: 'safiusername',
        });
        const response = await request(app)
            .put(`${ROOT_URI}/${data.user._id}`)
            .set('Authorization', `Bearer ${data.token}`)
            .send({
                score: data.user.score,
                username: 'safiUpdated',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.username).toBe('safiUpdated');
    });

    it('Should promote a user', async () => {
        const adminData = await login({
            username: 'admin',
            password: 'admin@Pass331',
        });
        const data = await login({
            password: '123456789',
            username: 'mustafabalila44',
        });
        const response = await request(app)
            .post(`${ROOT_URI}/${data.user._id}/promote`)
            .set('Authorization', `Bearer ${adminData.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.user.isAdmin).toBeTruthy();
    });
    // empty the db
    afterAll(async () => await mongoose.connection.collections.users.drop());
});
