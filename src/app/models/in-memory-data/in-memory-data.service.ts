import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../todo';
import { Category } from '../category';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const defaultDate = new Date()
    const todos = [
      {
        id: 1,
        categoryId: 1,
        title: "デザインをいい感じにする",
        body: "ヘッダーのデザインをもっといい感じに",
        state: {
          code: 1,
          name: "TODO",
        },
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 2,
        categoryId: 2,
        title: "Controllerの修正",
        body: "Controller名をもっといい感じに",
        state: {
          code: 2,
          name: "進行中",
        },
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 3,
        categoryId: 3,
        title: "新しいDB環境の作成",
        body: undefined,
        state: {
          code: 3,
          name: "完了",
        },
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
    ]
    const categories = [
      {
        id: 1,
        name: "フロントエンド",
        slug: "front",
        color: {
          code: 1,
          rgb: {
            red:   255,
            green: 51,
            blue:  51
          }
        },
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 2,
        name: "バックエンド",
        slug: "back",
        color: {
          code: 2,
          rgb: {
            red:   51,
            green: 255,
            blue:  51
          }
        },
        updatedAt: defaultDate,
        createdAt: defaultDate,
      },
      {
        id: 3,
        name: "インフラ",
        slug: "infra",
        color: {
          code: 3,
          rgb: {
            red:   51,
            green: 102,
            blue:  255
          }
        },
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
