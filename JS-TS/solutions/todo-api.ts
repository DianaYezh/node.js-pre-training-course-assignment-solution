import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';
import { createTodo } from './todo-factory';

export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = 'TodoNotFoundError';
  }
}

const simulateLatency = (): Promise<void> => {
  return new Promise(resolve => {
    const ms = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    setTimeout(resolve, ms);
  });
};

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    await simulateLatency();
    return this.repo.findAll(); 
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await simulateLatency();
    const todo = createTodo(newTodo);
    return this.repo.add(todo); 
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await simulateLatency();
    

    const existing = this.repo.findById(id);
    if (!existing) {
      throw new TodoNotFoundError(id);
    }

    return this.repo.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await simulateLatency();
    
    const existing = this.repo.findById(id);
    if (!existing) {
      throw new TodoNotFoundError(id);
    }

    this.repo.remove(id);
  }
}
