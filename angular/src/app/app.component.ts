import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { getData, state$ } from '@app/utility';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';
  subscription!: Subscription;
  handler!: () => void;
  constructor(private renderer: Renderer2) {
    this.handler = renderer.listen(
      'window',
      'test',
      ({ detail }: CustomEvent) => {
        console.log('Angular capturing custom event', detail);
      }
    );
  }
  ngOnInit(): void {
    getData('/data').then((data: any) => {
      console.log('Angular', data);
    });

    this.subscription = state$.subscribe((data: any) => {
      console.log('Angular rxjs state$', data);
    });
    state$.next({ data: 'Angular Data rxjs next' });
    console.log(
      'Angular accessing sessionStorage',
      sessionStorage.getItem('data')
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.handler();
  }
}
