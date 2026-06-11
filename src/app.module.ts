import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShowsModule } from './shows/shows.module';
import { BandModule } from './band/band.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [ShowsModule, BandModule, NewsletterModule],
  controllers: [AppController],
})
export class AppModule {}
