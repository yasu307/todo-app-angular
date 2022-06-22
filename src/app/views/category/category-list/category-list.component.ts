import { Component, OnInit } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';
import { TodoService } from '../../todo/todo.service';
import { MyErrorHandler } from 'src/app/utility/error-handler';

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
    private todoService:     TodoService,
    public  dialog:          MatDialog,
    private errorHandler:    MyErrorHandler,
  ) { }

  ngOnInit(): void {
    this.categoryService.fetchAllCategory()
  }

  // カテゴリ更新ダイアログを表示する
  showEditDialog(category: Category) {
    const editDialogRef = this.dialog.open(CategoryFormDialogComponent, { data: category, width: '700px' })
  }

  // カテゴリの削除
  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).pipe(
      // 削除が成功したら
      tap((deletedCategory: Category) => {
        // allCategorySourceを更新する
        this.categoryService.fetchAllCategory()
        // カテゴリの削除は、同時にtodoデータを変更することが多いので、こちらも更新する
        this.todoService.fetchAllTodo()
      }),
      // エラーが発生したら処理をする
      catchError(this.errorHandler.handleError<Category>('deleteCategory'))
    ).subscribe()
  }

  // カテゴリ追加ダイアログを表示する
  showStoreDialog() {
    const storeDialogRef = this.dialog.open(CategoryFormDialogComponent, { width: '700px' })
  }
}
