import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
export declare class CronService {
    create(createCronDto: CreateCronDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCronDto: UpdateCronDto): string;
    remove(id: number): string;
}
