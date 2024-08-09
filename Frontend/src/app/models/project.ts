export class Project {
    id!: number;
    name!: string;
    fond!:string;
    tasks!: Task[];
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'To Do' | 'Proceeding' | 'Done';
}