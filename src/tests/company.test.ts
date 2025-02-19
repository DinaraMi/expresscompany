import request from 'supertest';
import app from '../app';

describe('Company API Endpoints', () => {
    let token = '';

    beforeAll(async () => {
        const response = await request(app).post('/v1/auth/login').send({
            username: 'testovuser',
            password: 'passwordtest'
        });
        token = response.body.token;
    });

    it('should create a new company', async () => {
        const res = await request(app)
            .post('/v1/companies')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Company',
                type: 'IT',
                status: 'Active',
                address: '123 Test St'
            });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Company');
    });

    it('should retrieve companies', async () => {
        const res = await request(app)
            .get('/v1/companies')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});