import { TodoApi } from './todo-api';
import { TodoService } from './todo-service';
import { Todo, TodoStatus } from './types';

export class ToDoManager {
  private api: TodoApi;
  private service: TodoService;

  constructor() {
    this.api = new TodoApi();
    this.service = new TodoService(this.api);
  }
  async init(): Promise<void> {
    await this.service.create('Learn TypeScript', 'Finish the pre-training course');
    await this.service.create('Drink coffee', 'Get an energy boost');
  }
  async add(title: string, description?: string): Promise<void> {
    await this.service.create(title, description);
  }
  async complete(id: number): Promise<void> {
    await this.api.update(id, { status: TodoStatus.COMPLETED });
  }


  async list(): Promise<Todo[]> {
    return this.api.getAll();
  }
}
