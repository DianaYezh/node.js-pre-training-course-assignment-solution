import { Todo, TodoStatus } from './types';

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  const targetStatus = completed ? TodoStatus.COMPLETED : TodoStatus.PENDING;

  return state.map(todo => ({
    ...todo,
    status: targetStatus
  }));
}

export function clearCompleted(state: Todo[]): Todo[] {

  return state.filter(todo => todo.status !== TodoStatus.COMPLETED);
}

export function countByStatus(state: Todo[], status: TodoStatus): number {

  return state.reduce((count, todo) => {
    return todo.status === status ? count + 1 : count;
  }, 0);
}
