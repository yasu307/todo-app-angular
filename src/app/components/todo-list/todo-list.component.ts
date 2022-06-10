import { Component, OnInit } from '@angular/core';
import { EnumState, Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [
    {
      id: 1,
      categoryId: 1,
      title: "test title",
      body: "test body",
      state: EnumState.TODO,
      updatedAt: "2022/06/10",
      createdAt: "2022/06/10",
    },
    {
      id: 2,
      categoryId: 2,
      title: "second title",
      body: "second body",
      state: EnumState.WORKING,
      updatedAt: "2022/06/10",
      createdAt: "2022/06/10",
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
