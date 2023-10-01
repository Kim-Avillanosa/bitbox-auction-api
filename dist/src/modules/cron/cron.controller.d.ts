import { CronService } from './cron.service';
export declare class CronController {
    private readonly cronService;
    constructor(cronService: CronService);
    ping(): Promise<string>;
}
