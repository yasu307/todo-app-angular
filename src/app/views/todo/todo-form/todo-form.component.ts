import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { getStateFromCode, Todo } from 'src/app/models/todo/todo';
import { StateOptions } from 'src/app/models/todo/todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { TodoState } from 'src/app/models/todo/todo.state';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoFormGroup!: FormGroup

  // stateOptionsの選択肢を持つ配列
  stateOptArray = Object.values(StateOptions)

  // Todo追加フォームの場合 undefined
  // Todo更新フォームの場合 Todo
  @Input() selectedTodo?: Todo

  @Input() allCategory$!: Observable<Category[]>

  pageTitle?: string

  // Formの処理が終わったことをTodoFormDialogComponentに伝えるためのEventEmitter
  @Output() isFinishedEvent = new EventEmitter<boolean>();

  // backendにリクエスト中かどうかを表す変数
  isRequesting: boolean = false

  @Emitter(TodoState.addTodo)
  private addTodoEmittable!: Emittable<Todo>

  @Emitter(TodoState.updateTodo)
  private updateTodoEmittable!: Emittable<Todo>

  constructor(
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
  }

  // todoを追加するメソッド
  addTodo() {
    // Validationに問題がなければ処理を実行する
    if (!this.todoFormGroup.invalid) {
      this.isRequesting = true

      // formで指定された値をもつtodoを作成する
      const todoFromFormVal: Todo = this.createTodoFromFormVal()
      // DBにtodoを追加する
      // Observable<any>
      this.addTodoEmittable.emit(todoFromFormVal).pipe(
        // エラーが発生したら処理をする
        catchError(this.errorHandler.handleError<Todo>('addTodo'))
      ).subscribe(
        // 保存が終了したのち
        (resp) => {
          this.isRequesting = false
          // todoFormDialogComponentに終了したことを伝える
          this.isFinishedEvent.emit(true)
        }
      )
    }
  }

  // todoを更新するメソッド
  updateTodo() {
    if (!this.todoFormGroup.invalid) {
      this.isRequesting =true

      // formで指定された値をもつtodoを作成する
      const todoFromFormVal: Todo = this.createTodoFromFormVal()
      // DBにてtodoを更新する
      // Observable<Todo>
      this.updateTodoEmittable.emit(todoFromFormVal).pipe(
        // エラーが発生したら処理をする
        catchError(this.errorHandler.handleError<Todo>('updateTodo'))
      ).subscribe(
        // 更新が終了したのち
        (resp) => {
          this.isRequesting = false
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
      body:       this.todoFormGroup.value.body?.trim(),
      // stateはデフォルトでTODOを指定する
      state:      StateOptions.TODO,
      updatedAt:  this.selectedTodo?.updatedAt,
      createdAt:  this.selectedTodo?.createdAt,
    } as Todo
    // もしtodo更新フォームであれば、formで選択されたstateCodeに対応するStateを設定する
    // todo追加フォームではtodoFromGroupのstateCodeをdisableにしており、
    // それにより、this.todoFormGroup.value.stateCodeを呼び出すとエラーが発生するためこのようなif文を用いた実装になっている
    if(this.selectedTodo) todoFromForm.state = getStateFromCode(this.todoFormGroup.value.stateCode)!
    return todoFromForm
  }
}
