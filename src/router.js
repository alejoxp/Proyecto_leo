import { createRouter, createWebHistory } from 'vue-router'
import Menu from './components/Menu.vue'
import SystemDocumentation from './components/SystemDocumentation.vue'
import PlatonDocumentation from './components/PlatonDocumentation.vue'
// Importar el componente desde la ruta real donde existe el archivo
import Servidores from './components/Servidores/servidores.vue'
import Aristoteles from './components/Servidores/aristoteles.vue'
import Copernico from './components/Servidores/copernico.vue'

const routes = [
  { path: '/', component: Menu },
  {
    path: '/system',
    name: 'SystemDocumentation',
    component: SystemDocumentation
  },
  {
    path: '/platon',
    name: 'PlatonDocumentation',
    component: PlatonDocumentation
  },
  // Ruta para la pantalla de Servidores — coincide con el `route` usado en `Menu.vue`.
  { path: '/Servidores', name: 'Servidores', component: Servidores },
  {path: '/aristoteles', name: 'aristoteles', component: Aristoteles},
  { path: '/copernico', name: 'copernico', component: Copernico }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router