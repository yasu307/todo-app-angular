import { Category } from "./category"
import { Selector, State, StateContext } from "@ngxs/store"
import { CategoryService } from "src/app/models/category/category.service"
import { finalize, tap } from "rxjs"
import { Injectable } from "@angular/core"
import { Receiver, Emitter, Emittable, EmitterAction } from "@ngxs-labs/emitter"

export class CategoryStateModel {
  // 編集/削除中のCategoryデータを持つことも可能
  // editingCategory?:  Category
  // deletingCategory?: Category[]
  allCategory?: Category[]
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    allCategory: undefined,
  }
})
@Injectable()
export class CategoryState {
  private static categoryService: CategoryService

  constructor(
    private categoryService: CategoryService
  ) {
    CategoryState.categoryService = categoryService
  }

  @Receiver()
  static load(ctx: StateContext<CategoryStateModel>) {
    return this.categoryService.getAllCategory().pipe(
      tap((result: Category[]) =>
        ctx.patchState({
          allCategory: result
        })
      )
    )
  }

  // TodoState内でTodoState.loadを実行する必要があるためEimitterを作成する
  @Emitter(CategoryState.load)
  private static loadCategoryEmittable: Emittable<void>

  @Receiver()
  static addCategory(ctx: StateContext<CategoryStateModel>, { payload }: EmitterAction<Category>) {
    return this.categoryService.addCategory(payload).pipe(
      finalize(() => this.loadCategoryEmittable.emit()))
  }

  @Receiver()
  static updateCategory(ctx: StateContext<CategoryStateModel>, { payload }: EmitterAction<Category>) {
    return this.categoryService.updateCategory(payload).pipe(
      finalize(() => this.loadCategoryEmittable.emit()))
  }

  @Receiver()
  static deleteTodo(ctx: StateContext<CategoryStateModel>, { payload }: EmitterAction<number>) {
    return this.categoryService.deleteCategory(payload).pipe(
      finalize(() => this.loadCategoryEmittable.emit()))
  }

  @Selector()
  static allCategory(state: CategoryStateModel) {
    return state.allCategory
  }
}
