const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const ProjectMock = dbMock.define('project', {
  id: 1,
  projectTitle: 'Test Project',
  projectDescription: 'This is a test project',
  projectDate: '2025-02-24',
  priority: 'medium',
});

describe('Project Model', () => {
  it('should create a new project', async () => {
    const project = await ProjectMock.create({
      projectTitle: 'New Project',
      projectDescription: 'This is a new project',
      projectDate: '2025-02-24',
      priority: 'medium',
    });

    expect(project.projectTitle).toBe('New Project');
    expect(project.projectDescription).toBe('This is a new project');
    expect(project.projectDate).toBe('2025-02-24');
    expect(project.priority).toBe('medium');
  });

  it('should find a project by ID', async () => {
    const project = await ProjectMock.findOne({ where: { id: 1 } });

    expect(project.id).toBe(1);
    expect(project.projectTitle).toBe('Test Project');
    expect(project.projectDescription).toBe('This is a test project');
    expect(project.projectDate).toBe('2025-02-24');
    expect(project.priority).toBe('medium');
  });

  it('should update a project', async () => {
    const project = await ProjectMock.findOne({ where: { id: 1 } });
    project.priority = 'high';
    await project.save();

    expect(project.priority).toBe('high');
  });
});