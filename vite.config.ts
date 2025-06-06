import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    server: {
      host: true,
      port: 5173
    },
    define: {
      'import.meta.env.VITE_BACKEND_BASE_URL': JSON.stringify(env.VITE_BACKEND_BASE_URL),
    }
  };
});
