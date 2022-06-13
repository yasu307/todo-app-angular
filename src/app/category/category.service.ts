import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category, codeToEnumColor } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = "api/categories"

  constructor(private http: HttpClient) { }

  // 全てのカテゴリを取得する
  // バックエンドAPIから受け取ったデータをCategory型に変換した結果を返す
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
      // バックエンドAPIはcolorプロパティにColor.codeが格納されているため変換する
      map(
        (categories: Category[]) => {
          for (let category of categories) codeToEnumColor(category)
          return categories
        }
      )
    )
  }
}
