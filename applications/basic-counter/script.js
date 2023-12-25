import { fromEvent, interval, timer, merge, NEVER } from 'rxjs';
import { setCount, startButton, pauseButton, resetButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

let interval$ = interval(1000)
let timer$ = timer(0, 1000)
let subscription;

start$.subscribe(() => {
  // subscription = interval$.subscribe(setCount);
  subscription = timer$.subscribe(setCount);
});

pause$.subscribe(() => {
  subscription.unsubscribe();
});
