import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryService } from 'src/app/views/category/category.service';
import { Observable, tap, catchError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { getStateFromCode, Todo } from 'src/app/models/todo';
import { TodoService } from '../todo.service';
import { StateOptions } from 'src/app/models/todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorHandler } from 'src/app/utility/error-handler';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoFormGroup!: FormGroup
  allCategory$?:  Observable<Category[]> = this.categoryService.allCategory$

  // stateOptionsの選択肢を持つ配列
  stateOptArray = Object.values(StateOptions)

  // Todo追加フォームの場合 undefined
  // Todo更新フォームの場合 Todo
  @Input() selectedTodo?: Todo

  pageTitle?: string

  // Formの処理が終わったことをTodoFormDialogComponentに伝えるためのEventEmitter
  @Output() isFinishedEvent = new EventEmitter<boolean>();

  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private errorHandler:    MyErrorHandler,
  ) { }

  ngOnInit(): void {
    // ページタイトルの決定
    this.pageTitle = this.selectedTodo ? "Todo更新画面" : "Todo追加画面"

    // FormGroupの作成
    this.todoFormGroup = new FormGroup({
        categoryId: new FormControl(this.selectedTodo?.categoryId,                           [Validators.required]),
        title:      new FormControl(this.selectedTodo?.title,                                [Validators.required, Validators.maxLength(255)]),
        body:       new FormControl(this.selectedTodo?.body,                                 []),
        stateCode:  new FormControl(this.selectedTodo?.state.code ?? StateOptions.TODO.code, [Validators.required])
    })
    // もしtodo追加フォームだったらstateCodeは操作できないようにする
    // todo追加フォームだった場合は、FormGroup作成時にstateCodeをTODO.codeに設定している
    // そのため、TODOがすでに選択されていて、操作ができない状態になる
    if (!this.selectedTodo) this.todoFormGroup.controls["stateCode"].disable()

    this.categoryService.fetchAllCategory()
  }

  // todoを追加するメソッド
  addTodo() {
    // Validationに問題がなければ処理を実行する
    if (!this.todoFormGroup.invalid) {
      // formで指定された値をもつtodoを作成する
      const todoFromFormVal: Todo = this.createTodoFromFormVal()
      // DBにtodoを追加する
      this.todoService.addTodo(todoFromFormVal).pipe(
        // 追加が成功したら
        tap((addedTodo: Todo) => {
          // allTodoSourceを更新する
          this.todoService.fetchAllTodo()
        }),
        // エラーが発生したら処理をする
        catchError(this.errorHandler.handleError<Todo>('addTodo'))
      ).subscribe(
        // 保存が終了したのち
        (resp) => {
          // todoFormDialogComponentに終了したことを伝える
          this.isFinishedEvent.emit(true)
        }
      )
    }
  }

  // todoを更新するメソッド
  updateTodo() {
    if (!this.todoFormGroup.invalid) {
      // formで指定された値をもつtodoを作成する
      const todoFromFormVal: Todo = this.createTodoFromFormVal()
      // DBにてtodoを更新する
      this.todoService.updateTodo(todoFromFormVal).pipe(
        // 更新が成功したら
        tap((updatedTodo: Todo) => {
          // allTodoSourceを更新する
          this.todoService.fetchAllTodo()
        }),
        // エラーが発生したら処理をする
        catchError(this.errorHandler.handleError<Todo>('updateTodo'))
      ).subscribe(
        // 更新が終了したのち
        (resp) => {
          // todoFormDialogComponentに終了したことを伝える
          this.isFinishedEvent.emit(true)
        }
      )
    }
  }

  // Formの値をもつtodoを作成する
  createTodoFromFormVal(): Todo{
    let todoFromForm = {
      id:         this.selectedTodo?.id,
      categoryId: this.todoFormGroup.value.categoryId,
      title:      this.todoFormGroup.value.title,
      body:       this.todoFormGroup.value.body,
      // stateはデフォルトでTODOを指定する
      state:      StateOptions.TODO,
      updatedAt:  this.selectedTodo?.updatedAt ?? new Date(),
      createdAt:  this.selectedTodo?.createdAt ?? new Date(),
    } as Todo
    // もしtodo更新フォームであれば、formで選択されたstateCodeに対応するStateを設定する
    // todo追加フォームではtodoFromGroupのstateCodeをdisableにしており、
    // それにより、this.todoFormGroup.value.stateCodeを呼び出すとエラーが発生するためこのようなif文を用いた実装になっている
    if(this.selectedTodo) todoFromForm.state = getStateFromCode(this.todoFormGroup.value.stateCode)!
    return todoFromForm
  }
}
