import { User } from "./user";
export interface Activity {
    id: number;
    userId: number;
    description: string;
    date: Date;
    user?: User;
  }


  