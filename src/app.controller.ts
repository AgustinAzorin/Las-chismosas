import { Controller, Get, Render } from '@nestjs/common';
import { ShowsService } from './shows/shows.service';
import { BandService } from './band/band.service';

@Controller()
export class AppController {
  constructor(
    private readonly showsService: ShowsService,
    private readonly bandService: BandService,
  ) {}

  @Get()
  @Render('index')
  index() {
    return {
      shows: this.showsService.findAll(),
      band: this.bandService.findAll(),
    };
  }
}
