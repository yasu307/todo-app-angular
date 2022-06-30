import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo/todo';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category/category';

@Component({
  selector: 'app-todo-form-dialog',
  templateUrl: './todo-form-dialog.component.html',
  styleUrls: ['./todo-form-dialog.component.scss']
})
export class TodoFormDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TodoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedTodo?: Todo, allCategory$: Observable<Category[]>}
  ) { }

  ngOnInit(): void {
  }

  // TodoFormComponentからこのメソッドにtrueが渡されたら、Dialogを終了する
  finishDialog(isFinished: boolean){
    if(isFinished) this.dialogRef.close("todo store component finished")
  }
}
