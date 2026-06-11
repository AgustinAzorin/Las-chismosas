import { Controller, Get } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowView } from './show.interface';

@Controller('api/shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get()
  findAll(): ShowView[] {
    return this.showsService.findAll();
  }
}
