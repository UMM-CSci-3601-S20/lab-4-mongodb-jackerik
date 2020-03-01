import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class TodoListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoCategory: string;
  public todoBody: string;
  public todoStatus: boolean;
  getTodosSub: Subscription;

  constructor(private todoService: TodoService) {

  }

  getTodosFromServer(): void {
    this.unsub();
    this.getTodosSub = this.todoService.getTodos({
      status: this.todoStatus,
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { body: this.todoBody, category: this.todoCategory,
      owner: this.todoOwner });
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getTodosSub) {
      this.getTodosSub.unsubscribe();
    }
  }
}
