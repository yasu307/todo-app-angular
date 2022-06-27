import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.scss']
})
export class CategoryFormDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedCategory?: Category
  ) { }

  ngOnInit(): void {
  }

  // CategoryFormComponentからこのメソッドにtrueが渡されたら、Dialogを終了する
  finishDialog(isFinished: boolean) {
    if (isFinished) this.dialogRef.close("category form component finished")
  }
}
