import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { randText } from '@ngneat/falso';

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

  readonly todosList = this._todosList.asReadonly();

  loadTodos(): void {
    this.http.get<ITask[]>(this.baseUrl).subscribe((list) => {
      this._todosList.set(list);
    });
  }

  update(todo: ITask): void {
    this.http
      .put<ITask>(`${this.baseUrl}/${todo.id}`, { ...todo, title: randText() })
      .subscribe((todoUpdated: ITask) => {
        this._todosList.update((currentList) =>
          currentList.map((todo) =>
            todo.id === todoUpdated.id ? todoUpdated : todo,
          ),
        );
      });
  }
}
