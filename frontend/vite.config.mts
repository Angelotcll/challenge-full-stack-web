// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 5000,
  },
  optimizeDeps: {
    include: [
      'vuetify/lib/components/VApp/index.mjs',
      'vuetify/lib/components/VMain/index.mjs',
      'vuetify/lib/components/VAppBar/index.mjs',
      'vuetify/lib/components/VBtn/index.mjs',
      'vuetify/lib/components/VCard/index.mjs',
      'vuetify/lib/components/VDataTable/index.mjs',
      'vuetify/lib/components/VDialog/index.mjs',
      'vuetify/lib/components/VGrid/index.mjs',
      'vuetify/lib/components/VIcon/index.mjs',
      'vuetify/lib/components/VTextField/index.mjs',
      'vuetify/lib/components/VToolbar/index.mjs',
      'vuetify/lib/components/VList/index.mjs',
      'vuetify/lib/components/VNavigationDrawer/index.mjs',
      'vuetify/lib/components/VForm/index.mjs',
      'vuetify/lib/components/VSnackbar/index.mjs'
    ],
  },
})
