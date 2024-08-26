export class Reclamation {
  id?: number;
  commentaire!: string;
  dateadd!:Date;
  statut!:'WAITING' | 'TREATED';  
  dateupdate!:Date;
  datetrait!:Date;
  
}
