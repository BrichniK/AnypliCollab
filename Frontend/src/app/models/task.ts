export class Task {
    id!: number;
    title!: string;
    description!: string;
    status!: 'To Do' | 'Proceeding' | 'Done';  
    priority!: 'High' | 'Low';
    deadline!: Date;
  }
  