<script setup>
import { ref } from 'vue'

// Lista de submódulos de la Documentación Interna
// Aquí enlazamos los inventarios y utilitarios técnicos definidos en el proyecto.
const internalModules = ref([
  {
    id: 1,
    title: 'Inventario de Equipos de Oficina',
    description: 'Control y gestión general de bienes nacionales y equipos informáticos asignados.',
    route: '/inventario-oficina'
  },
  {
    id: 2,
    title: 'Inventario de Pantallas',
    description: 'Gestión específica y control de monitores asignados a la institución.',
    route: '/pantallas'
  },
  {
    id: 3,
    title: 'Inventario de Impresoras',
    description: 'Control de impresoras en red, locales y registro de consumibles.',
    route: '/impresoras'
  },
  {
    id: 4,
    title: 'UID Usuario',
    description: 'Gestión y consulta rápida de identificadores de usuario (UID).',
    route: '/uid-usuario'
  },
  {
    id: 5,
    title: 'Comprimir y OpenW',
    description: 'Guías, comandos y utilidades técnicas para compresión y uso de OpenW.',
    route: '/comprimir-openw'
  },
  {
    id: 6,
    title: 'Redimensionar Disco (Clonezilla)',
    description: 'Procedimientos detallados para redimensionar discos duros clonados.',
    route: '/clonezilla'
  }
])
</script>

<template>
  <div class="menu-container">
    
    <!-- Navegación de regreso -->
    <div class="nav-links">
      <router-link to="/" class="nav-btn">← Volver al Menú Principal</router-link>
    </div>

    <!-- Encabezado del Dashboard Interno -->
    <header class="menu-header">
      <h1>Documentación Interna y Módulos</h1>
      <p>Centro de gestión de inventarios, manuales técnicos y utilitarios de Fundacite.</p>
    </header>

    <!-- Grid de tarjetas: una tarjeta por cada submódulo -->
    <div class="menu-grid">
      <router-link
        v-for="item in internalModules"
        :key="item.id"
        :to="item.route"
        class="menu-card"
        :aria-label="`Ir a ${item.title}`"
      >
        <div class="card-header">
          <h2>{{ item.title }}</h2>
        </div>
        <div class="card-body">
          <p>{{ item.description }}</p>
        </div>
        <div class="card-footer">
          <small>Hacer clic para abrir módulo</small>
        </div>
      </router-link>
    </div>

  </div>
</template>

<style scoped>
/* --- Estilos coherentes con Menu.vue --- */

.nav-links {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.nav-btn {
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}
.nav-btn:hover { background-color: #5a6268; }

.menu-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.menu-header { text-align: center; margin-bottom: 28px; border-bottom: 2px solid #eee; padding-bottom: 12px; }
.menu-header h1 { color: #2c3e50; margin-bottom: 8px; }
.menu-header p { color: #666; font-size: 1.05rem; }

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.menu-card {
  display: flex; flex-direction: column; justify-content: space-between;
  background: #fff; border: 1px solid #ddd; border-radius: 8px;
  text-decoration: none; color: inherit; overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,0.04);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.menu-card:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0,0,0,0.08); border-color: #b3d4fc; }

.card-header { background-color: #f8f9fa; padding: 14px 16px; border-bottom: 1px solid #eee; }
.card-header h2 { margin: 0; font-size: 1.15rem; color: #0056b3; }
.card-body { padding: 16px; flex-grow: 1; }
.card-body p { margin: 0; line-height: 1.5; color: #555; }
.card-footer { padding: 10px 16px; background: #fafafa; border-top: 1px solid #f0f0f0; text-align: right; color: #888; }

@media (max-width: 480px) { .menu-container { padding: 12px; } .card-header h2 { font-size: 1.05rem; } }
</style>