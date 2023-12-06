import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe transforms a date into a relative time string like "5 hours" or "2 days".
 * It is used in the post list to show the time since a post was created. 
 * This pipe is in the entire app available, because it is declared in the app.module.ts.
 */

@Pipe({ name: 'relativeTime' })
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();
    const differenceInHours = Math.floor(
      (now.getTime() - value.getTime()) / 1000 / 60 / 60
    );

    if (differenceInHours < 24) {
      return `${differenceInHours} hours`;
    } else {
      const differenceInDays = Math.floor(differenceInHours / 24);
      return ` ${differenceInDays} days`;
    }
  }
}
