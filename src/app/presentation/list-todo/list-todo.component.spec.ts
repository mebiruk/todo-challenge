import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTodoComponent } from './list-todo.component';
import { TodoService } from '../../core/services/todo.service';
import { SortingService } from '../../core/services/todo-sorting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoModel } from '../../core/model/todo.model';
import { of } from 'rxjs';

describe('ListTodoComponent', () => {
  let component: ListTodoComponent;
  let fixture: ComponentFixture<ListTodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['deleteTodo', 'markTodoAsDone']);
    
    TestBed.configureTestingModule({
      declarations: [ListTodoComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        SortingService,
        NgbModal
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTodoComponent);
    component = fixture.componentInstance;

    mockTodoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    const tasks: TodoModel[] = [
      { id: 1, title: 'Task 1', description: 'description 1', isDone: false },
      { id: 2, title: 'Task 2', description: 'description 2', isDone: true },
      { id: 3, title: 'Task 3', description: 'description 3', isDone: false },
      { id: 4, title: 'Task 4', description: 'description 4', isDone: true },
      { id: 5, title: 'Task 5', description: 'description 5', isDone: false },
    ];
    mockTodoService.todos$ = of(tasks);
    mockTodoService.todos$.subscribe((todos: TodoModel[]) => {
      component.todos = todos;
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onDeleteTask() with the correct taskId', () => {
    const taskId = 5;
    component.onDeleteTask(taskId);
    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(taskId);
  });

  it('should call onMarkAsDone() with the correct taskId', () => {
    const taskId = 3;
    component.onMarkAsDone(taskId);
    expect(mockTodoService.markTodoAsDone).toHaveBeenCalledWith(taskId);
  });

  it('should sort the tasks when onSortingOptionChange() is called', () => {
    component.selectedSortingOption = 'done';
    component.onSortingOptionChange();
    expect(component.todos).toEqual([
      { id: 2, title: 'Task 2', description: 'description 2', isDone: true },
      { id: 4, title: 'Task 4', description: 'description 4', isDone: true },
      { id: 1, title: 'Task 1', description: 'description 1', isDone: false },
      { id: 3, title: 'Task 3', description: 'description 3', isDone: false },
      { id: 5, title: 'Task 5', description: 'description 5', isDone: false },
    ]);
  });

});
