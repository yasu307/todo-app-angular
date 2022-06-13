import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = "api/categories"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
  }
}
