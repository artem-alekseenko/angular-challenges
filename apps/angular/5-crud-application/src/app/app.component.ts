import { Component, inject, OnInit } from '@angular/core';
import { ITask, TodosService } from './todos.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly todosService = inject(TodosService);

  readonly todos = this.todosService.todosList;

  update(todo: ITask): void {
    this.todosService.update(todo);
  }

  ngOnInit(): void {
    this.todosService.loadTodos();
  }
}
