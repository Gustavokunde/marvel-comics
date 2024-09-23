import { Character } from './character';

export interface User {
  id: string | null;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address?: string;
  characters?: Array<Character>;
}
