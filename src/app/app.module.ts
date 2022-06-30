import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './views/todo/todo.module';
import { CategoryModule } from './views/category/category.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentModule } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TodoModule,
    CategoryModule,
    BrowserAnimationsModule,
    EnvironmentModule,
    MaterialModule,
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
