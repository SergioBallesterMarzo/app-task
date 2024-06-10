export interface Task {
      id: string;
      name: string,
      status: Status,
      employee: string
}

export type Status = 'Pendiente' | 'En proceso' | 'Completada';

