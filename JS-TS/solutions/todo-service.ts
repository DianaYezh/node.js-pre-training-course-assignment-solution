import { TodoApi } from './todo-api';
import { Todo, TodoStatus } from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description = ''): Promise<Todo> {
    if (!title || title.trim() === '') {
      throw new Error('Validation Error: Title cannot be empty');
    }

    return this.api.add({ title, description });
  }

  async toggleStatus(id: number): Promise<Todo> {
    if (id <= 0) {
      throw new Error('Validation Error: Invalid ID');
    }
    const todos = await this.api.getAll();
    const existing = todos.find(t => t.id === id);

    if (!existing) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const newStatus = existing.status === TodoStatus.PENDING 
      ? TodoStatus.COMPLETED 
      : TodoStatus.PENDING;

    return this.api.update(id, { status: newStatus });
  }

  async search(keyword: string): Promise<Todo[]> {

    if (!keyword || keyword.trim() === '') {
      throw new Error('Validation Error: Search keyword cannot be empty');
    }

    const lowerKeyword = keyword.toLowerCase();
    
  
    const todos = await this.api.getAll();
    return todos.filter(todo => {
      const matchTitle = todo.title.toLowerCase().includes(lowerKeyword);

      const matchDesc = todo.description ? todo.description.toLowerCase().includes(lowerKeyword) : false;
      
      return matchTitle || matchDesc;
    });
  }
}
