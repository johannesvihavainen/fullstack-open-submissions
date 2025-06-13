import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const backendUrl = mode === 'test' ? 'http://localhost:3001' : 'http://localhost:3003'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': backendUrl,
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './testSetup.js',
    },
  }
})
