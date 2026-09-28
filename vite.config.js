import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` debe coincidir con el nombre del repositorio para que GitHub Pages
// encuentre los archivos en https://l1sbethbilbao.github.io/bi8_Exp3_S7_lisbeth_bilbao/
export default defineConfig({
  plugins: [react()],
  base: '/bi8_Exp3_S7_lisbeth_bilbao/',
})
