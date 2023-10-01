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
} from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditDto } from './dto/credit.dto';
import { JWTUtil } from 'src/jwt/jwt.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('credit')
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
