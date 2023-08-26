export namespace NSUser {
  export enum Type {
    company = 'employer',
    employee = 'employee'
  }

  export interface Item {
    id: string;
    fullName: string;
    email: string;
    password: string;
    cvUrl?: string;
    description?: string;
    type: Type;
    createdAt: Date;
  }
}