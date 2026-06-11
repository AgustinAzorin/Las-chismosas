import { Controller, Get } from '@nestjs/common';
import { BandService } from './band.service';
import { BandMember } from './member.interface';

@Controller('api/band')
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Get()
  findAll(): BandMember[] {
    return this.bandService.findAll();
  }
}
