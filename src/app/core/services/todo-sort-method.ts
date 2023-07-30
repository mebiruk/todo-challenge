import { TodoModel } from '../model/todo.model';

export class IdSortStrategy {
  sort(tasks: TodoModel[]): TodoModel[] {
    return tasks.slice().sort((a, b) => a.id - b.id);
  }
}

export class NameSortStrategy {
  sort(tasks: TodoModel[]): TodoModel[] {
    return tasks.slice().sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class DoneSortStrategy {
  sort(tasks: TodoModel[]): TodoModel[] {
    return tasks.slice().sort((a, b) => (a.isDone === b.isDone ? 0 : a.isDone ? -1 : 1));
  }
}