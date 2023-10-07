import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';
import { convertGMTtoGMT8, passMsToTimezone } from './helper/convertGMTtoGMT8';
import * as moment from 'moment';

@SkipThrottle()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/time/:ms')
  testDate(@Param('ms', ParseIntPipe) millisecondsToAdd: number): string {
    if (isNaN(millisecondsToAdd)) {
      return 'Invalid input. Please provide a valid number of milliseconds.';
    }

    let timezoneDate = passMsToTimezone(millisecondsToAdd);

    // Add the time to the current date
    timezoneDate = new Date(timezoneDate.getTime() + millisecondsToAdd);

    const momentDate = moment(timezoneDate);

    var result = momentDate.format('YYYY-MM-DD HH:mm:ss A');

    return result;
  }
}
