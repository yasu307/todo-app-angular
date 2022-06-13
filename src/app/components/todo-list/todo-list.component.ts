import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo/todo';
import { TodoService } from 'src/app/models/todo/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$?: Observable<Todo[]>

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos()
  }

}
