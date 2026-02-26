<script setup>
// Componente: Documentación de Servidores
// Este archivo sigue la misma estructura visual y funcional
// que `PlatonDocumentation.vue` y `SystemDocumentation.vue`.
// - `sections` contiene la información editable por servidor.
// - Cada sección tiene: `id`, `title`, `description`, `code` y `image`.
// - El área de código es editable al hacer clic y permite copiar el contenido.

import { ref } from 'vue'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

// quickRoutes: lista compacta de entradas para el cuadro de acceso rápido.
// - `label`: texto visible (nombre) que aparecerá en la tarjeta.
// - `description`: texto breve que aparecerá debajo del nombre (editar aquí).
// - `route`: ruta real usada por <router-link> para navegar (NO se muestra en la tarjeta,
//   sirve sólo para la navegación; mantener sincronizada con `router.js`).
// Comentarios: para cambiar lo que se muestra al usuario, edita `label` y `description`.
// Para cambiar a dónde navega la tarjeta, edita `route`.
const quickRoutes = ref([
  {
    id: 'q-contingencia',
    label: 'Plan de Contingencia',
    // Descripción corta: visible en la tarjeta. Cambia este texto si es necesario.
    description: 'Guía visual y pasos del plan de contingencia.',
    route: '/system' // Navegación: mantiene la ruta para Vue Router (no se muestra en UI)
  },
  {
    id: 'q-platon',
    label: 'PLATON',
    // Descripción corta para PLATON
    description: 'Documentación y recursos de PLATON.',
    route: '/platon'
  },
  {
    id: 'q-newton',
    label: 'NEWTON',
    description: 'Base de datos y aplicaciones internas.',
    route: '/newton'
  },

  {
    id: 'q-darwin',
    label: 'DARWIN',
    description: 'Servicios auxiliares y pruebas.',
    route: '/darwin'
  },
   {
    id: 'q-aristoteles',
    label: 'ARISTOTELES',
    description: 'Servidor de base de datos y aplicaciones.',
    route: '/aristoteles'
  },
  {
    id: 'q-copernico',
    label: 'COPERNICO',
    description: 'Configuracion de copernico, CUPS y NTP ',
    route: '/copernico'
  },
  {
    id: 'q-galileo',
    label: 'GALILEO',
    description: 'NFS y almacenamiento de archivos.',
    route: '/galileo'
  }
])




// Resaltar sintaxis para vista previa
function highlight(text) {
  if (!text) return ''
  try {
    return hljs.highlight(text, { language: 'plaintext' }).value
  } catch (e) {
    return hljs.highlightAuto(text).value
  }
}
</script>

<template>
  <!-- Contenedor principal: diseño igual que en los otros componentes -->
  <div class="doc-container">

    <div class="nav-links">
      <router-link to="/" class="nav-btn">Ir al Menú Principal</router-link>
    </div>

    <!--
      Cuadro rectangular de rutas (accesos rápidos).
      - Se muestran `label` y `description` (NO se muestra la ruta técnica).
      - Para editar el nombre o la descripción, modificar `quickRoutes` en el
        bloque <script setup> (buscar `quickRoutes`).
      - `route` permanece para la navegación interna de Vue Router.
    -->
    <div class="quickbox">
      <router-link
        v-for="item in quickRoutes"
        :key="item.id"
        :to="item.route"
        class="quick-card"
        :aria-label="`Ir a ${item.label}`"
      >
        <!-- Contenido izquierdo: título y descripción -->
        <div class="quick-left">
          <!-- `label`: editar aquí para cambiar el nombre mostrado -->
          <div class="quick-title">{{ item.label }}</div>
          <!-- `description`: editar aquí para cambiar la descripción breve -->
          <div class="quick-desc">{{ item.description }}</div>
        </div>

        <!-- Indicador visual (flecha). No romper la navegación si lo quitas) -->
        <div class="quick-arrow" aria-hidden="true">›</div>
      </router-link>
    </div>

    <header class="doc-header">
      <h1>Documentación de Servidores</h1>
      <p>Listado de servidores disponibles en el sistema.</p>
    </header>

    <div v-for="section in sections" :key="section.id" class="doc-section">

      <div class="section-header">
        <h2>{{ section.title }}</h2>
      </div>

      <div class="section-description">
        <p>{{ section.description }}</p>
      </div>

      <div v-if="section.code" class="section-code">
        <div class="code-header">
          <span class="code-label">Configuración / Código</span>
          <button @click.stop="copyCode(section.id, section.code)" class="copy-btn">
            {{ copiedId === section.id ? '¡Copiado!' : 'Copiar' }}
          </button>
        </div>

        <div v-if="editingId === section.id">
          <textarea
            v-model="section.code"
            placeholder="Copia y pega aquí el código o configuración correspondiente."
            rows="8"
            @blur="editingId = null"
            autofocus
          ></textarea>
          <small style="color:#666; display:block; margin-top:5px;">Haz clic fuera para guardar y ver resaltado.</small>
        </div>
        <div v-else @click="editingId = section.id" class="code-preview" title="Haz clic para editar">
          <pre><code class="hljs" v-html="highlight(section.code)"></code></pre>
        </div>
      </div>

      <div v-if="section.image" class="section-image">
        <img :src="section.image" :alt="section.title" />
      </div>

    </div>

  </div>
