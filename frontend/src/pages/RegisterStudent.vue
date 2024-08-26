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
        :disabled="isEditing"
        maxLength="6"
      ></v-text-field>

      <v-text-field
        v-model="student.cpf"
        label="CPF"
        required
        :rules="cpfRules"
        :disabled="isEditing"
        @input="formatCpf"
        maxLength="14"
      ></v-text-field>

      <v-row>

        <v-col>
          <v-btn :disabled="!valid" @click="submitForm" color="primary">{{ isEditing ? 'Atualizar' : 'Salvar' }}</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="cancelForm" color="secondary">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="snackbarColor"
      top
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'
import { createStudent, updateStudent } from '@/services/students'
import { CreateStudentDto, ResponseStudentDto} from '@/types/student'
import { useAppStore } from '@/stores/app'


const router = useRouter()
const appStore = useAppStore()

const valid = ref(false)
const form = ref(null)
const isEditing = ref(false)
const id = ref<string>('')
const student = ref<CreateStudentDto | ResponseStudentDto>({
  name: '',
  email: '',
  ra: '',
  cpf: ''
})

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('')

const nameRules = [(v: string) => /^[a-zA-Z]{2,}[ ][a-zA-Z]{2,}$/.test(v) || 'Informe nome e sobrenome']
const emailRules = [(v: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Forneça um e-mail válido']
const raRules = [(v: string) => /^[0-9]{6,6}$/.test(v) || 'Registro acadêmico é obrigatório, insira somente números']
const cpfRules = [(v: string) =>  /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || 'O CPF deve estar no formato 000.000.000-00']

onMounted(() => {
  const storedStudent = appStore.studentData
  appStore.clearStudentData()
  if (storedStudent) {
    isEditing.value = true
    const {id: studentId, ...studentData} = storedStudent
    student.value = {...studentData}
    id.value = studentId
  } else {
    isEditing.value = false
  }
})

const showSnackBar = (message: string, color: string) => {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  snackbar.value = true;
}

const submitForm = async () => {
  if (form.value?.validate()) {
    try {
      if (isEditing.value) {
        const{ra, cpf, ...studentUpdate} = {...student.value}
        await updateStudent(id.value, studentUpdate)
        showSnackBar('Atualização realizada com sucesso!', 'success')
      } else {
        await createStudent(student.value)
        showSnackBar('Cadastro realizado com sucesso!', 'success')
      }
      setTimeout(() => {
          appStore.clearStudentData()
          router.push({ name: 'StudentList' })
        }, 3000)
    } catch (e) {
      showSnackBar(e.message || 'Erro ao criar o estudante.', 'error')
    }
  } else {
    console.log('Formulário inválido')
  }
}

const cancelForm = () => {
  appStore.clearStudentData()
  router.push({ name: 'StudentList' })
}

const formatCpf = () => {
  let value = student.value.cpf.replace(/\D/g, '')

  if (value.length <= 3) {
      student.value.cpf = value
    } else if(value.length <= 6){
      student.value.cpf = value.replace(/(\d{3})(\d{0,3})/, '$1.$2')
    } else if (value.length <= 9) {
      student.value.cpf = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
    } else {
      student.value.cpf = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
    }
  }

</script>
