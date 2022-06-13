import { Category } from "../category/category";

// todoを表すinterface
export interface Todo{
  id:         number;
  categoryId: Category["id"];
  title:      string;
  body:       string;
  state:      EnumState;
  updatedAt:  string; // 後ほどDateに変更する
  createdAt:  string; // 後ほどDateに変更する
}

class State{
  readonly code: number
  readonly name: string

  constructor(code: number, name: string){
    this.code = code;
    this.name = name;
  }
}

export const EnumState = {
  TODO:      new State(1, "TODO"),
  WORKING:   new State(2, "進行中"),
  COMPLETED: new State(3, "完了"),
} as const;

export type EnumState = typeof EnumState[keyof typeof EnumState];
