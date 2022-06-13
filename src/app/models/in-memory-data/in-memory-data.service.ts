import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo, EnumState } from '../todo/todo';
import { Category, EnumColor } from '../category/category';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [
      {
        id: 1,
        categoryId: 1,
        title: "test title",
        body: "test body",
        state: EnumState.TODO,
        updatedAt: "2022/06/10",
        createdAt: "2022/06/10",
      },
      {
        id: 2,
        categoryId: 2,
        title: "second title",
        body: "second body",
        state: EnumState.WORKING,
        updatedAt: "2022/06/10",
        createdAt: "2022/06/10",
      }
    ]
    const categories: Category[] = [
      {
        id: 1,
        name: "フロントエンドエンジニア",
        slug: "fornt",
        color: EnumColor.RED,
        updatedAt: "2022/06/10",
        createdAt: "2022/06/10",
      },
      {
        id: 2,
        name: "バックエンドエンジニア",
        slug: "back",
        color: EnumColor.BLUE,
        updatedAt: "2022/06/10",
        createdAt: "2022/06/10",
      },
    ]
    return { todos, categories };
  }

  // Overrides the genId method to ensure that a (todo, category) always has an id.
  // If the (todos, categories) array is empty,
  // the method below returns the initial number (11).
  // if the (todos, categories) array is not empty, the method below returns the highest
  // (todo, category) id + 1.
  genId<T extends Todo | Category>(list: T[]): number {
    return list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1;
  }
}
