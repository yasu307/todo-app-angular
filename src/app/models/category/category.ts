// カテゴリを表すinterface
export interface Category {
  id:        number;
  name:      string;
  slug:      string;
  color:     EnumColor;
  updatedAt: Date;
  createdAt: Date;
}

// Colorクラス　EnumColorで用いられる
class Color {
  readonly code:  number;
  readonly red:   number;
  readonly green: number;
  readonly blue:  number;

  constructor(code: number, red: number, green: number, blue: number) {
    this.code  = code;
    this.red   = red;
    this.green = green;
    this.blue  = blue;
  }

  toString(){
    return this.rgb
  }

  get rgb(){
    return `RGB(${this.red}, ${this.green}, ${this.blue})`
  }
}

// Colorクラスを持つEnum
// 通常の使い方: EnumColor.RED
// indexに対応するEnumColorを取得する方法: Object.values(EnumColor).find((color) => color.code == idx)
// EnumColorからindexを取得する方法: EnumColor.BLUE.code
export const EnumColor = {
  RED:     new Color(1, 255, 51, 51),
  GREEN:   new Color(2, 51, 255, 51),
  BLUE:    new Color(3, 51, 102, 255),
  YELLOW:  new Color(4, 255, 255, 102),
  AQUA:    new Color(5, 102, 255, 255),
  FUCHSIA: new Color(6, 255, 102, 255),
} as const;

export type EnumColor = typeof EnumColor[keyof typeof EnumColor];
