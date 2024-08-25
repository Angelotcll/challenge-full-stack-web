import { defineStore } from 'pinia'
import { StudentResponseDto } from '@/types/student'

export const useAppStore = defineStore('app', {
  state: () => ({
    studentData: null as StudentResponseDto | null
  }),
  actions: {
    setStudentData(data: StudentResponseDto) {
      this.studentData = data
    },
    clearStudentData() {
      this.studentData = null
    }
  }
})
