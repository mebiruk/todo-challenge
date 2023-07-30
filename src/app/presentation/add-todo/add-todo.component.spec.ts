import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoComponent } from './add-todo.component';
import { TodoService } from '../../core/services/todo.service';
import { TodoModel } from '../../core/model/todo.model';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>; 
  let mockActiveModal: jasmine.SpyObj<NgbActiveModal>;
  beforeEach(() => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['addTodo']);
    const activeModalSpy = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);
    TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy }, 
        { provide: NgbActiveModal, useValue: activeModalSpy }, 
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    mockTodoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    mockActiveModal = TestBed.inject(NgbActiveModal) as jasmine.SpyObj<NgbActiveModal>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    fixture.detectChanges();
    expect(component.todoForm.get('id')).toBeDefined();
    expect(component.todoForm.get('title')).toBeDefined();
    expect(component.todoForm.get('description')).toBeDefined();
    expect(component.todoForm.get('isDone')).toBeDefined();
  });
  

  it('should call todoService.addTodo() when onSubmit is called with a valid form', () => {
    fixture.detectChanges();
    const newTask: TodoModel = {
      id: 1,
      title: 'New Task',
      description: 'New Task Description',
      isDone: false,
    };

    component.todoForm.setValue({
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      isDone: newTask.isDone,
    });
    
    component.onSubmit();
    expect(mockTodoService.addTodo).toHaveBeenCalledWith(newTask);
  });

  it('should not call todoService.addTodo() when onSubmit is called with an invalid form', () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(mockTodoService.addTodo).not.toHaveBeenCalled();
  });

  it('should reset the form and dismiss the modal when onSubmit is called', fakeAsync(() => {
    fixture.detectChanges();
    component.todoForm.setValue({
      id: 1,
      title: 'New Task',
      description: 'New Task Description',
      isDone: false,
    });
    component.onSubmit();
    tick(); 
    expect(component.todoForm.value).toEqual({
      id: null,
      title: null,
      description: null,
      isDone: null,
    });

    expect(mockActiveModal.dismiss).toHaveBeenCalled();
  }));

  it('should dismiss the modal when onCancel is called', fakeAsync(() => {
    fixture.detectChanges();
    component.onCancel();
    tick(); 
    expect(mockActiveModal.dismiss).toHaveBeenCalled();
  }));
});
