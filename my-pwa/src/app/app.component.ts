import { Component } from '@angular/core';
import { ToDo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-pwa';

  todos: ToDo[];

  constructor(private toDoService: TodoService) {
    setTimeout(() => this.getAll(), 500);
  }

  public async add(title: string) {
    await this.toDoService.todos.add({ id: Date.now().toString(), title, done: false });
    this.getAll();
  }

  public async getAll(): Promise<void> {
    const data = await this.toDoService.todos.toArray();
    this.todos = data;
  }
}
