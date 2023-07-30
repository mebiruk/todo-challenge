// src/app/sorting.service.ts
import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo.model';
import { IdSortStrategy } from './todo-sort-method';
import { NameSortStrategy } from './todo-sort-method';
import { DoneSortStrategy } from './todo-sort-method';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private strategies: any = {
    id: new IdSortStrategy(),
    name: new NameSortStrategy(),
    done: new DoneSortStrategy(),
  };

  sort(tasks: TodoModel[], strategyKey: string): TodoModel[] {
    const strategy = this.strategies[strategyKey];
    return strategy ? strategy.sort(tasks) : tasks;
  }
}