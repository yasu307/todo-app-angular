import { Category } from "./category";

export module CategoryAction {
  export const LOAD_CATEGORY   = 'Load_Category';
  export const ADD_CATEGORY    = 'Add_Category';
  export const DELETE_CATEGORY = 'Delete_Category';
  export const UPDATE_CATEGORY = 'Update_Category';

  /** 全カテゴリを取得する **/
  export class Load {
    static readonly type = LOAD_CATEGORY;
  }

  /** カテゴリを追加する **/
  export class Add {
    static readonly type = ADD_CATEGORY;

    constructor(public category: Category) { }
  }

  /** カテゴリを更新する **/
  export class Update {
    static readonly type = UPDATE_CATEGORY;

    constructor(public category: Category) { }
  }

  /** カテゴリを削除する **/
  export class Delete {
    static readonly type = DELETE_CATEGORY;

    constructor(public id: number) { }
  }
}
