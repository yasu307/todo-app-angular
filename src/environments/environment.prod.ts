// 本番用もEnvironmentModuleを設定しないとエラーが発生するので
// とりあえずデフォルトの設定を記述
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
  ]
})
export class EnvironmentModule {
}

export const environment = {
  production: true,
  apiUrl:     'http://localhost:9000'
};
