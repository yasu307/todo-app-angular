import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$?:      Observable<Todo[]>
  categories$?: Observable<Category[]>

  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.todos$      = this.todoService.getTodos()
    this.categories$ = this.categoryService.getCategories()
  }

  // idから対応するカテゴリを取得するメソッド
  getCategoryById(id: number, categories: Category[]| null): Category | undefined {
    return categories?.find((c: Category) => c.id == id)
  }

}
