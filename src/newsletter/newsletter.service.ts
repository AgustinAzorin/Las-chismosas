import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);
  private readonly subscribers = new Set<string>();

  subscribe(email: string): { ok: true; alreadySubscribed: boolean } {
    const normalized = email.trim().toLowerCase();
    const alreadySubscribed = this.subscribers.has(normalized);
    this.subscribers.add(normalized);
    this.logger.log(`Nuevx chismosx en la lista: ${normalized}`);
    return { ok: true, alreadySubscribed };
  }

  count(): number {
    return this.subscribers.size;
  }
}
