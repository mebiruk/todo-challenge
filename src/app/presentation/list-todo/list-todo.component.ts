import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { TodoModel } from '../../core/model/todo.model';
import { TodoService } from '../../core/services/todo.service';
import { SortingService } from '../../core/services/todo-sorting.service';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoComponent } from '../add-todo/add-todo.component';
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {
  todos: TodoModel[] = [];
  sortingOptions: string[] = ['id', 'name', 'done'];
  selectedSortingOption: string = 'id';
  constructor(private todoService: TodoService, private sortingService: SortingService, private modalService: NgbModal) {}

  ngOnInit() {
    this.todoService.todos$.subscribe((todos: TodoModel[]) => {
      this.todos = todos;
      this.onSortingOptionChange(); // Sort the tasks whenever the list changes
    });
  }
  
  onDeleteTask(taskId: number) {
    this.todoService.deleteTodo(taskId);
  }

  onMarkAsDone(taskId: number) {
    this.todoService.markTodoAsDone(taskId);
  }

  onSortingOptionChange(): void {
    console.log(this.todos);
    console.log(this.selectedSortingOption);
    this.todos = this.sortingService.sort(this.todos, this.selectedSortingOption);
  }

  onEditTask(taskId: number): void {
    const modalRef = this.modalService.open(EditTodoComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.taskId = taskId;
    modalRef.result.then((result) => {},(reason) => {});
  }

  onAddTask(): void{
    const modalRef = this.modalService.open(AddTodoComponent, { size: 'lg', centered: true });
    modalRef.result.then((result) => {},(reason) => {});
  }
}

