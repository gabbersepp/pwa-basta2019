import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { ToDo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends Dexie {

  todos: Dexie.Table<ToDo, string>;

  constructor() {
    super('todo-db');
    this.version(1).stores({
      todos: 'id, title, done'
    });
  }
}
