import { User } from "./user";

export interface Task {
  id : string
  title: string;
  description: string;
  status: 'ToDo' | 'Proceeding' | 'Done';
  priority: 'Low' | 'High';
  deadline: Date;
  userId?: string;
}

export class Board {
  id!: string;
  name!: string;
  tasks!: Task[];
  wallpaper!: string;
  users!: User[]; 
  uploadedFileUrl?: string;
  userId?: string;
}
