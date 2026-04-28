import { Todo } from './types';

export function addTodo(state: Todo[], todo: Todo): Todo[] {

  return [...state, todo];
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  const exists = state.some(item => item.id === id);
  if (!exists) {
    throw new Error(`Cannot update: Todo with id ${id} not found`);
  }

  return state.map(item => 
    item.id === id ? { ...item, ...update } : item
  );
}

export function removeTodo(state: Todo[], id: number): Todo[] {
 

  const exists = state.some(item => item.id === id);
  if (!exists) {
    throw new Error(`Cannot remove: Todo with id ${id} not found`);
  }
  return state.filter(item => item.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {

  return state.find(item => item.id === id);
}