</template>

<style scoped>
/* Copiado y adaptado de los estilos usados en PlatonDocumentation.vue */
.nav-links{display:flex;justify-content:center;gap:20px;margin-bottom:30px}
.nav-btn{background-color:#007bff;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;font-weight:700;transition:background-color .3s}
.nav-btn:hover{background-color:#0056b3}
.doc-container{max-width:900px;margin:0 auto;padding:20px;font-family:'Segoe UI',sans-serif;color:#333}
.doc-header{text-align:center;margin-bottom:40px;border-bottom:2px solid #eee}
.doc-section{background:#fff;border:1px solid #ddd;border-radius:8px;margin-bottom:40px;box-shadow:0 4px 10px rgba(0,0,0,.05);overflow:hidden}
.section-header{background:#f8f9fa;padding:15px 20px;border-bottom:1px solid #eee}
.section-header h2{margin:0;font-size:1.3rem;color:#2c3e50}
.section-description{padding:15px 20px;background:#fff}
.section-code{padding:20px;background:#f8f9fa;border-top:1px solid #eee;border-bottom:1px solid #eee}
.code-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.code-label{font-weight:700;color:#555;font-size:.9rem}
.copy-btn{background:#fff;border:1px solid #ccc;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:.8rem;transition:all .2s}
.copy-btn:hover{background:#f0f0f0;border-color:#bbb}
.code-preview{cursor:pointer;border-radius:4px;overflow:auto;min-height:100px;border:1px solid #ddd}
.code-preview pre{margin:0;height:100%}
.section-code textarea{width:100%;border:none;background:#e9ecef;font-family:'Courier New',monospace;font-size:.9rem;line-height:1.4;padding:10px;border-radius:4px;resize:vertical;box-sizing:border-box}
.section-code textarea:focus{outline:none;background:#fff;border:1px solid #007bff}
.section-image{padding:20px;text-align:center;background:#fff}
.section-image img{max-width:100%;height:auto;border:1px solid #ddd;border-radius:4px}

/* Estilos para el cuadro compacto de rutas usado en la parte superior */
.quickbox{
  /* Contenedor flexible: las tarjetas se adaptan y bajan a la siguiente fila */
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  justify-content:center;
  margin:18px 0;
}

/*
  quick-card: diseño rectangular (horizontal)
  - Mostrar título y descripción a la izquierda
  - Flecha pequeña a la derecha para indicar navegación
  - No mostramos la ruta técnica en la UI (solo en `quickRoutes.route`)
*/
.quick-card{
  display:flex;
  flex-direction:row;
  align-items:center;
  min-width:320px;
  max-width:480px;
  height:84px;
  background:#fff;
  border:1px solid #e6e6e6;
  border-radius:8px;
  padding:12px 16px;
  text-decoration:none; /* quitar subrayado */
  color:inherit;
  box-shadow:0 8px 18px rgba(0,0,0,0.03);
  transition:transform .14s ease,box-shadow .14s ease;
}
.quick-card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,0.06)}

.quick-left{flex:1;display:flex;flex-direction:column;align-items:flex-start}
.quick-title{font-weight:700;color:#2c3e50;margin-bottom:6px;font-size:1rem}
.quick-desc{font-size:.88rem;color:#666;line-height:1.2}
.quick-arrow{font-size:1.4rem;color:#bbb;margin-left:12px}

@media (max-width:820px){.quick-card{min-width:260px;height:76px}}
@media (max-width:480px){.quick-card{min-width:100%;height:auto;padding:10px;flex-direction:row}}
</style>
