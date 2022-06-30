import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models/todo/todo';
import { Observable, catchError, take } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/views/category/category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormDialogComponent } from '../todo-form-dialog/todo-form-dialog.component';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { Select, Store } from '@ngxs/store';
import { TodoAction } from 'src/app/models/todo/todo.actions';
import { TodoState } from 'src/app/models/todo/todo.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.allTodo) allTodo$?: Observable<Todo[]>
  allCategory$?: Observable<Category[]> = this.categoryService.allCategory$

  faEdit       = faEdit
  faTrashAlt   = faTrashAlt
  faPlus       = faPlus
  faCircle     = faCircle

  // 現在削除中のTodoのIdを格納する配列
  deletingTodosId: number[] = []

  constructor(
    private categoryService: CategoryService,
    public  dialog:          MatDialog,
    private errorHandler:    MyErrorHandler,
    private store:           Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new TodoAction.Load)
    this.categoryService.fetchAllCategory()
  }

  // idから対応するカテゴリを取得するメソッド
  // テンプレートでtodo-item__categoryを表示する際に用いる
  getCategoryById(id: number, categories: Category[]| null): Category | undefined {
    return categories?.find((c: Category) => c.id == id)
  }

  // todo更新ダイアログを表示する
  showEditDialog(todo: Todo){
    this.dialog.open(TodoFormDialogComponent,
      {
        data:
          {
            selectedTodo: todo,
            allCategory$: this.categoryService.allCategory$.pipe(take(1))
          },
        width: '700px'
      })
  }

  deleteComponent(todoId: number) {
    this.deletingTodosId.push(todoId)
    // Observable<Todo>
    this.store.dispatch(new TodoAction.Delete(todoId)).pipe(
      // エラーが発生したら処理をする
      catchError(this.errorHandler.handleError<Todo>('deleteTodo'))
    ).subscribe( result => {
      // 処理が終わったのちdeletingTodosIdからtodoIdを削除する
      this.deletingTodosId.splice(this.deletingTodosId.indexOf(todoId), 1)
    })
  }

  // todo追加ダイアログを表示する
  showStoreDialog() {
    this.dialog.open(TodoFormDialogComponent,
      {
        data:
          {
            allCategory$: this.categoryService.allCategory$.pipe(take(1))
          },
        width: '700px'
      })
    }
}
