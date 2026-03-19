<script setup>
// --- Importaciones ---
import { ref } from 'vue'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

// --- Configuración de Pestañas ---
const tabs = ['Servidor Web', 'Entorno de Pruebas', 'Servicios Auxiliares']
const activeTab = ref('Servidor Web')

// --- Datos de las Secciones (Ejemplos) ---
const sectionsByTab = ref({
  'Servidor Web': [
    {
      id: 'darwin-info',
      title: 'Información del Servidor DARWIN',
      description: 'Detalles básicos del servidor Darwin. Actúa como el host principal para los sistemas y aplicaciones web de uso interno en Fundacite Sucre.',
      code: `Nombre: DARWIN
IP: 172.17.2.6
Servicios: Apache/Nginx, PHP, Servidor Web Interno
Ubicación: Rack de servidores secundario

# aqui cambia por los valores reales`,
      image: ''
    },
    {
      id: 'darwin-apache',
      title: 'Configuración VirtualHost Apache (/etc/apache2/sites-available/intranet.conf)',
      description: 'Ejemplo de configuración de un VirtualHost para alojar el sistema interno.',
      code: `<VirtualHost *:80>
    ServerName intranet.fundacite-sucre.gob.ve
    ServerAdmin webmaster@fundacite-sucre.gob.ve
    DocumentRoot /var/www/html/intranet

    <Directory /var/www/html/intranet>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/intranet_error.log
    CustomLog \${APACHE_LOG_DIR}/intranet_access.log combined
</VirtualHost>

# aqui cambia por los valores reales`,
      image: ''
    }
  ],
  'Entorno de Pruebas': [
    {
      id: 'darwin-docker',
      title: 'Configuración Docker Compose para Pruebas',
      description: 'Entorno contenerizado para despliegue de pruebas de nuevas aplicaciones sin afectar producción.',
      code: `version: '3.8'
services:
  app_test:
    image: php:8.1-apache
    ports:
      - "8080:80"
    volumes:
      - ./test_app:/var/www/html
    environment:
      - DB_HOST=172.17.2.4
      - DB_USER=usuario_prueba
      - DB_PASS=clave_prueba

# aqui cambia por los valores reales`,
      image: ''
    }
  ],
  'Servicios Auxiliares': [
    {
      id: 'darwin-cron',
      title: 'Tareas Programadas (Crontab)',
      description: 'Scripts de mantenimiento rutinario ejecutados en el servidor web.',
      code: `# Limpieza de sesiones PHP antiguas todos los días a las 2 AM
0 2 * * * root /usr/bin/find /var/lib/php/sessions -type f -cmin +2 -name "sess_*" -exec rm -f {} \\;

# Sincronización de logs web hacia el servidor de respaldos (Galileo) cada domingo
0 3 * * 0 root rsync -avz /var/log/apache2/ 172.17.2.10:/respaldos/darwin_logs/

# aqui cambia por los valores reales`,
      image: ''
    }
  ]
})

// --- Variables de Estado para Edición/Copiado ---
const editingId = ref(null)
const copiedId = ref(null)

// --- Función de Resaltado ---
const highlight = (code) => {
  if (!code) return ''
  try {
    return hljs.highlightAuto(code).value
  } catch (e) {
    return code
  }
}

// --- Función de Copiado ---
const copyCode = async (id, text) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => copiedId.value = null, 2000)
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}
</script>

<template>
  <div class="doc-container">
    <!-- Navegación -->
    <div class="nav-links">
      <router-link to="/" class="nav-btn">Ir al Menú Principal</router-link>
      <router-link to="/Servidores" class="nav-btn">Volver a Servidores</router-link>
    </div>

    <!-- Encabezado -->
    <header class="doc-header">
      <h1>Servidor DARWIN (172.17.2.6)</h1>
      <p>Gestión de Servidor Web Interno, Entorno de Pruebas y Servicios Auxiliares.</p>
    </header>

    <!-- Selector de Pestañas -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-btn', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Contenido Dinámico según Pestaña Activa -->
    <div v-for="section in sectionsByTab[activeTab]" :key="section.id" class="doc-section">
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
            rows="10"
            @blur="editingId = null"
            autofocus
          ></textarea>
          <small style="color: #666; display: block; margin-top: 5px;">Haz clic fuera para guardar y ver resaltado.</small>
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
/* --- Estilos Generales Replicados --- */
.nav-links { display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; }
.nav-btn { background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; transition: background-color 0.3s; }
.nav-btn:hover { background-color: #0056b3; }
.doc-container { max-width: 900px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', sans-serif; color: #333; }
.doc-header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eee; }
.tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; }
.tab-btn { background-color: #f8f9fa; border: 1px solid #ddd; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; color: #555; transition: all 0.2s; }
.tab-btn:hover { background-color: #e2e6ea; }
.tab-btn.active { background-color: #007bff; color: white; border-color: #007bff; }
.doc-section { background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden; }
.section-header { background-color: #f8f9fa; padding: 15px 20px; border-bottom: 1px solid #eee; }
.section-header h2 { margin: 0; font-size: 1.3rem; color: #2c3e50; }
.section-description { padding: 15px 20px; background-color: #fff; }
.section-description p { margin: 0; line-height: 1.6; }
.section-code { padding: 20px; background-color: #f8f9fa; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
.code-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.code-label { font-weight: bold; color: #555; font-size: 0.9rem; }
.copy-btn { background-color: #fff; border: 1px solid #ccc; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; }
.copy-btn:hover { background-color: #f0f0f0; border-color: #bbb; }
.code-preview { cursor: pointer; background-color: #282c34; border: 1px solid #181a1f; border-radius: 4px; resize: vertical; min-height: 50px; max-height: 500px; overflow: auto; }
.code-preview pre { margin: 0; padding: 0; background: transparent !important; }
.hljs { padding: 15px !important; background: transparent !important; }
.section-code textarea { width: 100%; border: 1px solid #181a1f; background-color: #282c34; color: #abb2bf; caret-color: #528bff; font-family: 'Fira Code', 'Courier New', monospace; font-size: 0.9rem; line-height: 1.5; padding: 15px; border-radius: 4px; box-sizing: border-box; outline: none; display: block; resize: vertical; max-height: 500px; overflow: auto; }
.section-code textarea:focus { border-color: #4b5263; background-color: #2c313a; }
.section-image { padding: 20px; text-align: center; background-color: #fff; }
.section-image img { max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; }
</style>