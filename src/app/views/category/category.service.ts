import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { dateMapper } from 'src/app/models/date-mapper';
import { Category } from '../../models/category/category';
import { environment } from 'src/environments/environment';
import { Timestamps } from 'src/app/models/timestamps';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = `${environment.apiUrl}/api/categories`
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // 全てのカテゴリを取得するメソッド
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
  }

  // カテゴリを追加するメソッド
  addCategory(category: Category): Observable<any> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions)
  }

  // カテゴリを更新するメソッド
  updateCategory(category: Category): Observable<Category> {
    const url = `${this.categoriesUrl}/${category.id}`
    return this.http.put<Category>(url, category, this.httpOptions)
  }

  // カテゴリを削除するメソッド
  deleteCategory(categoryId: number): Observable<Category>{
    const url = `${this.categoriesUrl}/${categoryId}`
    return this.http.delete<Category>(url, this.httpOptions)
  }
}
