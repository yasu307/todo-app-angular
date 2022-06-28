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
  production: false,
  apiUrl:     'http://localhost:9000'
};
