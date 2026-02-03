import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { ItemTemplateDirective } from '../../directives/item-template.directive';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (add)="onAddTeacher()"
      (delete)="onDeleteTeacher($event)"
      [accentColor]="teachersAccent">
      <img
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="Teacher"
        priority />
      <ng-template appItemTemplate let-item>
        {{ item.firstName }}
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ItemTemplateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  private destroyRef = inject(DestroyRef);

  readonly teachersAccent = 'rgba(250, 0, 0, 0.1)';

  teachers = this.store.teachers;

  onAddTeacher() {
    this.store.addOne(randTeacher());
  }

  onDeleteTeacher(id: number) {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchTeachers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((t) => this.store.addAll(t));
  }
}
