import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = "api/categories"

  constructor(private http: HttpClient) { }

  // 全てのカテゴリを取得する
  // バックエンドAPIから受け取ったデータをCategory型に変換した結果を返す
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
  }
}
