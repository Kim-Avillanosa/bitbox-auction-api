import { Injectable } from '@nestjs/common';

@Injectable()
export class CronService {
  ping() {
    return `This action returns all cron`;
  }
}
