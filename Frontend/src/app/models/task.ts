export class Task {
    
    title!: string;
    description!: string;
    status!: 'ToDo' | 'Proceeding' | 'Done';  
    priority!: 'High' | 'Low';
    deadline!: Date;
  }
  