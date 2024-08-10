export class Task {
    id!: number;
    title!: string;
    description!: string;
    status!: 'To Do' | 'Proceeding' | 'Done';  
    priority!: 'High' | 'Low';
    deadline!: Date;
    position!: { left: number; top: number }; 
    wallpaper!:string;
  }
  