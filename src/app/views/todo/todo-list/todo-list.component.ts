import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models/todo';
import { TodoService } from '../todo.service';
import { Observable, tap, catchError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/views/category/category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormDialogComponent } from '../todo-form-dialog/todo-form-dialog.component';
import { MyErrorHandler } from 'src/app/utility/error-handler';

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
    private errorHandler:    MyErrorHandler,
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

  deleteComponent(todoId: number) {
    this.todoService.deleteTodo(todoId).pipe(
      // 削除が成功したら
      tap((deletedTodo: Todo) => {
        // allTodoSourceを更新する
        this.todoService.fetchAllTodo()
      }),
      // エラーが発生したら処理をする
      catchError(this.errorHandler.handleError<Todo>('deleteTodo'))
    ).subscribe()
  }

  // todo追加ダイアログを表示する
  showStoreDialog() {
    const storeDialogRef = this.dialog.open(TodoFormDialogComponent, { width: '700px'})
  }
}
