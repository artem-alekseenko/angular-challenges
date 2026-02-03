import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-content></ng-content>
      <button (click)="deleteItem(id())">
        <img class="h-5" src="assets/svg/trash.svg" alt="Trash" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  readonly id = input.required<number>();

  delete = output<number>();

  deleteItem(id: number) {
    this.delete.emit(id);
  }
}
