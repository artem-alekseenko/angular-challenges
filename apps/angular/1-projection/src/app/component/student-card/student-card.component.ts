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
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ItemTemplateDirective } from '../../directives/item-template.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (add)="onAddStudent()"
      (delete)="onDeleteStudent($event)"
      [accentColor]="studentAccent">
      <img
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="Student" />
      <ng-template appItemTemplate let-item>
        {{ item.firstName }}
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ItemTemplateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);
  private destroyRef = inject(DestroyRef);

  readonly studentAccent = 'rgba(0, 250, 0, 0.1)';

  students = this.store.students;

  onAddStudent() {
    this.store.addOne(randStudent());
  }

  onDeleteStudent(id: number) {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchStudents$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((s) => this.store.addAll(s));
  }
}
