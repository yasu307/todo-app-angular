import { Category } from "./category";

// todoを表すinterface
export interface Todo{
  id:         number;
  categoryId: Category["id"];
  title:      string;
  body?:      string;
  state:      EnumState;
  updatedAt:  Date;
  createdAt:  Date;
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

// 引数として受け取ったTodoのstateプロパティにnumberが格納されていたら、
// そのnumberをcodeに持つEnumStateに変換する
//
// バックエンドAPIから取得したJSONオブジェクトをTodo型に変換する際に用いる
// APIから取得したJSONにはstateのcodeが格納されている想定なため、この変換が必要になる
export function codeToEnumState(todo: Todo): Todo {
  const currentState = todo.state
  if (typeof currentState == "number") {
    todo.state = Object.values(EnumState).find((state) => state.code == currentState) ?? EnumState.TODO
  }
  return todo
}
