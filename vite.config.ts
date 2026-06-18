import { keycloakify } from "keycloakify/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
     resolve: {
          alias: {
               "@": path.resolve(__dirname, "./src")
          }
     },
     plugins: [react({
          babel: {
               plugins: [['babel-plugin-react-compiler']]
          }
     }), tailwindcss(), keycloakify({
          themeName: "clube-pormade-keycloak-theme",
          accountThemeImplementation: "none"
     })]
});