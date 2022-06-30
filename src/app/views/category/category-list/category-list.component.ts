import { Component, OnInit } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from '../category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';
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
  faPlus       = faPlus
  faCircle     = faCircle

  // 現在削除中のカテゴリのIdを格納する配列
  deletingCategoriesId: number[] = []

  constructor(
    private categoryService: CategoryService,
    public  dialog:          MatDialog,
    private errorHandler:    MyErrorHandler,
  ) { }

  ngOnInit(): void {
    this.categoryService.fetchAllCategory()
  }

  // カテゴリ更新ダイアログを表示する
  showEditDialog(category: Category) {
    this.dialog.open(CategoryFormDialogComponent, { data: category, width: '700px' })
  }

  // カテゴリの削除
  deleteCategory(categoryId: number) {
    this.deletingCategoriesId.push(categoryId)
    this.categoryService.deleteCategory(categoryId).pipe(
      // 削除が成功したら
      tap((deletedCategory: Category) => {
        // allCategorySourceを更新する
        this.categoryService.fetchAllCategory()
      }),
      // エラーが発生したら処理をする
      catchError(this.errorHandler.handleError<Category>('deleteCategory'))
    ).subscribe( result => {
      // 処理が終わったのちdeletingCategoriesIdからtodoIdを削除する
      this.deletingCategoriesId.splice(this.deletingCategoriesId.indexOf(categoryId), 1)
    })
  }

  // カテゴリ追加ダイアログを表示する
  showStoreDialog() {
    this.dialog.open(CategoryFormDialogComponent, { width: '700px' })
  }
}
