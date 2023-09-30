import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty({ default: 1, required: false })
  amount: number;
}
