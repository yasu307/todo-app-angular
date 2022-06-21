import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeModule } from '../../pipe/pipe.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryFormDialogComponent } from './category-form-dialog/category-form-dialog.component';

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
  ]
})
export class CategoryModule { }
