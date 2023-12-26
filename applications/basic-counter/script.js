import { fromEvent, interval, timer, merge, NEVER } from 'rxjs';
import { takeUntil, skipUntil, scan, mapTo, switchMap } from 'rxjs/operators';
import { setCount, startButton, pauseButton, resetButton } from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));

const counter$ = merge(start$, pause$).pipe(
  switchMap((shouldIBeRunning) => {
    return shouldIBeRunning ? interval(1000) : NEVER;
  }),
  scan(count => count + 1, 0),
);

counter$.subscribe(setCount);