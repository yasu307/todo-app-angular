// local開発用
// in-memory-dataからデータを取得する
// ng serve -c local で起動

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from "src/app/models/in-memory-data/in-memory-data.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 500 }
    ),
  ],
})
export class EnvironmentModule {
}

export const environment = {
  production: false,
  apiUrl:     ''
};
