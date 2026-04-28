import { TodoService } from '../JS-TS/solutions/todo-service';
import { TodoApi } from '../JS-TS/solutions/todo-api';
import { TodoStatus } from '../JS-TS/solutions/types';

describe('TodoService', () => {
  let api: TodoApi;
  let service: TodoService;

  beforeAll(() => {
    global.setTimeout = ((cb: Function) => cb()) as any;
  });

  beforeEach(() => {
    api = new TodoApi();
    service = new TodoService(api);
  });

  it('successful creation of a todo', async () => {
    const todo = await service.create('Learn Testing', 'Jest is cool');
    expect(todo.title).toBe('Learn Testing');
    expect(todo.status).toBe(TodoStatus.PENDING);
  });

  it('toggling status', async () => {
    const todo = await service.create('Task to toggle');
    const toggledTodo = await service.toggleStatus(todo.id);
    expect(toggledTodo.status).toBe(TodoStatus.COMPLETED);
  });

  it('search returns matching items', async () => {
    await service.create('Learn TypeScript');
    await service.create('Play Piano');
    const results = await service.search('typescript');
    expect(results.length).toBe(1);
  });

  it('error is thrown when updating non-existing id', async () => {
    await expect(service.toggleStatus(999)).rejects.toThrow('Todo with id 999 not found');
  });


  it('throws validation error for empty title', async () => {
    await expect(service.create('   ')).rejects.toThrow('Validation Error: Title cannot be empty');
  });

  it('throws validation error for invalid id', async () => {
    await expect(service.toggleStatus(-1)).rejects.toThrow('Validation Error: Invalid ID');
  });

  it('throws validation error for empty search keyword', async () => {
    await expect(service.search('')).rejects.toThrow('Validation Error: Search keyword cannot be empty');
  });
});
