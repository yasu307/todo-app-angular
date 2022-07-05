import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorToRgbPipe } from '../models/category/category';

// 独自に作成したpipeをまとめるモジュール
@NgModule({
  declarations: [
    ColorToRgbPipe,
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    ColorToRgbPipe
  ],
  exports: [
    ColorToRgbPipe,
  ]
})
export class PipeModule { }
