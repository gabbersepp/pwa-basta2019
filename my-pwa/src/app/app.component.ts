import { Component } from '@angular/core';
import { ToDo } from './todo';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-pwa';

  todos: ToDo[];

  constructor(private toDoService: TodoService, private http: HttpClient) {
    setTimeout(() => this.getAll(), 500);
  }

  public async sync(): Promise<void> {
    const result = await this.http.post<ToDo[]>('http://localhost:3030/sync', this.todos).toPromise();
    await this.toDoService.todos.bulkPut(result);
    this.getAll();
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
