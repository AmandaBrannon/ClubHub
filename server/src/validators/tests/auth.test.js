const request = require('supertest');
const { registerValidation, loginValidation } = require('../auth');
const db = require('../db');
const app = require('../index'); // Assume `index.js` is your main app file

// Mock database queries
jest.mock('../db', () => ({
  query: jest.fn(),
}));

describe('Auth Validation Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Register Validation', () => {
    it('should validate a correct email and password for registration', async () => {
      db.query.mockResolvedValueOnce({ rows: [] }); // Mock that email does not exist

      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.statusCode).not.toEqual(400); // Should not return a validation error
    });

    it('should fail if email is invalid for registration', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].msg).toEqual('Please provide a valid email.');
    });

    it('should fail if password is too short or too long', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: '123', // Too short
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].msg).toEqual('Password has to be between 6 and 15 characters.');
    });

    it('should fail if email already exists', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ email: 'test@example.com' }] });

      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].msg).toEqual('Email already exists.');
    });
  });

  describe('Login Validation', () => {
    it('should fail if email does not exist during login', async () => {
      db.query.mockResolvedValueOnce({ rows: [] }); // Mock no user found

      const response = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].msg).toEqual('Email does not exists.');
    });

    it('should fail if password is incorrect during login', async () => {
      db.query.mockResolvedValueOnce({
        rows: [{ email: 'test@example.com', password: '$2a$10$...' }], // Mock existing user with hashed password
      });

      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Mock bcrypt comparison to fail

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].msg).toEqual('Incorrect password');
    });

    it('should log in successfully with correct email and password', async () => {
      db.query.mockResolvedValueOnce({
        rows: [{ email: 'test@example.com', password: '$2a$10$...' }], // Mock user data
      });

      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // Mock bcrypt comparison to succeed

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('message', 'Login successful');
    });
  });
});
