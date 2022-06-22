import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // allCategoryを格納するSubject
  private allCategorySource = new ReplaySubject<Category[]>(1)

  private categoriesUrl = "http://localhost:9000/api/categories"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  get allCategory$(): Observable<Category[]> {
    return this.allCategorySource.asObservable()
  }

  // allCategoryを更新するコマンド
  // バックエンドAPIから受け取った結果をallCategorySourceに追加する
  fetchAllCategory(): void {
    this.http.get<Category[]>(this.categoriesUrl).subscribe(
      (fetchResult: Category[]) => {
        this.allCategorySource.next(fetchResult)
      }
    )
  }

  // カテゴリを追加するコマンド
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions)
  }

  // カテゴリを更新するコマンド
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.categoriesUrl, category, this.httpOptions)
  }

  // カテゴリを削除するコマンド
  deleteCategory(categoryId: number): Observable<Category>{
    const url = `${this.categoriesUrl}/${categoryId}`
    return this.http.delete<Category>(url, this.httpOptions)
  }
}
