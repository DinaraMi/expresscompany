import request from 'supertest';
import app from '../app';

describe('Contact API Endpoints', () => {
    let token = '';

    beforeAll(async () => {
        const response = await request(app).post('/v1/auth/login').send({
            username: 'testovuser',
            password: 'passwordtest'
        });
        token = response.body.token;
    });

    it('should create a new contact', async () => {
        const res = await request(app)
            .post('/v1/contacts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '1234567890',
                companyId: '603e6d8f8f1b2b6b8c8aeb6d'
            });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('John Doe');
    });

    it('should retrieve contacts', async () => {
        const res = await request(app)
            .get('/v1/contacts')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
