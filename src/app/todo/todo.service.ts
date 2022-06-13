import { Injectable } from '@angular/core';
import { Todo, codeToEnumState } from '../models/todo';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = "api/todos"

  constructor(private http: HttpClient) { }

  // 全てのtodoを取得する
  // バックエンドAPIから受け取ったデータをTodo型に変換した結果を返す
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      // バックエンドAPIはstateプロパティにState.codeが格納されているため変換する
      map(
        (todos: Todo[]) =>  {
          for (let todo of todos) codeToEnumState(todo)
          return todos
        }
      )
    )
  }
}
