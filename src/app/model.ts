export interface ICategory {
  id: number;
  name: string;
  tasks?: Array<ITask>;
  done: boolean;
}

export interface ITask {
  id: number;
  name: string;
  description: string;
  done: boolean;
}
