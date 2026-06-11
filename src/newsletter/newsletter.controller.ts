import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './subscribe.dto';

@Controller('api/newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  subscribe(@Body() dto: SubscribeDto) {
    const { alreadySubscribed } = this.newsletterService.subscribe(dto.email);
    return {
      ok: true,
      message: alreadySubscribed
        ? 'Ya estabas en la lista de chismes.'
        : 'Listo, te anotamos. Cero spam (no sabemos cómo).',
    };
  }
}
