<script setup>
import { ref, computed } from 'vue'

// Variable para la barra de búsqueda
const searchQuery = ref('')

// Esquema de datos para el inventario basado en la referencia visual
// He dejado un registro de ejemplo para que veas la estructura.
// Aquí cargarás la información real.
const inventario = ref([
  {
    id: 1,
    bienNacional: 'BN-00123',
    tipo: 'CPU / Desktop',
    marca: 'Dell',
    modelo: 'OptiPlex 3080',
    serial: 'SN-ABC1234',
    departamento: 'Soporte Técnico',
    responsable: 'Alejandro',
    estado: 'Operativo',
    observaciones: 'Asignado en 2023'
  },
  {
    id: 2,
    bienNacional: 'BN-00124',
    tipo: 'Laptop',
    marca: 'Lenovo',
    modelo: 'ThinkPad T14',
    serial: 'SN-XYZ9876',
    departamento: 'Administración',
    responsable: 'María García',
    estado: 'Dañado',
    observaciones: 'Falla en disco duro'
  }
  // Añade más registros aquí...
])

// Lógica para filtrar la tabla según lo que se escriba en el buscador
const inventarioFiltrado = computed(() => {
  if (!searchQuery.value) return inventario.value
  
  const query = searchQuery.value.toLowerCase()
  return inventario.value.filter(item => {
    return (
      item.bienNacional.toLowerCase().includes(query) ||
      item.tipo.toLowerCase().includes(query) ||
      item.marca.toLowerCase().includes(query) ||
      item.responsable.toLowerCase().includes(query) ||
      item.serial.toLowerCase().includes(query)
    )
  })
})
</script>

<template>
  <div class="inventario-container">
    <!-- Navegación -->
    <div class="nav-links">
      <router-link to="/" class="nav-btn">Ir al Menú Principal</router-link>
      <!-- <router-link to="/modulos" class="nav-btn">Volver a Módulos</router-link> -->
    </div>

    <header class="header">
      <h1>Inventario de Equipos de Oficina</h1>
      <p>Control y gestión de bienes nacionales y equipos informáticos asignados.</p>
    </header>

    <!-- Barra de Búsqueda y Controles -->
    <div class="controls">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Buscar por BN, tipo, marca, serial o responsable..." 
        class="search-bar"
      />
      <button class="action-btn">Exportar CSV</button>
    </div>

    <!-- Tabla de Inventario -->
    <div class="table-responsive">
      <table class="inventario-table">
        <thead>
          <tr>
            <th>Nº Bien Nacional</th>
            <th>Tipo de Equipo</th>
            <th>Marca / Modelo</th>
            <th>Serial</th>
            <th>Departamento</th>
            <th>Responsable</th>
            <th>Estado</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventarioFiltrado" :key="item.id">
            <td class="font-bold">{{ item.bienNacional }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.marca }} <br> <small class="text-muted">{{ item.modelo }}</small></td>
            <td class="code-font">{{ item.serial }}</td>
            <td>{{ item.departamento }}</td>
            <td>{{ item.responsable }}</td>
            <td>
              <span :class="['badge', item.estado === 'Operativo' ? 'badge-success' : 'badge-danger']">
                {{ item.estado }}
              </span>
            </td>
            <td>{{ item.observaciones }}</td>
          </tr>
          <tr v-if="inventarioFiltrado.length === 0">
            <td colspan="8" class="text-center">No se encontraron equipos que coincidan con la búsqueda.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.inventario-container { max-width: 1200px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', sans-serif; color: #333; }
.nav-links { display: flex; justify-content: flex-start; gap: 15px; margin-bottom: 20px; }
.nav-btn { background-color: #6c757d; color: white; padding: 8px 15px; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: bold; transition: background-color 0.3s; }
.nav-btn:hover { background-color: #5a6268; }

.header { margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
.header h1 { margin: 0 0 5px 0; color: #2c3e50; }
.header p { margin: 0; color: #666; }

.controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 10px; }
.search-bar { flex-grow: 1; padding: 10px 15px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; outline: none; transition: border-color 0.2s; }
.search-bar:focus { border-color: #007bff; }
.action-btn { background-color: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; transition: background-color 0.2s; }
.action-btn:hover { background-color: #218838; }

.table-responsive { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.inventario-table { width: 100%; border-collapse: collapse; text-align: left; }
.inventario-table th { background-color: #f8f9fa; padding: 12px 15px; font-weight: bold; color: #495057; border-bottom: 2px solid #dee2e6; white-space: nowrap; }
.inventario-table td { padding: 12px 15px; border-bottom: 1px solid #eee; vertical-align: middle; }
.inventario-table tr:hover { background-color: #f8f9fa; }

.font-bold { font-weight: bold; color: #0056b3; }
.text-muted { color: #6c757d; font-size: 0.85em; }
.text-center { text-align: center; color: #888; padding: 20px !important; }
.code-font { font-family: 'Courier New', Courier, monospace; letter-spacing: 0.5px; }

.badge { padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
.badge-success { background-color: #d4edda; color: #155724; }
.badge-danger { background-color: #f8d7da; color: #721c24; }
</style>