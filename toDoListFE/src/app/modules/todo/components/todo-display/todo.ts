export interface IToDo {
  id: number;
  userid: number;
  title: string;
  description: string;
  completeBy: Date;
  status: 'COMPLETED' | 'LATE' | 'IN_PROGRESS';
}
