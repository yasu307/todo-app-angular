import { Injectable } from '@angular/core';
import { Todo, EnumState } from './todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Observable<Todo[]> {
    const todos: Todo[] = [
      {
        id:         1,
        categoryId: 1,
        title:      "test title",
        body:       "test body",
        state:      EnumState.TODO,
        updatedAt:  "2022/06/10",
        createdAt:  "2022/06/10",
      },
      {
        id:         2,
        categoryId: 2,
        title:      "second title",
        body:       "second body",
        state:      EnumState.WORKING,
        updatedAt:  "2022/06/10",
        createdAt:  "2022/06/10",
      }
    ]
    return of(todos)
  }
}
