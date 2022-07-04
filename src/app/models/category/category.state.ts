import { Category } from "./category"
import { Action, Selector, State, StateContext } from "@ngxs/store"
import { CategoryAction } from "./category.action"
import { CategoryService } from "src/app/models/category/category.service"
import { finalize, tap } from "rxjs"
import { Injectable } from "@angular/core"

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

  constructor(
    private categoryService: CategoryService
  ) { }

  @Action(CategoryAction.Load)
  load(ctx: StateContext<CategoryStateModel>) {
    return this.categoryService.getAllCategory().pipe(
      tap((result: Category[]) =>
        ctx.patchState({
          allCategory: result
        })
      )
    )
  }

  @Action(CategoryAction.Add)
  addCategory(ctx: StateContext<CategoryStateModel>, action: CategoryAction.Add) {
    return this.categoryService.addCategory(action.category).pipe(
      finalize(() => { console.log("finalize"); ctx.dispatch(new CategoryAction.Load()) })
    )
  }

  @Action(CategoryAction.Update)
  updateCategory(ctx: StateContext<CategoryStateModel>, action: CategoryAction.Update) {
    return this.categoryService.updateCategory(action.category).pipe(
      finalize(() => ctx.dispatch(new CategoryAction.Load()))
    )
  }

  @Action(CategoryAction.Delete)
  deleteCategory(ctx: StateContext<CategoryStateModel>, action: CategoryAction.Delete) {
    return this.categoryService.deleteCategory(action.id).pipe(
      finalize(() => ctx.dispatch(new CategoryAction.Load()))
    )
  }

  @Selector()
  static allCategory(state: CategoryStateModel) {
    return state.allCategory
  }
}
