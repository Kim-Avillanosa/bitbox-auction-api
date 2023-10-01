import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionDto {
  @ApiProperty({ default: 1, required: false })
  startAmount: number;

  @ApiProperty({ default: '', required: false })
  name: string;

  @ApiProperty({ required: false })
  expiration: Date;
}
