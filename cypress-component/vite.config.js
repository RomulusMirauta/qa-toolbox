import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Used by the Cypress component dev server (no app build needed).
export default defineConfig({
  plugins: [react()],
});
