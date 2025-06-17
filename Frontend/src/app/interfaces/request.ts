import { User } from './user';

export type StatoRichiesta = 'In attesa' | 'Approvato' | 'Rifiutato';

export interface RichiestaPermesso {
  _id?: string;
  dataRichiesta: Date;
  dataInizio: Date;
  dataFine: Date;
  categoriaId: CategoriaPermesso;
  motivazione: string;
  stato: StatoRichiesta;
  utenteId: string | User;
  dataValutazione?: Date;
  utenteValutazioneId?: string | User;
}

export interface CategoriaPermesso {
  _id?: string;
  descrizione: string;
}
