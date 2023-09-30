import { ApiProperty } from '@nestjs/swagger';

export class CreditDto {
  @ApiProperty({ default: 1, required: false })
  amount: number;
}
