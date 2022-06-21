import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category, ColorOptions, getColorFromCode } from 'src/app/models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { tap, catchError } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';

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
    private categoryService: CategoryService,
    private errorHandler:    MyErrorHandler,
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
      this.categoryService.addCategory(categoryFromFormVal).pipe(
        // 追加が成功したら
        tap((addedCategory: Category) => {
          // allCategorySourceを更新する
          this.categoryService.fetchAllCategory()
        }),
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
      this.categoryService.updateCategory(categoryFromFormVal).pipe(
        // 更新が成功したら
        tap((updatedCategory: Category) => {
          // allCategorySourceを更新する
          this.categoryService.fetchAllCategory()
        }),
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
      updatedAt: this.selectedCategory?.updatedAt ?? new Date(),
      createdAt: this.selectedCategory?.createdAt ?? new Date(),
    } as Category
    return categoryFromForm
  }
}
