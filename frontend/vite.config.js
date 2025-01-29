import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega variáveis do .env (prefixadas com VITE_)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Define variáveis de ambiente para o cliente
    define: {
      'import.meta.env': JSON.stringify(env)
    },
    plugins: [react()],
  };
});