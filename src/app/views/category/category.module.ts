import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  declarations: [
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FontAwesomeModule,
    PipeModule,
  ]
})
export class CategoryModule { }
