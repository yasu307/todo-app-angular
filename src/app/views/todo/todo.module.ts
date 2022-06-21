import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PipeModule } from '../../pipe/pipe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoFormDialogComponent } from './todo-form-dialog/todo-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatRadioModule } from '@angular/material/radio'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatCardModule } from '@angular/material/card'

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
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatCardModule,
  ]
})
export class TodoModule { }
