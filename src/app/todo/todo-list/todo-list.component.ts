import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/category/category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TodoStoreComponent } from '../todo-store/todo-store.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$?:      Observable<Todo[]>
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
    this.todos$      = this.todoService.getTodos()
    this.categories$ = this.categoryService.getCategories()
  }

  // idから対応するカテゴリを取得するメソッド
  getCategoryById(id: number, categories: Category[]| null): Category | undefined {
    return categories?.find((c: Category) => c.id == id)
  }

  showEditComponent(todo: Todo){
    console.log("show edit component")
  }

  showDeleteComponent(todo: Todo) {
    console.log("show delete component")
  }

  showStoreComponent() {
    const storeDialogRef = this.dialog.open(TodoStoreComponent, {})
    storeDialogRef.afterClosed().subscribe(
      (result) => console.log(result)
    )
  }

}
