export class User {
    id?: number;
    name!: string;
    password!: string;
    email!: string;
    active!: boolean;
    roles!: Role[];
    imageURL! : string ;
}

export interface Role {
    id: number;
    name: string;
}


