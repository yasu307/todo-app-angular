import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { dateMapper } from 'src/app/models/date-mapper';
import { Category } from '../../models/category';
import { environment } from 'src/environments/environment';
import { Todo } from 'src/app/models/todo';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // allCategoryを格納するSubject
  private allCategorySource = new ReplaySubject<Category[]>(1)

  private categoriesUrl = `${environment.apiUrl}/api/categories`
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
    this.http.get<Category[]>(this.categoriesUrl).pipe(dateMapper).subscribe(
      (fetchResult: (Todo | Category)[]) => {
        this.allCategorySource.next(fetchResult as Category[])
      }
    )
  }

  // カテゴリを追加するコマンド
  addCategory(category: Category): Observable<any> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions)
  }

  // カテゴリを更新するコマンド
  updateCategory(category: Category): Observable<Category> {
    const url = `${this.categoriesUrl}/${category.id}`
    return this.http.put<Category>(url, category, this.httpOptions)
  }

  // カテゴリを削除するコマンド
  deleteCategory(categoryId: number): Observable<Category>{
    const url = `${this.categoriesUrl}/${categoryId}`
    return this.http.delete<Category>(url, this.httpOptions)
  }
}
