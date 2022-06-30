import { map } from "rxjs/operators"
import { Timestamps } from "./timestamps"

// DBで設定されるタイムスタンプをDateに変換するオペレーター
export const dateMapper = map(
  (data: Timestamps[]) => {
    return data.map(d => {
      d.updatedAt = new Date(d.updatedAt)
      d.createdAt = new Date(d.createdAt)
      return d
    })
  }
)
