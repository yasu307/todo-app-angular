import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './models/in-memory-data/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 500 }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
