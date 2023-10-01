import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CronService } from './cron.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('cron')
@ApiTags('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Get('ping')
  ping() {
    return this.cronService.ping();
  }
}
