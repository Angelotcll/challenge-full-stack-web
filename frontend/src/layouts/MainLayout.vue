<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      class="pa-4"
    >
      <v-list>
        <v-list-item class="title-item"
        @click="navigateTo('/')">
          <v-list-item-content class="title">
            Módulo Acadêmico
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :class="{ 'v-list-item--active': isActive('/consulta-de-alunos') }"
          @click="navigateTo('/consulta-de-alunos')"
        >
          <v-list-item-content>
            Alunos
          </v-list-item-content>
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
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const isActive = (path: string) => route.path === path

const navigateTo = (path: string) => {
  appStore.clearStudentData()
  router.push(path)
}
</script>

<style scoped>
.v-list-item--active {
  background-color: #e0f7fa;
  border: 1px solid #b2ebf2;
  border-radius: 8px;
}

.title {
  text-align: center;
}

.title-item {
  margin-bottom: 16px;
}
</style>
