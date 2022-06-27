import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeModule } from '../../pipe/pipe.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryFormDialogComponent } from './category-form-dialog/category-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent,
    CategoryFormDialogComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FontAwesomeModule,
    PipeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ]
})
export class CategoryModule { }
