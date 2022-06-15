import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    PipeModule,
  ]
})
export class TodoModule { }
