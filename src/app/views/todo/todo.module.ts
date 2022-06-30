import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PipeModule } from '../../pipe/pipe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoFormDialogComponent } from './todo-form-dialog/todo-form-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoFormDialogComponent,
    TodoFormComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class TodoModule { }
