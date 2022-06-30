import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo/todo';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { dateMapper } from 'src/app/models/date-mapper';
import { Timestamps } from 'src/app/models/timestamps';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = `${environment.apiUrl}/api/todos`
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http:         HttpClient,
  ) { }

  // 全てのtodoを取得するメソッド
  getAllTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
  }

  // todoを追加するメソッド
  addTodo(todo: Todo): Observable<any>{
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
  }

  // todoを更新するメソッド
  updateTodo(todo: Todo): Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo, this.httpOptions)
  }

  // todoを削除するメソッド
  deleteTodo(todoId: number): Observable<Todo> {
    const url = `${this.todosUrl}/${todoId}`
    return this.http.delete<Todo>(url, this.httpOptions)
  }
}
