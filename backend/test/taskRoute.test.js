const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../routes/taskRoute');
const SequelizeMock = require('sequelize-mock');

// Create a mock for the task model
const dbMock = new SequelizeMock();
const TaskMock = dbMock.define('task', {
  id: 1,
  taskTitle: 'Test Task',
  taskDescription: 'This is a test task',
  taskDate: '2025-02-24',
  priority: 'medium',
  status: 'todo',
});

// Mock the task model in the controller
jest.mock('../model/taskSchema', () => TaskMock);

// Set up the Express app
const app = express();
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes', () => {
  it('should create a new task', async () => {
    TaskMock.create.mockResolvedValue(TaskMock.build({
      taskTitle: 'New Task',
      taskDescription: 'This is a new task',
      taskDate: '2025-02-24',
      priority: 'medium',
      status: 'todo',
    }));

    const response = await request(app)
      .post('/api/tasks')
      .send({
        taskTitle: 'New Task',
        taskDescription: 'This is a new task',
        taskDate: '2025-02-24',
        priority: 'medium',
        status: 'todo',
      });

    expect(response.status).toBe(201);
    expect(response.body.taskTitle).toBe('New Task');
    expect(response.body.taskDescription).toBe('This is a new task');
    expect(response.body.taskDate).toBe('2025-02-24');
    expect(response.body.priority).toBe('medium');
    expect(response.body.status).toBe('todo');
  });

  it('should get all tasks', async () => {
    TaskMock.findAll.mockResolvedValue([TaskMock.build({
      id: 1,
      taskTitle: 'Test Task',
      taskDescription: 'This is a test task',
      taskDate: '2025-02-24',
      priority: 'medium',
      status: 'todo',
    })]);

    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a task by ID', async () => {
    TaskMock.findOne.mockResolvedValue(TaskMock.build({
      id: 1,
      taskTitle: 'Test Task',
      taskDescription: 'This is a test task',
      taskDate: '2025-02-24',
      priority: 'medium',
      status: 'todo',
    }));

    const response = await request(app).get('/api/tasks/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.taskTitle).toBe('Test Task');
    expect(response.body.taskDescription).toBe('This is a test task');
    expect(response.body.taskDate).toBe('2025-02-24');
    expect(response.body.priority).toBe('medium');
    expect(response.body.status).toBe('todo');
  });

  it('should update a task', async () => {
    TaskMock.findOne.mockResolvedValue(TaskMock.build({
      id: 1,
      taskTitle: 'Test Task',
      taskDescription: 'This is a test task',
      taskDate: '2025-02-24',
      priority: 'medium',
      status: 'todo',
    }));

    const response = await request(app)
      .put('/api/tasks/1')
      .send({ status: 'completed' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task updated successfully');
  });
});