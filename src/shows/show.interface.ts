export type ShowStatus = 'entradas' | 'agotado';

export interface Show {
  d: string;
  m: string;
  venue: string;
  city: string;
  note: string;
  status: ShowStatus;
}

export interface ShowView extends Show {
  isEntradas: boolean;
  isAgotado: boolean;
}
