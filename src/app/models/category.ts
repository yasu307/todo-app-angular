// カテゴリを表すinterface
export interface Category {
  id:        number;
  name:      string;
  slug:      string;
  color:     Color;
  updatedAt: Date;
  createdAt: Date;
}

// カテゴリに設定されている色を表すinterface
export interface Color {
  readonly code:  number;
  readonly rgb: {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
  }
}

// Colorの選択肢
// idxに対応するColorOptionを取得する方法: Object.values(ColorOption).find((color) => color.code == idx)
export const ColorOptions = {
  RED:     { code: 1, rgb: { red: 255, green: 51, blue: 51}},
  GREEN:   { code: 2, rgb: { red: 51, green: 255, blue: 51 } },
  BLUE:    { code: 3, rgb: { red: 51, green: 102, blue: 255 } },
  YELLOW:  { code: 4, rgb: { red: 255, green: 255, blue: 102 } },
  AQUA:    { code: 5, rgb: { red: 102, green: 255, blue: 255 } },
  FUCHSIA: { code: 6, rgb: { red: 255, green: 102, blue: 255 } },
} as const;
