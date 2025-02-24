const request = require('supertest');
const SequelizeMock = require('sequelize-mock');
const express = require('express');
const projectController = require('../controller/project/projectController');

// Create a new Sequelize mock instance
const DBConnectionMock = new SequelizeMock();

// Mock the projectSchema model
jest.mock('../model/projectSchema', () => {
  const projectMock = DBConnectionMock.define('Project', {
    projectId: 1,
    projectTitle: 'Test Project',
    projectDescription: 'Test Description',
    projectDate: '2025-02-24',
    priority: 'medium'
  });

  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  };
});

// Create Express app for testing
const app = express();
app.use(express.json());

// Setup routes for testing
app.post('/projects', projectController.createProject);
app.put('/projects/:id', projectController.update);
app.get('/projects', projectController.getAllProjects);
app.get('/projects/:id', projectController.getProjectById);

describe('Project Controller Tests', () => {
  const mockProject = {
    projectTitle: 'Test Project',
    projectDescription: 'Test Description',
    projectDate: '2025-02-24',
    priority: 'medium'
  };

  describe('createProject', () => {
    it('should create a new project successfully', async () => {
      const response = await request(app)
        .post('/projects')
        .send(mockProject);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Project created successfully');
      expect(response.body.data).toBeDefined();
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteMockProject = {
        projectTitle: 'Test Project'
      };

      const response = await request(app)
        .post('/projects')
        .send(incompleteMockProject);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('All fields are required');
    });
  });

  describe('update', () => {
    it('should update a project successfully', async () => {
      const response = await request(app)
        .put('/projects/1')
        .send({ projectTitle: 'Updated Project' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Project updated successfully');
    });

    it('should return 404 when project not found', async () => {
      const response = await request(app)
        .put('/projects/999')
        .send({ projectTitle: 'Updated Project' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Project not found');
    });
  });

  describe('getAllProjects', () => {
    it('should get all projects successfully', async () => {
      const response = await request(app)
        .get('/projects');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('getProjectById', () => {
    it('should get a project by id successfully', async () => {
      const response = await request(app)
        .get('/projects/1');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should return 404 when project not found', async () => {
      const response = await request(app)
        .get('/projects/999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Project not found');
    });
  });
});