import { User } from "./user";

export interface Task {
  id : string
  title: string;
  description: string;
  status: 'To Do' | 'Proceeding' | 'Done';
  priority: 'Low' | 'High';
  deadline: Date;
  userId?: string; // Add this field to reference the user
}

export class Board {
  id!: string;
  name!: string;
  tasks!: Task[];
  wallpaper!: string;
  users!: User[]; // Add this if not already present
  uploadedFileUrl?: string
}
