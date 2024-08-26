
export interface ResponseStudentDto {
  id: string;
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

export interface CreateStudentDto {
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

export interface UpdateStudentDto {
  name?: string;
  email?: string;
}
