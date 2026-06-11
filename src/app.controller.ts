import { Controller, Get, Header, Render, Req } from '@nestjs/common';
import { Request } from 'express';
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
  index(@Req() req: Request) {
    const baseUrl = this.baseUrl(req);
    return {
      shows: this.showsService.findAll(),
      band: this.bandService.findAll(),
      canonicalUrl: `${baseUrl}/`,
      jsonLd: JSON.stringify(this.buildJsonLd(baseUrl)),
    };
  }

  @Get('robots.txt')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  robots(@Req() req: Request): string {
    return [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      '',
      `Sitemap: ${this.baseUrl(req)}/sitemap.xml`,
      '',
    ].join('\n');
  }

  @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml; charset=utf-8')
  sitemap(@Req() req: Request): string {
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      '  <url>',
      `    <loc>${this.baseUrl(req)}/</loc>`,
      '    <changefreq>weekly</changefreq>',
      '    <priority>1.0</priority>',
      '  </url>',
      '</urlset>',
      '',
    ].join('\n');
  }

  // SITE_URL permite fijar el dominio canónico; si no, se infiere del request
  // (Vercel manda x-forwarded-proto/host).
  private baseUrl(req: Request): string {
    if (process.env.SITE_URL) {
      return process.env.SITE_URL.replace(/\/$/, '');
    }
    const proto =
      (req.headers['x-forwarded-proto'] as string)?.split(',')[0] ??
      req.protocol ??
      'https';
    const host =
      (req.headers['x-forwarded-host'] as string) ?? req.headers.host ?? 'localhost';
    return `${proto}://${host}`;
  }

  private buildJsonLd(baseUrl: string) {
    const band = {
      '@type': 'MusicGroup',
      '@id': `${baseUrl}/#band`,
      name: 'Las Chismosas',
      url: `${baseUrl}/`,
      genre: ['Ska', 'Punk', 'Reggae'],
      foundingLocation: {
        '@type': 'Place',
        name: 'Buenos Aires, Argentina',
      },
      description:
        'Las Chismosas — banda de ska / punk / reggae del under argentino.',
    };

    const events = this.showsService.findAll().map((show) => ({
      '@type': 'MusicEvent',
      name: `Las Chismosas en ${show.venue}`,
      startDate: show.isoDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: show.venue,
        address: {
          '@type': 'PostalAddress',
          addressLocality: show.city,
          addressCountry: 'AR',
        },
      },
      performer: { '@id': `${baseUrl}/#band` },
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/#contacto`,
        availability:
          show.status === 'agotado'
            ? 'https://schema.org/SoldOut'
            : 'https://schema.org/InStock',
      },
    }));

    return {
      '@context': 'https://schema.org',
      '@graph': [band, ...events],
    };
  }
}
