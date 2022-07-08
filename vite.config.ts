// vite
import { defineConfig } from 'vite'
// vue
import vue from '@vitejs/plugin-vue'
// node
import path from 'path'
// postcss
import postcssPresetEnv from 'postcss-preset-env'
// https://github.com/antfu/unplugin-icons
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: false
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Icons({
      customCollections: {
        custom: FileSystemIconLoader('./src/assets/svg', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@network': path.resolve(__dirname, 'src/network'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@util': path.resolve(__dirname, 'src/utilities')
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 1,
          features: {
            'logical-properties-and-values': false
          }
        }) as any
      ]
    }
  },
  server: {
    proxy: {
      '/sys': {
        target: 'http://ihrm.itheima.net/api',
        changeOrigin: true
      }
    }
  }
})
