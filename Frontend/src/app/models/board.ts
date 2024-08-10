import { User } from "./user";

export class Board {
    id!: number;
    name!: string;
    tasks!: Task[];
    wallpaper!: string;
    users!:User[]
  }

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'To Do' | 'Proceeding' | 'Done';
    position: { left: number; top: number }; 
    wallpaper: string;
    
}