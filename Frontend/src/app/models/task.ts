export class Task {
    
    title!: string;
    description!: string;
    status!: 'To Do' | 'Proceeding' | 'Done';  
    priority!: 'High' | 'Low';
    deadline!: Date;
  }
  