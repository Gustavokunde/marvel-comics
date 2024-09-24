import { Character } from './character';

export interface User {
  id: string | null;
  name: string;
  document: string;
  email: string;
  phone: string;
  address?: string;
  characters?: Array<Character>;
}
