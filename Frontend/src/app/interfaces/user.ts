export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  picture?: string;
  username: string;
  role: 'employee' | 'organizer';
  isConfirmed: boolean;
}
