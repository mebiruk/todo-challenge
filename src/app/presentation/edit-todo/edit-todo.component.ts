import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoModel } from '../../core/model/todo.model';
import { TodoService } from '../../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit  {
  @Input() taskId!: number;
  todoForm!: FormGroup;
  todo!: TodoModel | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: NgbActiveModal,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.initTaskForm();
    this.fetchTaskToEdit();
  }

  private initTaskForm(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      isDone: false,
    });
  }

  private fetchTaskToEdit(): void {
    const todoId = Number(this.taskId);
    this.todo = this.todoService.getTodoById(todoId);
    console.log(this.todo)
    if (this.todo) {
      this.todoForm.patchValue({
        title: this.todo.title,
        description: this.todo.description,
        isDone: this.todo.isDone,
      });
    } else {
      console.log(`Todo with ID ${todoId} not found.`);
      this.router.navigate(['/']);
    }
  }
  

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    if (this.todo) {
      const updatedTask: TodoModel = {
        ...this.todo,
        title: this.todoForm.value.title,
        description: this.todoForm.value.description,
        isDone: this.todoForm.value.isDone,
      };

      this.todoService.editTodo(updatedTask);
      this.activeModal.close();
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}