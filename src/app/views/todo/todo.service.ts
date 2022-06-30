import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { dateMapper } from 'src/app/models/date-mapper';
import { Timestamps } from 'src/app/models/timestamps';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // allTodoを格納するSubject
  private allTodoSource = new ReplaySubject<Todo[]>(1)

  private todosUrl = `${environment.apiUrl}/api/todos`
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http:         HttpClient,
  ) { }

  // 全てのtodoを返すクエリ
  get allTodo$(): Observable<Todo[]> {
    return this.allTodoSource.asObservable()
  }

  // alltodoを更新するコマンド
  // バックエンドAPIから受け取った結果をallTodoSourceに追加する
  fetchAllTodo(): void{
    this.http.get<Todo[]>(this.todosUrl).pipe(dateMapper).subscribe(
      (fetchResult: Timestamps[]) => {
        this.allTodoSource.next(fetchResult as Todo[])
      }
    )
  }

  // todoを追加するコマンド
  addTodo(todo: Todo): Observable<any>{
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
  }

  // todoを更新するコマンド
  updateTodo(todo: Todo): Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo, this.httpOptions)
  }

  // todoを削除するコマンド
  deleteTodo(todoId: number): Observable<Todo> {
    const url = `${this.todosUrl}/${todoId}`
    return this.http.delete<Todo>(url, this.httpOptions)
  }
}
