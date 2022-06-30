import { Todo } from "./todo";

export module TodoAction{
  export const LOAD_TODO   = 'Load_Todo';
  export const ADD_TODO    = 'Add_Todo';
  export const DELETE_TODO = 'Delete_Todo';
  export const UPDATE_TODO = 'Update_Todo';

  /** 全todoを取得する **/
  export class Load {
    static readonly type = LOAD_TODO;
  }

  /** todoを追加する **/
  export class Add {
    static readonly type = ADD_TODO;

    constructor(public todo: Todo) { }
  }

  /** todoを更新する **/
  export class Update {
    static readonly type = UPDATE_TODO;

    constructor(public todo: Todo) { }
  }

  /** todoを削除する **/
  export class Delete {
    static readonly type = DELETE_TODO;

    constructor(public id: number) { }
  }
}
