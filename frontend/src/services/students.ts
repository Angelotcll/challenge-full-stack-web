import type { StudentResponseDto, CreateStudentDto, UpdateStudentDto } from '../types/student'
import { api } from '@/lib/api'

export async function createStudent(body: CreateStudentDto) {
  const response = await api.post<CreateStudentDto>('/students', body)
  return response
}
export async function getAllStudents() {
  return await api.get<StudentResponseDto[]>('/students/all')
}

export async function getStudentById(id: string) {
  return await api.get<StudentResponseDto>(`/students/${id}`)
}

export async function updateStudent(id: string, body: UpdateStudentDto) {
  return await api.patch<StudentResponseDto>(`/students/${id}`, body)
}

export async function deleteStudentById(id: string) {
  return await api.delete<void>(`/students/${id}`)
}
