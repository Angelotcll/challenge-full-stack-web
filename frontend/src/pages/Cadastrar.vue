<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="student.name"
        label="Nome"
        required
        :rules="nameRules"
      ></v-text-field>

      <v-text-field
        v-model="student.email"
        label="Email"
        required
        :rules="emailRules"
        type="email"
      ></v-text-field>

      <v-text-field
        v-model="student.ra"
        label="RA"
        required
        :rules="raRules"
      ></v-text-field>

      <v-text-field
        v-model="student.cpf"
        label="CPF"
        required
        :rules="cpfRules"
      ></v-text-field>

      <v-row>
        <v-col>
          <v-btn @click="submitForm" color="primary">{{ isEditing ? 'Atualizar' : 'Salvar' }}</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="cancelForm" color="secondary">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'
import { createStudent, updateStudent } from '@/services/students'
import { StudentResponseDto } from '@/types/student'
import { useAppStore } from '@/stores/app'


const router = useRouter()
const appStore = useAppStore()

const valid = ref(false)
const form = ref(null)
const isEditing = ref(false)
const student = ref<StudentResponseDto>({
  id: '',
  name: '',
  email: '',
  ra: '',
  cpf: ''
})

const nameRules = [(v: string) => !!v || 'Nome é obrigatório']
const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]
const raRules = [(v: string) => !!v || 'RA é obrigatório']
const cpfRules = [(v: string) => !!v || 'CPF é obrigatório']

onMounted(() => {
  const storedStudent = appStore.studentData
  if (storedStudent) {
    isEditing.value = true
    student.value = storedStudent
  } else {
    isEditing.value = false
  }
})

const submitForm = async () => {
  if (form.value?.validate()) {
    try {
      if (isEditing.value) {
        await updateStudent(student.value.id, student.value)
      } else {
        await createStudent(student.value)
      }
      router.push({ name: '/Alunos' })
    } catch (e) {
      console.error(e)
    }
  } else {
    console.log('Formulário inválido')
  }
}

const cancelForm = () => {
  router.push({ name: '/Alunos' })
}
</script>
