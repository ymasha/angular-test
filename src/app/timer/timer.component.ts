import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { take, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() initial: number;
  counter$: Observable<number>;
  timerStoped = new Subject<void>();

  ngOnInit() {
    this.counter$ = timer(0, 1000).pipe(
      take(this.initial),
      map(() => --this.initial),
      takeUntil(this.timerStoped),
    );
  }

  /**
   * stop timer
   */
  stopTimer() {
    this.timerStoped.next();
  }

}
