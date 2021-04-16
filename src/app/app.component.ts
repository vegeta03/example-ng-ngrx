import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { selectedRecords } from './tasks/store/task.state';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'my-app',
  template: `
    <mat-toolbar layout-align="center" color="primary">
      <h1>To do List</h1>
    </mat-toolbar>
    Num of items: {{ numOfItems$ | async }}
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  numOfItems$: Observable<number>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.numOfItems$ = this.store$.pipe(
      select(selectedRecords),
      tap((t) => console.log(t)),
      map(({ length }) => length)
    );
  }
}
