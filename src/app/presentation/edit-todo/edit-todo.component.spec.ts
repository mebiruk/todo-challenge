import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTodoComponent } from './edit-todo.component';
import { TodoService } from '../../core/services/todo.service';
import { TodoModel } from '../../core/model/todo.model';
import { of } from 'rxjs';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>; 
  let mockActiveModal: jasmine.SpyObj<NgbActiveModal>;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(() => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodoById', 'editTodo']);
    const activeModalSpy = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);

    mockRouter = { navigate: jasmine.createSpy('navigate') };
    mockActivatedRoute = { snapshot: { paramMap: new Map([['id', '1']]) } };

    TestBed.configureTestingModule({
      declarations: [EditTodoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: NgbActiveModal, useValue: activeModalSpy },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;

    mockTodoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    mockActiveModal = TestBed.inject(NgbActiveModal) as jasmine.SpyObj<NgbActiveModal>;

    component.todo = {} as TodoModel;

    mockTodoService.getTodoById.and.returnValue({} as TodoModel);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.todoForm.get('title')).toBeDefined();
    expect(component.todoForm.get('description')).toBeDefined();
    expect(component.todoForm.get('isDone')).toBeDefined();
  });

  it('should fetch the task to edit', () => {
    const todoId = 1;
    const mockTodo: TodoModel = {
      id: 1,
      title: 'Task 1',
      description: 'Task 1 Description',
      isDone: false,
    };

    mockTodoService.getTodoById.and.returnValue(mockTodo);
    component.todo = mockTodoService.getTodoById(todoId);

    fixture.detectChanges();
    expect(component.todo).toEqual(mockTodo);
    expect(mockTodoService.getTodoById).toHaveBeenCalledWith(todoId);
    expect(component.todoForm.value).toEqual({
      title: mockTodo.title,
      description: mockTodo.description,
      isDone: mockTodo.isDone,
    });
  });

  it('should dismiss the modal when onCancel is called', fakeAsync(() => {
    fixture.detectChanges(); 
    component.onCancel();
    tick();
    expect(mockActiveModal.dismiss).toHaveBeenCalled();
  }));

  it('should call todoService.editTodo() when onSubmit is called with a valid form', () => {
    fixture.detectChanges();

    const updatedTask: TodoModel = {
      id: 1,
      title: 'Updated Task',
      description: 'Updated Task Description',
      isDone: true,
    };

    component.todo = updatedTask;
    component.todoForm.setValue({
      title: updatedTask.title,
      description: updatedTask.description,
      isDone: updatedTask.isDone,
    });

    component.onSubmit();
    expect(mockTodoService.editTodo).toHaveBeenCalledWith(updatedTask);
    expect(mockActiveModal.close).toHaveBeenCalled();
  });

  it('should not call todoService.editTodo() when onSubmit is called with an invalid form', () => {
    fixture.detectChanges();

    component.todoForm.setValue({
      title: '',
      description: 'Updated Task Description',
      isDone: true,
    });

    component.onSubmit();
    expect(mockTodoService.editTodo).not.toHaveBeenCalled();
    expect(mockActiveModal.close).not.toHaveBeenCalled();
  });

});
