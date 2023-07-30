// src/app/todo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoModel } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: TodoModel[] = [];
  private todosSubject: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>([]);
  private readonly localStorageKey = 'todo_tasks';
  todos$: Observable<TodoModel[]> = this.todosSubject.asObservable();
  constructor() {
    this.loadTodosFromLocalStorage();
  }

  getTodos(): TodoModel[] {
    return this.todos;
  }

  getTodosObservable(): Observable<TodoModel[]> {
    return this.todosSubject.asObservable();
  }
  addTodo(todo: TodoModel): void {
    const newTodo: TodoModel = {
      ...todo,
      id: Date.now(), // Assigning a timestamp-based ID
    };
    this.todos.push(newTodo);
    this.updateTodosSubject();
    this.saveTodosToLocalStorage();
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.updateTodosSubject();
    this.saveTodosToLocalStorage();
  }

  editTodo(updatedTodo: TodoModel): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.updateTodosSubject();
      this.saveTodosToLocalStorage();
    }
  }

  markTodoAsDone(todoId: number): void {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) {
      todo.isDone = true;
      this.updateTodosSubject();
      this.saveTodosToLocalStorage();
    }
  }

  getTodoById(id: number): TodoModel | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  loadTodosFromLocalStorage(): void {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    if (tasksJson) {
      this.todos = JSON.parse(tasksJson);
      this.updateTodosSubject();
    }
  }

  private saveTodosToLocalStorage(): void {
    const tasksJson = JSON.stringify(this.todos);
    localStorage.setItem(this.localStorageKey, tasksJson);
  }

  private updateTodosSubject(): void {
    this.todosSubject.next([...this.todos]);
  }
}
