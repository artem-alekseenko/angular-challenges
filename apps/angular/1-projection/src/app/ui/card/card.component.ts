import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, output } from '@angular/core';
import { ItemTemplateDirective } from '../../directives/item-template.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.background-color]="accentColor()">
      <ng-content></ng-content>

      <section>
        @for (item of list(); track item.id) {
          <app-list-item [id]="item.id" (delete)="deleteItem($event)">
            @if (itemTemplate(); as itemTpl) {
              <ng-container
                *ngTemplateOutlet="
                  itemTpl.templateRef;
                  context: { $implicit: item }
                " />
            }
          </app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
  standalone: true,
})
export class CardComponent {
  readonly list = input<{ id: number }[] | null>(null);
  readonly accentColor = input<string>('transparent');

  itemTemplate = contentChild(ItemTemplateDirective);

  add = output<void>();
  delete = output<number>();

  addNewItem() {
    this.add.emit();
  }

  deleteItem(id: number) {
    this.delete.emit(id);
  }
}
