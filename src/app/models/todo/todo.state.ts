import { Todo } from "./todo"
import { Selector, State, StateContext } from "@ngxs/store"
import { TodoService } from "src/app/models/todo/todo.service"
import { finalize, tap } from "rxjs"
import { Injectable } from "@angular/core"
import { Emitter, EmitterAction, Receiver, Emittable } from "@ngxs-labs/emitter"

export class TodoStateModel{
  allTodo?: Todo[]
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    allTodo: undefined,
  }
})
@Injectable()
export class TodoState{
  private static todoService: TodoService

  constructor(
    // todoServiceをDIする
    private todoService: TodoService
  ){
    // 静的メソッドでもtodoServiceを使えるように
    TodoState.todoService = todoService
  }

  @Receiver()
  static load(ctx: StateContext<TodoStateModel>) {
    return this.todoService.getAllTodo().pipe(
      tap((result: Todo[]) =>
        ctx.patchState({
          allTodo: result
        })
      )
    )
  }

  // TodoState内でTodoState.loadを実行する必要があるためEimitterを作成する
  @Emitter(TodoState.load)
  private static loadTodoEmittable: Emittable<void>

  @Receiver()
  static addTodo(ctx: StateContext<TodoStateModel>, { payload }: EmitterAction<Todo>){
    return this.todoService.addTodo(payload).pipe(
      finalize(() => this.loadTodoEmittable.emit()))
  }

  @Receiver()
  static updateTodo(ctx: StateContext<TodoStateModel>, { payload }: EmitterAction<Todo>) {
    return this.todoService.updateTodo(payload).pipe(
      finalize(() => this.loadTodoEmittable.emit()))
  }

  @Receiver()
  static deleteTodo(ctx: StateContext<TodoStateModel>, { payload }: EmitterAction<number>) {
    return this.todoService.deleteTodo(payload).pipe(
      finalize(() => this.loadTodoEmittable.emit()))
  }

  @Selector()
  static allTodo(state: TodoStateModel) {
    return state.allTodo
  }
}
