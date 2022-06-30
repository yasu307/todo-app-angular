import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeModule } from '../../pipe/pipe.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryFormDialogComponent } from './category-form-dialog/category-form-dialog.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent,
    CategoryFormDialogComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CategoryModule { }
