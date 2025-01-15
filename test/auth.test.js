const request = require('supertest');
const app = require('../server');  // Assuming server.js is the entry point
const chai = require('chai');
const expect = chai.expect;

describe('Authentication and Authorization', () => {

  let authToken = '';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'user@test.com', password: 'password123', role: 'user' });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('User registered successfully');
  });

  it('should login the user and return a JWT', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'user@test.com', password: 'password123' });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Login successful');
    authToken = res.headers['set-cookie'][0].split(';')[0].split('=')[1];  // Extract the JWT from cookies
  });

  it('should access a secure route', async () => {
    const res = await request(app)
      .get('/secure')
      .set('Cookie', `accessToken=${authToken}`);  // Send JWT in cookies

    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Secure data accessed');
  });

  it('should not access admin route without admin role', async () => {
    const res = await request(app)
      .get('/admin-only')
      .set('Cookie', `accessToken=${authToken}`);

    expect(res.status).to.equal(403);
    expect(res.body.message).to.equal('Forbidden: Admin role required');
  });

});
