import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo, EnumState } from '../todo/todo';
import { Category, EnumColor } from '../category/category';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const defaultDate = new Date()
    const todos: Todo[] = [
      {
        id: 1,
        categoryId: 1,
        title: "デザインをいい感じにする",
        body: "ヘッダーのデザインをもっといい感じに",
        state: EnumState.TODO,
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 2,
        categoryId: 2,
        title: "Controllerの修正",
        body: "Controller名をもっといい感じに",
        state: EnumState.WORKING,
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 3,
        categoryId: 3,
        title: "新しいDB環境の作成",
        body: undefined,
        state: EnumState.COMPLETED,
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
    ]
    const categories: Category[] = [
      {
        id: 1,
        name: "フロントエンド",
        slug: "front",
        color: EnumColor.RED,
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 2,
        name: "バックエンド",
        slug: "back",
        color: EnumColor.GREEN,
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 3,
        name: "インフラ",
        slug: "infra",
        color: EnumColor.BLUE,
        updatedAt: defaultDate,
        createdAt: defaultDate,
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
