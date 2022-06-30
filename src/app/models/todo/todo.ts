import { Category } from "../category/category";

// todoを表すinterface
export interface Todo{
  id:         number;
  categoryId: Category["id"];
  title:      string;
  body?:      string;
  state:      State;
  updatedAt:  Date;
  createdAt:  Date;
}

// todoのstateを表すinterface
export interface State{
  readonly code: number
  readonly name: string
}

// Stateの選択肢
export const StateOptions = {
  TODO:      { code: 0, name: "TODO" },
  WORKING:   { code: 1, name: "進行中" },
  COMPLETED: { code: 2, name: "完了" },
} as const;

// state.codeからstateを取得するメソッド
export function getStateFromCode(code: number): State | undefined {
  return Object.values(StateOptions).find((state) => state.code == code)
}
