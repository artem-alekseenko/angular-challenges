import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appItemTemplate]',
  standalone: true,
})
export class ItemTemplateDirective {
  readonly templateRef = inject(TemplateRef<{ $implicit: { id: number } }>);
}
