import axios from 'axios';
import type { ResponseStudentDto, CreateStudentDto, UpdateStudentDto } from '../types/student'
import { api } from '@/lib/api'

export async function createStudent(body: CreateStudentDto) {
    try {
     const response = await api.post<CreateStudentDto>('/students', body);
     return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          throw new Error(data.message || 'Ocorreu um erro ao criar o estudante.');
        }else if(status === 500){
          throw new Error('Erro desconhecido ao criar o estudante.');
      }
    }
    throw new Error('Erro desconhecido ao criar o estudante.');
  }
}

export async function getAllStudents() {
  return await api.get<ResponseStudentDto[]>('/students/all')
}

export async function getStudentById(id: string) {
  return await api.get<ResponseStudentDto>(`/students/${id}`)
}

export async function updateStudent(id: string, body: UpdateStudentDto) {
  console.log(body)
  return await api.patch<UpdateStudentDto>(`/students/${id}`, body)
}

export async function deleteStudentById(id: string) {
  return await api.delete<void>(`/students/${id}`)
}
