import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

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
    // Add the time to the current date
    const newDate = new Date(currentDate.getTime() + millisecondsToAdd);

    return newDate.toString();
  }
}
