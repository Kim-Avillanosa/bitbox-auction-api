import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditDto } from './dto/credit.dto';
import { JWTUtil } from '../../jwt/jwt.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('credit')
@ApiTags('credit')
export class CreditController {
  constructor(
    private readonly creditService: CreditService,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Post('withdraw')
  withdraw(@Body() createDebitDto: CreditDto, @Req() req) {
    const authHeader = req.headers.authorization;
    const token = this.jwtUtil.decode(authHeader);
    return this.creditService.withdraw(token.sub, {
      amount: createDebitDto.amount,
    });
  }
}
