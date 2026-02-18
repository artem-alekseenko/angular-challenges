import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITask {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  private readonly _todosList: WritableSignal<ITask[]> = signal([]);

  getTodos(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.baseUrl);
  }

  updateTodo(todo: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.baseUrl}/${todo.id}`, todo, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  }
}
