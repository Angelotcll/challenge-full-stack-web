<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <!-- Campo de pesquisa -->
        <v-text-field
          v-model="search"
          label="Pesquisar"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <!-- Botão de Cadastrar -->
        <v-btn @click="goToRegister" color="primary">Cadastrar</v-btn>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="filteredStudents">

      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="editStudent(item)">Editar</v-btn>
        <v-btn color="red" @click="deleteStudent(item)">Excluir</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllStudents,deleteStudentById } from '@/services/students'
import { StudentResponseDto } from '@/types/student'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const students = ref<StudentResponseDto[]>([])
const search = ref('')
const router = useRouter()
const appStore = useAppStore()

const headers = [
  { title: 'Registro Acadêmico', align: 'start', value: 'ra', sortable: true },
  { title: 'Nome', value: 'name', sortable: true },
  { title: 'CPF', value: 'cpf', sortable: true },
  { title: 'Ações', value: 'actions', sortable: false }
]

const filteredStudents = computed(() => {
  const searchTerm = search.value.toLowerCase()
  return students.value.filter(student => {
    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.ra.toLowerCase().includes(searchTerm) ||
      student.cpf.toLowerCase().includes(searchTerm)
    )
  })
})

onMounted(async () => {
  try {
    const response = await getAllStudents()
    students.value = response.data
  } catch (e) {
    console.error(e)
  }
})

const editStudent = (student: StudentResponseDto) => {
  console.log('Editar estudante:', student)
  appStore.setStudentData(student)
  router.push({ name: '/Cadastrar' })
}

const deleteStudent = async (student: StudentResponseDto) => {
  console.log('Excluir estudante:', student)
  await deleteStudentById(student.id)
}

const goToRegister = () => {
  router.push({ name: '/Cadastrar' })
}

</script>
