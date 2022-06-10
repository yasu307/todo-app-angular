import { Component, OnInit } from '@angular/core';
import { Category, EnumColor } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [
    {
      id: 1,
      name: "フロントエンドエンジニア",
      slug: "fornt",
      color: EnumColor.RED,
      updatedAt: "2022/06/10",
      createdAt: "2022/06/10",
    },
    {
      id: 2,
      name: "バックエンドエンジニア",
      slug: "back",
      color: EnumColor.BLUE,
      updatedAt: "2022/06/10",
      createdAt: "2022/06/10",
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
