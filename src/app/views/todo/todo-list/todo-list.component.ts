import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models/todo/todo';
import { Observable, catchError, take } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormDialogComponent } from '../todo-form-dialog/todo-form-dialog.component';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { Select, Store } from '@ngxs/store';
import { TodoState } from 'src/app/models/todo/todo.state';
import { CategoryState } from 'src/app/models/category/category.state';
import { CategoryAction } from 'src/app/models/category/category.action';
import { Emittable, Emitter } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.allTodo)         allTodo$?:     Observable<Todo[]>
  @Select(CategoryState.allCategory) allCategory$?: Observable<Category[]>

  @Emitter(TodoState.load)
  private loadTodoEmittable!: Emittable<void>

  @Emitter(TodoState.deleteTodo)
  private deleteTodoEmittable!: Emittable<number>

  faEdit       = faEdit
  faTrashAlt   = faTrashAlt
  faPlus       = faPlus
  faCircle     = faCircle

  // 現在削除中のTodoのIdを格納する配列
  deletingTodosId: number[] = []

  constructor(
    public  dialog:          MatDialog,
    private errorHandler:    MyErrorHandler,
    private store:           Store,
  ) { }

  ngOnInit(): void {
    this.loadTodoEmittable.emit()
    this.store.dispatch(new CategoryAction.Load)
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
            allCategory$: this.store.selectOnce(state => state.categories.allCategory)
          },
        width: '700px'
      })
  }

  deleteComponent(todoId: number) {
    this.deletingTodosId.push(todoId)
    // Observable<Todo>
    this.deleteTodoEmittable.emit(todoId).pipe(
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
            allCategory$: this.store.selectOnce(state => state.categories.allCategory)
          },
        width: '700px'
      })
    }
}
