import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'Chris',
      status: true,
      category: 'groceries',
      body: 'chris@this.that',
    },
    {
      _id: 'pat_id',
      owner: 'Pat',
      status: false,
      category: 'videogames',
      body: 'pat@something.com',
    },
    {
      _id: 'jamie_id',
      owner: 'Jamie',
      status: true,
      category: 'videogames',
      body: 'jamie@frogs.com',
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { owner?: string, body?: string, category?: string, status?: boolean }): Observable<Todo[]> {
    return of(MockTodoService.testTodos);
  }

}
