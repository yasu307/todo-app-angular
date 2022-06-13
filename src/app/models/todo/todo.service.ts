import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = "api/todos"

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
  }
}
