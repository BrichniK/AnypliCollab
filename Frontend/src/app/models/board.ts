export class Board {
    id!: number;
    name!: string;
    tasks!: Task[];
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'To Do' | 'Proceeding' | 'Done';
}