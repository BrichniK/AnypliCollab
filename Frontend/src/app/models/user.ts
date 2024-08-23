export interface User {
    id: string; 
    name?: string;
    password?: string;
    email?: string;
    active?: boolean;
    role?: Role;
    imageURL?: string;
  }
  
  export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    COLLAB = 'COLLAB'
  }
  