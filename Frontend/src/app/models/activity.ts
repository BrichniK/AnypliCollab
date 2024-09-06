import { User } from "./user";
export interface Activity {
    id: string;
    userId: number;
    description: string;
    date: Date;
    user?: User;
  }


  