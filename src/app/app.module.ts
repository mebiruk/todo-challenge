import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTodoComponent } from './presentation/list-todo/list-todo.component';
import { AddTodoComponent } from './presentation/add-todo/add-todo.component';
import { EditTodoComponent } from './presentation/edit-todo/edit-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    AddTodoComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,ListTodoComponent,AddTodoComponent,EditTodoComponent]
})
export class AppModule { }
