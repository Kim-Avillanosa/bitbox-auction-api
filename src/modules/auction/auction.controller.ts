import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { BidDto } from './dto/bid.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTUtil } from '../../jwt/jwt.service';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AuctionStatus } from './entities/auction.entity';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('auction')
@ApiTags('auction')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto, @Req() req) {
    const authHeader = req.headers.authorization;
    const token = this.jwtUtil.decode(authHeader);

    return this.auctionService.create(token.username, createAuctionDto);
  }

  @Get(':id')
  getBid(@Param('id') id: number) {
    return this.auctionService.getAuction(id);
  }

  @Post(':id/start')
  start(@Param('id') id: number) {
    return this.auctionService.startBid(id);
  }

  @SkipThrottle({ default: false })
  @Post(':id/bid')
  placeBid(@Param('id') id: number, @Body() bid: BidDto, @Req() req) {
    const authHeader = req.headers.authorization;
    const token = this.jwtUtil.decode(authHeader);
    return this.auctionService.placeBid(id, token.sub, bid);
  }

  @Get(':id/best')
  getHigestBidder(@Param('id') id: number) {
    return this.auctionService.highestBidder(id);
  }

  @Get(':id/bidders')
  getBidders(@Param('id') id: number) {
    return this.auctionService.getBidList(id);
  }

  @Get('list/:status')
  getAuctions(@Param('status') status: AuctionStatus) {
    return this.auctionService.getAuctions(status);
  }
}
