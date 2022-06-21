import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models/todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/views/category/category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormDialogComponent } from '../todo-form-dialog/todo-form-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$?:      Observable<Todo[]>     = this.todoService.allTodo$
  categories$?: Observable<Category[]>

  faEdit       = faEdit
  faTrashAlt   = faTrashAlt
  faPlusCircle = faPlusCircle
  faCircle     = faCircle

  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService,
    public  dialog:          MatDialog,
  ) { }

  ngOnInit(): void {
    this.todoService.fetchAllTodo()
    this.categories$ = this.categoryService.getCategories()
  }

  // idから対応するカテゴリを取得するメソッド
  // テンプレートでtodo-item__categoryを表示する際に用いる
  getCategoryById(id: number, categories: Category[]| null): Category | undefined {
    return categories?.find((c: Category) => c.id == id)
  }

  // todo更新ダイアログを表示する
  showEditDialog(todo: Todo){
    const editDialogRef = this.dialog.open(TodoFormDialogComponent, { data: todo, width: '700px'})
  }

  showDeleteComponent(todo: Todo) {
    console.log("show delete component")
  }

  // todo追加ダイアログを表示する
  showStoreDialog() {
    const storeDialogRef = this.dialog.open(TodoFormDialogComponent, { width: '700px'})
  }
}
