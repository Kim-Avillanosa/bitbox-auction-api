import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { BidDto } from './dto/bid.dto';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.create(createAuctionDto);
  }

  @Post(':id/start')
  start(@Param('id') id: number) {
    return this.auctionService.startBid(id);
  }

  @Post(':id/bid')
  placeBid(@Param('id') id: number, @Body() bid: BidDto) {
    return this.auctionService.placeBid(id, bid);
  }
}
