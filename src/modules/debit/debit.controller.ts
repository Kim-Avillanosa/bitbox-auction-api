import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  createParamDecorator,
  Headers,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { DebitService } from './debit.service';
import { AuthGuard } from '../auth/auth.guard';
import { JWTUtil } from 'src/jwt/jwt.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('debit')
@ApiTags('debit')
export class DebitController {
  constructor(
    private readonly debitService: DebitService,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Post('deposit')
  deposit(@Body() createDebitDto: DepositDto, @Req() req) {
    const authHeader = req.headers.authorization;
    const token = this.jwtUtil.decode(authHeader);
    return this.debitService.deposit(token.sub, {
      amount: createDebitDto.amount,
    });
  }
}
