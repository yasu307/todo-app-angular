import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // allCategoryを格納するSubject
  private allCategorySource = new ReplaySubject<Category[]>(1)

  private categoriesUrl = "api/categories"

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
}
