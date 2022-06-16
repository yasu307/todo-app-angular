import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-store',
  templateUrl: './todo-store.component.html',
  styleUrls: ['./todo-store.component.scss']
})
export class TodoStoreComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TodoStoreComponent>,
  ) { }

  ngOnInit(): void {
  }

  storeTodo(){
    this.dialogRef.close("todo store component finished")
  }

}
