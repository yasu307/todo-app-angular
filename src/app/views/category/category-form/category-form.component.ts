import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category, ColorOptions, getColorFromCode } from 'src/app/models/category/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { catchError } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { Store } from '@ngxs/store';
import { CategoryAction } from 'src/app/models/category/category.action';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  ctgFormGroup!: FormGroup

  faSquare = faSquare

  // colorOptionsの選択肢を持つ配列
  colorOptArray = Object.values(ColorOptions)

  // カテゴリ追加フォームの場合 undefined
  // カテゴリ更新フォームの場合 Category
  @Input() selectedCategory?: Category

  pageTitle?: string

  // Formの処理が終わったことをCategoryFormDialogComponentに伝えるためのEventEmitter
  @Output() isFinishedEvent = new EventEmitter<boolean>();

  constructor(
    private errorHandler:    MyErrorHandler,
    private store:           Store,
  ) { }

  ngOnInit(): void {
    // ページタイトルの決定
    this.pageTitle = this.selectedCategory ? "カテゴリ更新画面" : "カテゴリ追加画面"

    // FormGroupの作成
    this.ctgFormGroup = new FormGroup({
      name:      new FormControl(this.selectedCategory?.name,       [Validators.required, Validators.maxLength(255)]),
      slug:      new FormControl(this.selectedCategory?.slug,       [Validators.required, Validators.maxLength(64), Validators.pattern('[ -~]+')]),
      colorCode: new FormControl(this.selectedCategory?.color.code, [Validators.required]),
    })
  }

  addCategory() {
    if (!this.ctgFormGroup.invalid) {
      // formで指定された値をもつカテゴリを作成する
      const categoryFromFormVal: Category = this.createCategoryFromFormVal()
      // DBにカテゴリを追加する
      // Observable<any>
      this.store.dispatch(new CategoryAction.Add(categoryFromFormVal)).pipe(
        // エラーが発生したら処理をする
        catchError(this.errorHandler.handleError<Category>('addCategory'))
      ).subscribe(
        // 保存が終了したのち
        (resp) => {
          // categoryFormDialogComponentに終了したことを伝える
          this.isFinishedEvent.emit(true)
        }
      )
    }
  }

  updateCategory() {
    if (!this.ctgFormGroup.invalid) {
      // formで指定された値をもつカテゴリを作成する
      const categoryFromFormVal: Category = this.createCategoryFromFormVal()
      // DBにてカテゴリを更新する
      // Observable<Category>
      this.store.dispatch(new CategoryAction.Update(categoryFromFormVal)).pipe(
        // エラーが発生したら処理をする
        catchError(this.errorHandler.handleError<Category>('updateCategory'))
      ).subscribe(
        // 保存が終了したのち
        (resp) => {
          // categoryFormDialogComponentに終了したことを伝える
          this.isFinishedEvent.emit(true)
        }
      )
    }
  }

  // Formの値をもつカテゴリを作成する
  createCategoryFromFormVal(): Category {
    let categoryFromForm = {
      id:        this.selectedCategory?.id,
      name:      this.ctgFormGroup.value.name,
      slug:      this.ctgFormGroup.value.slug,
      color:     getColorFromCode(this.ctgFormGroup.value.colorCode),
      updatedAt: this.selectedCategory?.updatedAt,
      createdAt: this.selectedCategory?.createdAt,
    } as Category
    return categoryFromForm
  }
}
