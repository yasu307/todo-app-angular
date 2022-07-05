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
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { TodoState } from 'src/app/models/todo/todo.state';
import { CategoryState } from 'src/app/models/category/category.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

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
    NgxsModule.forRoot([TodoState, CategoryState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
