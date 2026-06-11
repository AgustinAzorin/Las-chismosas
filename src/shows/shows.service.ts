import { Injectable } from '@nestjs/common';
import { Show, ShowView } from './show.interface';

@Injectable()
export class ShowsService {
  private readonly shows: Show[] = [
    {
      d: '14',
      m: 'JUN',
      venue: 'El Emergente',
      city: 'Palermo, CABA',
      note: 'con bandas invitadas',
      status: 'entradas',
    },
    {
      d: '28',
      m: 'JUN',
      venue: 'Galpón B',
      city: 'Avellaneda',
      note: 'entrada libre y gratuita',
      status: 'entradas',
    },
    {
      d: '12',
      m: 'JUL',
      venue: 'Club V',
      city: 'La Plata',
      note: 'fecha doble',
      status: 'agotado',
    },
    {
      d: '02',
      m: 'AGO',
      venue: 'Uruguay 14',
      city: 'Once, CABA',
      note: 'presentación del disco',
      status: 'entradas',
    },
  ];

  findAll(): ShowView[] {
    return this.shows.map((s) => ({
      ...s,
      isEntradas: s.status === 'entradas',
      isAgotado: s.status === 'agotado',
      isoDate: this.toIsoDate(s),
    }));
  }

  private static readonly MONTHS: Record<string, number> = {
    ENE: 1, FEB: 2, MAR: 3, ABR: 4, MAY: 5, JUN: 6,
    JUL: 7, AGO: 8, SEP: 9, OCT: 10, NOV: 11, DIC: 12,
  };

  // Los shows se cargan sin año: se asume la próxima ocurrencia de ese día/mes.
  private toIsoDate(show: Show): string {
    const month = ShowsService.MONTHS[show.m.toUpperCase()] ?? 1;
    const day = Number(show.d);
    const today = new Date();
    let year = today.getFullYear();
    const candidate = new Date(year, month - 1, day);
    if (candidate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      year += 1;
    }
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
}
