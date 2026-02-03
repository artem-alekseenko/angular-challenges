import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ItemTemplateDirective } from '../../directives/item-template.directive';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      (add)="onAddCity()"
      (delete)="onDeleteCity($event)"
      [accentColor]="cityAccent">
      <img ngSrc="assets/img/city.png" width="200" height="200" alt="City" />
      <ng-template appItemTemplate let-item>
        {{ item.name }}
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ItemTemplateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  private destroyRef = inject(DestroyRef);

  readonly cityAccent = 'rgba(0, 0, 250, 0.1)';
  cities = this.store.cities;

  onAddCity() {
    this.store.addOne(randomCity());
  }

  onDeleteCity(id: number) {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchCities$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((c) => this.store.addAll(c));
  }
}
