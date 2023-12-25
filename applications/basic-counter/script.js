import { fromEvent, interval, timer, merge, NEVER } from 'rxjs';
import { takeUntil, skipUntil, scan } from 'rxjs/operators';
import { setCount, startButton, pauseButton, resetButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

let interval$ = interval(1000)
let timer$ = timer(0, 1000);
let subscription;

// start$.subscribe(() => {
//   // subscription = interval$.subscribe(setCount);
//   subscription = timer$.subscribe(setCount);
// });

// pause$.subscribe(() => {
//   subscription.unsubscribe();
// });


const counter$ = interval$.pipe(
  skipUntil(start$),
  scan(count => count + 1, 0),
  takeUntil(pause$),
);

counter$.subscribe(setCount);