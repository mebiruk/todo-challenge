import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoModel } from '../../core/model/todo.model';
import { TodoService } from '../../core/services/todo.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService,public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.initTaskForm();
  }

  private initTaskForm(): void {
    this.todoForm = this.formBuilder.group({
      id: '',
      title: ['', Validators.required],
      description: '',
      isDone: false,
    });
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const newTask: TodoModel = this.todoForm.value;
    this.todoService.addTodo(newTask);
    this.todoForm.reset();
    this.activeModal.dismiss();
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}