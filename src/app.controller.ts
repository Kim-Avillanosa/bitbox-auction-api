import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';
import { convertGMTtoGMT8 } from './helper/convertGMTtoGMT8';

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

    const currentDate = new Date();
    let timezoneDate = convertGMTtoGMT8(currentDate);

    // Add the time to the current date
    timezoneDate = new Date(timezoneDate.getTime() + millisecondsToAdd);

    return timezoneDate.toString();
  }
}
