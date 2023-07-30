import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTodoComponent } from './presentation/list-todo/list-todo.component';
import { AddTodoComponent } from './presentation/add-todo/add-todo.component';
import { EditTodoComponent } from './presentation/edit-todo/edit-todo.component';

const routes: Routes = [
  { path: '', component: ListTodoComponent },
  { path: 'add', component: AddTodoComponent },
  { path: 'edit/:id', component: EditTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
