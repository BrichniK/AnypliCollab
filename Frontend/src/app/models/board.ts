import { User } from "./user";
export interface Task {
  
  title: string;
  description: string;
  status: 'ToDo' | 'Proceeding' | 'Done';
  priority: 'Low' | 'High';
  deadline: Date; // Ensure this is a Date type
}

export class Board {
  id!: string;
  name!: string;
  tasks!: Task[]; 
  wallpaper!: string;
  users!: User[];
}
