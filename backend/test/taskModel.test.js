const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const TaskMock = dbMock.define('task', {
  id: 1,
  taskTitle: 'Test Task',
  taskDescription: 'This is a test task',
  taskDate: '2025-02-24',
  priority: 'medium',
  status: 'todo',
});

describe('Task Model', () => {
  it('should create a new task', async () => {
    const task = await TaskMock.create({
      taskTitle: 'New Task',
      taskDescription: 'This is a new task',
      taskDate: '2025-02-24',
      priority: 'medium',
      status: 'todo',
    });

    expect(task.taskTitle).toBe('New Task');
    expect(task.taskDescription).toBe('This is a new task');
    expect(task.taskDate).toBe('2025-02-24');
    expect(task.priority).toBe('medium');
    expect(task.status).toBe('todo');
  });

  it('should find a task by ID', async () => {
    const task = await TaskMock.findOne({ where: { id: 1 } });

    expect(task.id).toBe(1);
    expect(task.taskTitle).toBe('Test Task');
    expect(task.taskDescription).toBe('This is a test task');
    expect(task.taskDate).toBe('2025-02-24');
    expect(task.priority).toBe('medium');
    expect(task.status).toBe('todo');
  });

  it('should update a task', async () => {
    const task = await TaskMock.findOne({ where: { id: 1 } });
    task.status = 'completed';
    await task.save();

    expect(task.status).toBe('completed');
  });
});