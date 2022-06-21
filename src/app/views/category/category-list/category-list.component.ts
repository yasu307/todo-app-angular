import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../category.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  allCategory$: Observable<Category[]> = this.categoryService.allCategory$

  faEdit       = faEdit
  faTrashAlt   = faTrashAlt
  faPlusCircle = faPlusCircle
  faCircle     = faCircle

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.fetchAllCategory()
  }

  // カテゴリ更新ダイアログを表示する
  showEditDialog(category: Category) {
    console.log("show edit dialog")
    // const editDialogRef = this.dialog.open(TodoFormDialogComponent, { data: todo, width: '700px' })
  }

  deleteComponent(categoryId: number) {
    console.log("delete component")
    // this.categoryService.deleteTodo(categoryId).subscribe()
  }

  // カテゴリ追加ダイアログを表示する
  showStoreDialog() {
    console.log("show store dialog")
    // const storeDialogRef = this.dialog.open(TodoFormDialogComponent, { width: '700px' })
  }
}
