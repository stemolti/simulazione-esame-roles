export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  picture?: string;
  username: string;
  role: 'dipendente' | 'responsabile';
  isConfirmed: boolean;
}
