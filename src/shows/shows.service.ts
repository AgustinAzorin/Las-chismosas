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
    }));
  }
}
