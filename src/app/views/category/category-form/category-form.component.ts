import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category, ColorOptions } from 'src/app/models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

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
    console.log("add category")
  }

  updateCategory() {
    console.log("update category")
  }
}
