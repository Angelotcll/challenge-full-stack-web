<template>
  <v-app>
    <v-app-bar app color="#3f3939" dark>
      <v-toolbar-title class="text-center flex-grow-1">
        Consulta de Alunos
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="text-center" fluid>
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              label="Digite sua busca"
              append-icon="mdi-magnify"
              single-line
              hide-details
              color="deep-purple"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="text-right">
            <v-btn @click="goToRegister" color="green" dark>
              Cadastrar Aluno
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-data-table
              :headers="headers"
              :items="filteredStudents"
              class="elevated-table"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  color="green"
                  @click="editStudent(item)"
                  class="action-icon"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  color="red"
                  @click="confirmDelete(item)"
                  class="action-icon"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-subtitle
              >Tem certeza de que deseja excluir este aluno?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="deleteStudent" color="red" dark>Confirmar</v-btn>
              <v-btn @click="closeDialog" color="grey">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getAllStudents, deleteStudentById } from "@/services/students";
import { ResponseStudentDto } from "@/types/student";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";

const students = ref<ResponseStudentDto[]>([]);
const search = ref("");
const router = useRouter();
const appStore = useAppStore();

const headers = [
  { title: "Registro Acadêmico", sortable: true, key:"ra"},
  { title: "Nome", sortable: true, key:"name" },
  { title: "CPF", sortable: true, key:"cpf" },
  { title: "Ações", sortable: false, key:"actions" },
];

const dialog = ref(false);
const studentToDelete = ref<ResponseStudentDto | null>(null);

onMounted(async () => {
  await fetchStudents();
});

const fetchStudents = async () => {
  try {
    const response = await getAllStudents();
    students.value = response.data;
  } catch (e) {
    console.error(e);
  }
};

const editStudent = (student: ResponseStudentDto) => {
  console.log("Editar estudante:", student);
  appStore.setStudentData(student);
  router.push({ name: "RegisterStudent" });
};

const confirmDelete = (student: ResponseStudentDto) => {
  studentToDelete.value = student;
  dialog.value = true;
};

const deleteStudent = async () => {
  if (studentToDelete.value) {
    try {
      await deleteStudentById(studentToDelete.value.id);
      await fetchStudents();
    } catch (e) {
      console.error(e);
    }
    closeDialog();
  }
};

const closeDialog = () => {
  dialog.value = false;
  studentToDelete.value = null;
};

const goToRegister = () => {
  router.push({ name: "RegisterStudent" });
};

const filteredStudents = computed(() => {
  return students.value.filter(
    (student) =>
      student.name.toLowerCase().includes(search.value.toLowerCase()) ||
      student.ra.toLowerCase().includes(search.value.toLowerCase()) ||
      student.cpf.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
.text-right {
  text-align: right;
}

.elevated-table {
  background-color: #3f3939;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.action-icon {
  cursor: pointer;
  margin: 0 8px;
}

.v-data-table__wrapper {
  max-height: 400px;
  overflow-y: auto;
}
</style>
