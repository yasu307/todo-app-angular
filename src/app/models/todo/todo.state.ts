import { Todo } from "./todo"
import { Action, Selector, State, StateContext } from "@ngxs/store"
import { TodoAction } from "./todo.actions"
import { TodoService } from "src/app/views/todo/todo.service"
import { finalize, tap } from "rxjs"
import { Injectable } from "@angular/core"

export class TodoStateModel{
  // 編集/削除中のTodoデータを持つことも可能
  // editingTodo?:  Todo
  // deletingTodo?: Todo[]
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

  constructor(
    private todoService: TodoService
  ){ }

  @Action(TodoAction.Load)
  load(ctx: StateContext<TodoStateModel>){
    return this.todoService.getAllTodo().pipe(
      tap((result: Todo[]) =>
        ctx.patchState({
          allTodo: result
        })
      )
    )
  }

  @Action(TodoAction.Add)
  addTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.Add){
    return this.todoService.addTodo(action.todo).pipe(
      finalize(() => {console.log("finalize");ctx.dispatch(new TodoAction.Load())})
    )
  }

  @Action(TodoAction.Update)
  updateTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.Update){
    return this.todoService.updateTodo(action.todo).pipe(
      finalize(() => ctx.dispatch(new TodoAction.Load()))
    )
  }

  @Action(TodoAction.Delete)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.Delete) {
    return this.todoService.deleteTodo(action.id).pipe(
      finalize(() => ctx.dispatch(new TodoAction.Load()))
    )
  }

  @Selector()
  static allTodo(state: TodoStateModel) {
    return state.allTodo
  }
}
