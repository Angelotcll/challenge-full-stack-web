import { defineStore } from 'pinia'
import { ResponseStudentDto } from '@/types/student'

export const useAppStore = defineStore('app', {
  state: () => ({
    studentData: null as ResponseStudentDto | null
  }),
  actions: {
    setStudentData(data: ResponseStudentDto) {
      this.studentData = data
    },
    clearStudentData() {
      this.studentData = null
    }
  }
})
