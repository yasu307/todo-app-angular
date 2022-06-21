import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  // カテゴリ追加フォームの場合 undefined
  // カテゴリ更新フォームの場合 Category
  @Input() selectedCategory?: Category

  // Formの処理が終わったことをCategoryFormDialogComponentに伝えるためのEventEmitter
  @Output() isFinishedEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
