import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // allTodoを格納するSubject
  private allTodoSource = new Subject<Todo[]>()

  private todosUrl = "api/todos"
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
    this.http.get<Todo[]>(this.todosUrl).subscribe(
      (fetchResult: Todo[]) => {
        this.allTodoSource.next(fetchResult)
      }
    )
  }

  // todoを追加するコマンド
  addTodo(todo: Todo): Observable<Todo>{
    console.log("inside of addTodo")
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
  }

  // todoを更新するコマンド
  updateTodo(todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(this.todosUrl, todo, this.httpOptions)
  }

  // todoを削除するコマンド
  deleteTodo(todoId: number): Observable<Todo> {
    const url = `${this.todosUrl}/${todoId}`
    return this.http.delete<Todo>(url, this.httpOptions)
  }
}
