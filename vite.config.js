import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from 'path'

export default {
  plugins: [
    viteStaticCopy({
      targets: [{ src: "node_modules/leaflet/dist/images/*", dest: "./" }],
    }),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        accCreation: resolve(__dirname, 'src/pages/accCreation.html'),
        dogPark: resolve(__dirname, 'src/pages/dogPark.html'),
        editAcc: resolve(__dirname, 'src/pages/editAcc.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
      }
    }
  }
};
