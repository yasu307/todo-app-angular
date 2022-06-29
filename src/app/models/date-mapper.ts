import { map } from "rxjs/operators"
import { Todo } from "./todo"
import { Category } from "./category"

// JSONをDateに変換するオペレーター
export const dateMapper = map(
  (data: (Todo | Category)[]) => {
    return data.map(d => {
      d.updatedAt = new Date(d.updatedAt)
      d.createdAt = new Date(d.createdAt)
      return d
    })
  }
)
