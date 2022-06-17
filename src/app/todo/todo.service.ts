import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, tap, catchError, of, Subject } from 'rxjs';
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

  constructor(private http: HttpClient) { }

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
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      // 追加が成功したら
      tap((addedTodo: Todo) => {
        // allTodoSourceを更新する
        this.fetchAllTodo()
      }),
      // エラーが発生したら処理をする
      catchError(this.handleError<Todo>('addTodo'))
    )
  }

  // todoを更新するコマンド
  updateTodo(todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      // 更新が成功したら
      tap((updatedTodo: Todo) => {
        // allTodoSourceを更新する
        this.fetchAllTodo()
      }),
      // エラーが発生したら処理をする
      catchError(this.handleError<Todo>('updateTodo'))
    )
  }

  // エラーの処理
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`handle error\n${JSON.stringify(error)}`)
      // TODO: toastを使いエラーが発生したことをユーザに伝える

      // 引数で受け取ったresultを返す
      return of(result as T);
    };
  }
}
