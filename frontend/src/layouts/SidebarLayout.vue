<template>
  <v-app>
    <v-navigation-drawer app permanent class="pa-4">
      <v-list>
        <v-list-item class="title-item" @click="navigateTo('/')">
          Módulo Acadêmico
        </v-list-item>
        <v-list-item
          :class="{ 'v-list-item--active': isActive('/consulta-de-alunos') }"
          @click="navigateTo('/consulta-de-alunos')"
        >
          Alunos
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const isActive = (path: string) => route.path === path;

const navigateTo = (path: string) => {
  appStore.clearStudentData();
  router.push(path);
};
</script>

<style scoped>
.v-list-item {
  border-radius: 16px;
}

.v-list-item--active {
  background-color: #3f3939;
  border-radius: 16px;
}

.title {
  text-align: center;
  padding: 8px;
}

.title-item {
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 16px;
}
</style>
