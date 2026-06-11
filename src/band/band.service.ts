import { Injectable } from '@nestjs/common';
import { BandMember } from './member.interface';

@Injectable()
export class BandService {
  private readonly members: BandMember[] = [
    { slot: '1', name: 'La Toti', role: 'voz', line: 'grita lindo... más o menos', tilt: '-2deg' },
    { slot: '2', name: 'El Ruso', role: 'guitarra', line: 'tres acordes y a otra cosa', tilt: '2deg' },
    { slot: '3', name: 'Colo', role: 'bajo', line: 'el que sostiene todo', tilt: '-1.5deg' },
    { slot: '4', name: 'Panza', role: 'batería', line: 'rompe todo, literal', tilt: '2.5deg' },
    { slot: '5', name: 'Beto', role: 'trompeta', line: 'ex banda de cumbia', tilt: '-2deg' },
    { slot: '6', name: 'La Negra', role: 'saxo', line: 'vino por la birra y se quedó', tilt: '1.5deg' },
  ];

  findAll(): BandMember[] {
    return this.members;
  }
}
