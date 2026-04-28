import { ToDoManager } from './todo-manager';
import { TodoStatus } from './types';

async function main() {
  const manager = new ToDoManager();
 
  await manager.init();

  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'add': {
        const title = args[1];
        const desc = args[2];
        if (!title) {
          console.error('Ошибка: Введите заголовок. Пример использования: add "Купить хлеб"');
          return;
        }
        await manager.add(title, desc);
        console.log(`Задача "${title}" успешно добавлена!`);
        break;
      }
      
      case 'complete': {
        const id = parseInt(args[1], 10);
        if (isNaN(id)) {
          console.error('Ошибка: Введите корректный ID задачи. Пример использования: complete 1');
          return;
        }
        await manager.complete(id);
        console.log(`✅ Задача с ID ${id} выполнена!`);
        break;
      }
      
      case 'list':
      default: {
        const todos = await manager.list();
        console.log('\n--- Список задач ---');
        todos.forEach(t => {
          const checkbox = t.status === TodoStatus.COMPLETED ? '[x]' : '[ ]';
          const desc = t.description ? ` (${t.description})` : '';
          console.log(`${t.id}. ${checkbox} ${t.title}${desc}`);
        });
        break;
      }
    }
  } catch (error: any) {
    console.error(' Ошибка:', error.message);
  }
}

main();
