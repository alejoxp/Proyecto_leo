import { createRouter, createWebHistory } from 'vue-router'
import Menu from './components/Menu.vue'
import SystemDocumentation from './components/SystemDocumentation.vue'
import PlatonDocumentation from './components/PlatonDocumentation.vue'
// Importar el componente desde la ruta real donde existe el archivo
import Servidores from './components/Servidores/servidores.vue'
import Aristoteles from './components/Servidores/aristoteles.vue'
import Copernico from './components/Servidores/copernico.vue'
import newton from './components/Servidores/newton.vue' 
import darwin  from './components/Servidores/darwin.vue'
import galileo from './components/Servidores/galileo.vue'
//Documentacion Interna De los equipos de oficina
import DocumentacionInterna from './Documentacion_interna/DocumentacionInterna.vue'
import InventarioEquiposDeOficina from './Documentacion_interna/InventarioEquiposDeOficina.vue'
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
  { path: '/copernico', name: 'copernico', component: Copernico },
  { path: '/newton', name: 'newton', component: newton },
  { path: '/darwin', name: 'darwin', component: darwin },
  { path: '/galileo', name: 'galileo', component: galileo },
  // Ruta para la pantalla de Inventario de Equipos de Oficina — coincide con el `route` usado en `Menu.vue`.
  { path: '/documentacion-interna', name: 'DocumentacionInterna', component: DocumentacionInterna },
  { path: '/inventario-oficina', name: 'InventarioEquiposDeOficina', component: InventarioEquiposDeOficina }
  
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router