export interface User {
    id?: string; // Changed from number to string to match MongoDB ObjectId type
    name: string;
    password: string;
    email: string;
    active: boolean;
    role: Role; // Changed from Role[] to single Role
    imageURL: string;
  }
  
  export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    COLLAB = 'COLLAB'
  }
  