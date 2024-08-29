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
        accCreation: resolve(__dirname, 'pages/accCreation/index.html'),
        dogPark: resolve(__dirname, 'pages/dogPark/index.html'),
        editAcc: resolve(__dirname, 'pages/editAcc/index.html'),
        login: resolve(__dirname, 'pages/login/index.html'),
      }
    }
  }
};
