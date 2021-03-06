import { Pipe, PipeTransform } from "@angular/core";

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
export const ColorOptions = {
  RED:     { code: 0, rgb: { red: 255, green: 51, blue: 51}},
  GREEN:   { code: 1, rgb: { red: 51, green: 255, blue: 51 } },
  BLUE:    { code: 2, rgb: { red: 51, green: 102, blue: 255 } },
  YELLOW:  { code: 3, rgb: { red: 255, green: 255, blue: 102 } },
  AQUA:    { code: 4, rgb: { red: 102, green: 255, blue: 255 } },
  FUCHSIA: { code: 5, rgb: { red: 255, green: 102, blue: 255 } },
} as const;

// ColorからRGBを表す文字列に変換するパイプ
// todoを表示するテンプレートとcategoryを表示するテンプレートのどちらでも必要になるためパイプとして切り出した
@Pipe({name: "colorToRgb"})
export class ColorToRgbPipe implements PipeTransform{
  transform(color: Color): string {
    return `RGB(${color.rgb.red}, ${color.rgb.green}, ${color.rgb.blue})`
  }
}

// color.codeからcolorを取得するメソッド
export function getColorFromCode(code: number): Color | undefined {
  return Object.values(ColorOptions).find((color) => color.code == code)
}
