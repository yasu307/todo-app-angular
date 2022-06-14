import { Category } from "./category";

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
// idxに対応するStateを取得する方法: Object.values(StateOptions).find((state) => state.code == idx)
export const StateOptions = {
  TODO:      { code: 1, name: "TODO" },
  WORKING:   { code: 2, name: "進行中" },
  COMPLETED: { code: 3, name: "完了" },
} as const;
