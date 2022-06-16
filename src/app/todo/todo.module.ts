import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatListModule } from '@angular/material/list'
import { PipeModule } from '../pipe/pipe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    PipeModule,
    FontAwesomeModule,
  ]
})
export class TodoModule { }
