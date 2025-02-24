const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const projectRoutes = require('../routes/projectRoute');
const SequelizeMock = require('sequelize-mock');

// Create a mock for the project model
const dbMock = new SequelizeMock();
const ProjectMock = dbMock.define('project', {
  id: 1,
  projectTitle: 'Test Project',
  projectDescription: 'This is a test project',
  projectDate: '2025-02-24',
  priority: 'medium',
});

// Mock the project model in the controller
jest.mock('../model/projectSchema', () => ProjectMock);

// Set up the Express app
const app = express();
app.use(bodyParser.json());
app.use('/api/projects', projectRoutes);

describe('Project Routes', () => {
  it('should create a new project', async () => {
    ProjectMock.create.mockResolvedValue(ProjectMock.build({
      projectTitle: 'New Project',
      projectDescription: 'This is a new project',
      projectDate: '2025-02-24',
      priority: 'medium',
    }));

    const response = await request(app)
      .post('/api/projects')
      .send({
        projectTitle: 'New Project',
        projectDescription: 'This is a new project',
        projectDate: '2025-02-24',
        priority: 'medium',
      });

    expect(response.status).toBe(201);
    expect(response.body.projectTitle).toBe('New Project');
    expect(response.body.projectDescription).toBe('This is a new project');
    expect(response.body.projectDate).toBe('2025-02-24');
    expect(response.body.priority).toBe('medium');
  });

  it('should get all projects', async () => {
    ProjectMock.findAll.mockResolvedValue([ProjectMock.build({
      id: 1,
      projectTitle: 'Test Project',
      projectDescription: 'This is a test project',
      projectDate: '2025-02-24',
      priority: 'medium',
    })]);

    const response = await request(app).get('/api/projects');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a project by ID', async () => {
    ProjectMock.findOne.mockResolvedValue(ProjectMock.build({
      id: 1,
      projectTitle: 'Test Project',
      projectDescription: 'This is a test project',
      projectDate: '2025-02-24',
      priority: 'medium',
    }));

    const response = await request(app).get('/api/projects/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.projectTitle).toBe('Test Project');
    expect(response.body.projectDescription).toBe('This is a test project');
    expect(response.body.projectDate).toBe('2025-02-24');
    expect(response.body.priority).toBe('medium');
  });

  it('should update a project', async () => {
    ProjectMock.findOne.mockResolvedValue(ProjectMock.build({
      id: 1,
      projectTitle: 'Test Project',
      projectDescription: 'This is a test project',
      projectDate: '2025-02-24',
      priority: 'medium',
    }));

    const response = await request(app)
      .put('/api/projects/1')
      .send({ priority: 'high' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Project updated successfully');
  });
});