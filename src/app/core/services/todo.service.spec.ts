import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { TodoModel } from '../model/todo.model';

describe('TodoService', () => {
    let service: TodoService;
    let tobe_id = Date.now();
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TodoService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a new todo', () => {
        const todo: TodoModel = {
            id: Date.now(),
            title: 'New Todoee',
            description: 'This is a new todo',
            isDone: false,
        };

        service.addTodo(todo);

        expect(service.getTodos()).toContain(todo);
    });

      it('should delete an existing todo', () => {
        const todo1: TodoModel = {
          id: tobe_id,
          title: 'Todo 1',
          description: 'This is Todo 1',
          isDone: false,
        };
        const todo2: TodoModel = {
          id: Date.now(),
          title: 'Todo 2',
          description: 'This is Todo 2',
          isDone: false,
        };

        service.addTodo(todo1);
        service.addTodo(todo2);

        service.deleteTodo(todo1.id);

        expect(service.getTodos()).not.toContain(todo1);
        expect(service.getTodos()).toContain(todo2);
      });

    it('should edit an existing todo', () => {
        const todo: TodoModel = {
            id: Date.now(),
            title: 'Todo 1',
            description: 'This is Todo 1',
            isDone: false,
        };
        const updatedTodo: TodoModel = {
            ...todo,
            title: 'Updated Todo',
            description: 'This is an updated todo',
        };

        service.addTodo(todo);
        service.editTodo(updatedTodo);

        const editedTodo = service.getTodoById(todo.id);
        expect(editedTodo).toEqual(updatedTodo);
    });

    it('should mark a todo as done', () => {
        const todo: TodoModel = {
            id: Date.now(),
            title: 'Todo 1',
            description: 'This is Todo 1',
            isDone: false,
        };

        service.addTodo(todo);
        service.markTodoAsDone(todo.id);

        const markedTodo = service.getTodoById(todo.id);
        expect(markedTodo?.isDone).toBeTrue();
    });

    it('should load todos from localStorage on initialization', () => {
        const todo: TodoModel = {
            id: Date.now(),
            title: 'Todo 1',
            description: 'This is Todo 1',
            isDone: false,
        };
        service.addTodo(todo);
        service = TestBed.inject(TodoService);
        expect(service.getTodos()).toContain(todo);
    });
});
