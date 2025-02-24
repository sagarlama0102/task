const request = require('supertest');
const SequelizeMock = require('sequelize-mock');
const express = require('express');
const taskController = require('../controller/task/taskController');

// Create a new Sequelize mock instance
const DBConnectionMock = new SequelizeMock();

// Mock the taskSchema model
jest.mock('../model/taskSchema', () => {
  const taskMock = DBConnectionMock.define('Task', {
    taskId: 1,
    taskTitle: 'Test Task',
    taskDescription: 'Test Description',
    taskDate: '2025-02-24',
    priority: 'medium',
    status: 'pending'
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
app.post('/tasks', taskController.createTask);
app.put('/tasks/:id', taskController.update);
app.get('/tasks', taskController.getAllTasks);
app.get('/tasks/:id', taskController.getTaskbyId);

describe('Task Controller Tests', () => {
  const mockTask = {
    taskTitle: 'Test Task',
    taskDescription: 'Test Description',
    taskDate: '2025-02-24',
    priority: 'medium',
    status: 'pending'
  };

  describe('createTask', () => {
    it('should create a new task successfully', async () => {
      const response = await request(app)
        .post('/tasks')
        .send(mockTask);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Task created successfully');
      expect(response.body.data).toBeDefined();
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteMockTask = {
        taskTitle: 'Test Task'
      };

      const response = await request(app)
        .post('/tasks')
        .send(incompleteMockTask);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('All fields are required');
    });

    it('should return 400 for invalid priority', async () => {
      const invalidPriorityTask = {
        ...mockTask,
        priority: 'invalid'
      };

      const response = await request(app)
        .post('/tasks')
        .send(invalidPriorityTask);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid priority value');
    });
  });

  describe('update', () => {
    it('should update a task successfully', async () => {
      const response = await request(app)
        .put('/tasks/1')
        .send({ taskTitle: 'Updated Task' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task updated successfully');
    });

    it('should return 404 when task not found', async () => {
      const response = await request(app)
        .put('/tasks/999')
        .send({ taskTitle: 'Updated Task' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('getAllTasks', () => {
    it('should get all tasks successfully', async () => {
      const response = await request(app)
        .get('/tasks');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('getTaskById', () => {
    it('should get a task by id successfully', async () => {
      const response = await request(app)
        .get('/tasks/1');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should return 404 when task not found', async () => {
      const response = await request(app)
        .get('/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Task not found');
    });
  });
});