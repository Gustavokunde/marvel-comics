export interface User {
  id: string | null;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address?: string;
}
