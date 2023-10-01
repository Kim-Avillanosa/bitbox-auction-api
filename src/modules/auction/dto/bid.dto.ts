import { ApiProperty } from '@nestjs/swagger';

export class BidDto {
  @ApiProperty({ default: 1, required: false })
  amount: number;
}
