import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  allCategory$: Observable<Category[]> = this.categoryService.allCategory$

  faEdit       = faEdit
  faTrashAlt   = faTrashAlt
  faPlusCircle = faPlusCircle
  faCircle     = faCircle

  constructor(
    private categoryService: CategoryService,
    public  dialog:          MatDialog,
  ) { }

  ngOnInit(): void {
    this.categoryService.fetchAllCategory()
  }

  // カテゴリ更新ダイアログを表示する
  showEditDialog(category: Category) {
    const editDialogRef = this.dialog.open(CategoryFormDialogComponent, { data: category, width: '700px' })
  }

  deleteComponent(categoryId: number) {
    console.log("delete component")
    // this.categoryService.deleteTodo(categoryId).subscribe()
  }

  // カテゴリ追加ダイアログを表示する
  showStoreDialog() {
    const storeDialogRef = this.dialog.open(CategoryFormDialogComponent, { width: '700px' })
  }
}
