import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatListModule } from '@angular/material/list'
import { PipeModule } from '../pipe/pipe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoStoreComponent } from './todo-store/todo-store.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoStoreComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    PipeModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class TodoModule { }
