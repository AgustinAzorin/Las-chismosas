import { Injectable } from '@nestjs/common';
import { BandMember } from './member.interface';

@Injectable()
export class BandService {
  private readonly members: BandMember[] = [
    { slot: '1', name: 'Santi White', role: 'voz', line: 'grita lindo... más o menos', tilt: '-2deg' },
    { slot: '2', name: 'Mauri Blasco', role: 'guitarra', line: 'tres acordes y a otra cosa', tilt: '2deg' },
    { slot: '3', name: 'Luca', role: 'bajo', line: 'el que sostiene todo', tilt: '-1.5deg' },
    { slot: '4', name: 'Lean', role: 'batería', line: 'rompe todo, literal', tilt: '2.5deg' },
    { slot: '5', name: 'Santi Chaulderon', role: 'piano', line: 'teclas y caos', tilt: '-2deg' },
  ];

  findAll(): BandMember[] {
    return this.members;
  }
}
