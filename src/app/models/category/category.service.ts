import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, EnumColor } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    const categories: Category[] = [
      {
        id:        1,
        name:      "フロントエンドエンジニア",
        slug:      "fornt",
        color:     EnumColor.RED,
        updatedAt: "2022/06/10",
        createdAt: "2022/06/10",
      },
      {
        id:        2,
        name:      "バックエンドエンジニア",
        slug:      "back",
        color:     EnumColor.BLUE,
        updatedAt: "2022/06/10",
        createdAt: "2022/06/10",
      },
    ]
    return of(categories)
  }
}
