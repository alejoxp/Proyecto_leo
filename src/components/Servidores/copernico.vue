<script setup>
// --- Importaciones ---
// Importamos ref para variables reactivas y highlight.js para el resaltado de sintaxis
import { ref } from 'vue'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

// --- Configuración de Pestañas ---
// Definimos las pestañas disponibles para organizar la información de Copernico
const tabs = ['Configuracion copernico', 'CUPS', 'NTP']
// Estado reactivo para la pestaña activa, por defecto 'Servidor'
const activeTab = ref('Configuracion copernico')

// --- Generador de Pasos para CUPS ---
// Generamos dinámicamente los pasos para las imágenes 00 a 34 de CUPS
// para mantener el código limpio y organizado.
const generateCupsSteps = () => {
  const steps = []
  // Información conocida para los primeros pasos
  const knownInfo = {
    0: { title: '00. Instalación de Paquetes', desc: 'Instalación de los servicios necesarios: cups y cups-client.', code: 'apt-get update\napt-get install cups cups-client' },
    1: { title: '01. Edición de Configuración', desc: 'Abrimos el archivo principal de configuración de CUPS.', code: 'nano /etc/cups/cupsd.conf' },
    2: { title: '02. Configuración de Accesos', desc: 'Vista del archivo de configuración. Es necesario permitir el acceso a la red local.', code: '<Location />\n  Order allow,deny\n  Allow 172.17.2.0/24\n</Location>' },
    3: { title: '03. Reinicio del Servicio', desc: 'Reiniciamos el servicio para aplicar los cambios de configuración.', code: 'service cups restart' },
    4: { title: '04. Interfaz Web', desc: 'Accedemos a la administración vía navegador web (Puerto 631).', code: 'https://172.17.2.9:631' }
  }

  for (let i = 0; i <= 34; i++) {
    const num = i.toString().padStart(2, '0') // Formato 00, 01, ..., 34, padstart (2, '0') es para asegurar que siempre tenga dos dígitos el 2 hace referencia a la longitud total y el '0' es el carácter de relleno.
    const info = knownInfo[i]
    
    steps.push({
      id: `cups-${num}`,
      title: info ? info.title : `${num}. Configuración Web / Impresora`,
      description: info ? info.desc : `Paso ${num}: Continuación de la configuración y agregado de impresoras mediante la interfaz web.`,
      code: info ? info.code : '',
      image: `/copernico/CUPS/cups-${num}.png`
    })
  }
  return steps
}

// --- Datos de las Secciones ---
// Organizamos la información por pestaña.
// Cada objeto representa una sección con título, descripción, código e imagen.
const sectionsByTab = {
  'Configuracion copernico': [
    {
      id: 'srv-info',
      title: 'Información del Servidor COPERNICO',
      description: 'Configuración de red y detalles básicos del servidor. Copernico actúa como servidor de impresión (CUPS) y servidor de tiempo (NTP).',
      code: `Nombre: COPERNICO
IP: 172.17.2.9
Servicios: CUPS (Impresión), NTP (Tiempo)
Ubicación: Rack de servidores`,
      image: '/Copernico/Configuracion copernico/1.png'
    },
    {
      id: 'srv-net',
      title: 'Archivo: /etc/network/interfaces',
      description: 'Configuración de la interfaz de red estática.',
      code: `auto lo
iface lo inet loopback

# Interfaz principal
auto eth0
iface eth0 inet static
    address 172.17.2.9
    netmask 255.255.255.0
    gateway 172.17.2.1`,
      image: '/Copernico/Configuracion copernico/2.png'
    },
    {
      id: 'srv-dns',
      title: 'Archivo: /etc/resolv.conf',
      description: 'Configuración de resolución de nombres (DNS). Apunta a los servidores DNS internos (Newton/Socrates).',
      code: `domain fundacite-sucre.gob.ve
search fundacite-sucre.gob.ve
nameserver 172.17.2.4
nameserver 172.17.2.20`,
      image: '/Copernico/Configuracion copernico/3.png'
    },
    {
      id: 'srv-firewall',
      title: 'Script de Firewall (/root/firewall.sh)',
      description: 'Reglas básicas de iptables para permitir tráfico SSH, CUPS y NTP.',
      code: `#!/bin/bash
# Limpiar reglas
iptables -F
iptables -X

# Políticas por defecto
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Permitir loopback
iptables -A INPUT -i lo -j ACCEPT

# Permitir conexiones establecidas
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Permitir SSH (Administración)
iptables -A INPUT -p tcp --dport 22 -s 172.17.2.0/24 -j ACCEPT

# Permitir ICMP (Ping)
iptables -A INPUT -p icmp -j ACCEPT

# Permitir CUPS (631) desde la red interna
iptables -A INPUT -p tcp --dport 631 -s 172.17.2.0/24 -j ACCEPT
iptables -A INPUT -p udp --dport 631 -s 172.17.2.0/24 -j ACCEPT

# Permitir NTP (123) desde la red interna
iptables -A INPUT -p udp --dport 123 -s 172.17.2.0/24 -j ACCEPT

echo "Reglas de firewall aplicadas."`,
      image: '/Copernico/Configuracion copernico/4.png'
    }
  ],
  // Usamos la función generadora para crear los 35 pasos de CUPS
  CUPS: generateCupsSteps(),
  NTP: [
    {
      id: 'ntp-install',
      title: 'Instalación de NTP',
      description: 'Instalación del demonio NTP para sincronización de tiempo.',
      code: `apt-get install ntp`,
      image: '/Copernico/NTP/1.png'
    },
    {
      id: 'ntp-config',
      title: 'Archivo: /etc/ntp.conf',
      description: 'Configuración de los servidores de tiempo upstream y permisos de red.',
      code: `# /etc/ntp.conf, configuration for ntpd

driftfile /var/lib/ntp/ntp.drift

# Servidores públicos de Venezuela o globales
server 0.south-america.pool.ntp.org
server 1.south-america.pool.ntp.org
server 2.south-america.pool.ntp.org
server 3.south-america.pool.ntp.org

# Permitir que la red local consulte este servidor
restrict 172.17.2.0 mask 255.255.255.0 nomodify notrap

# Configuración por defecto
restrict default kod nomodify notrap nopeer noquery
restrict 127.0.0.1`,
      image: '/Copernico/NTP/2.png'
    },
    {
      id: 'ntp-verify',
      title: 'Verificación del servicio',
      description: 'Comandos para verificar el estado de la sincronización.',
      code: `# Ver estado de los peers
ntpq -p

# Reiniciar servicio
service ntp restart`,
      image: '/Copernico/NTP/3.png'
    }
  ]
}

// --- Variables de Estado para Edición/Copiado ---
const editingId = ref(null)
const copiedId = ref(null)

// --- Función de Resaltado ---
// Utiliza highlight.js para colorear el código en la vista previa
const highlight = (code) => {
  if (!code) return ''
  try {
    return hljs.highlightAuto(code).value
  } catch (e) {
    return code
  }
}

// --- Función de Copiado ---
// Copia el texto al portapapeles y muestra feedback visual
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
  <!-- Contenedor principal -->
  <div class="doc-container">

    <!-- Navegación -->
    <div class="nav-links">
      <router-link to="/" class="nav-btn">Ir al Menú Principal</router-link>
      <router-link to="/Servidores" class="nav-btn">Volver a Servidores</router-link>
    </div>

    <!-- Encabezado -->
    <header class="doc-header">
      <h1>Documentación del Servidor COPERNICO</h1>
      <p>Servicios de Impresión (CUPS) y Sincronización de Tiempo (NTP).</p>
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

      <!-- Título de la Sección -->
      <div class="section-header">
        <h2>{{ section.title }}</h2>
      </div>

      <!-- Descripción -->
      <div class="section-description">
        <p>{{ section.description }}</p>
      </div>

      <!-- Bloque de Código (si existe) -->
      <div v-if="section.code" class="section-code">
        <div class="code-header">
          <span class="code-label">Configuración / Código</span>
          <button @click.stop="copyCode(section.id, section.code)" class="copy-btn">
            {{ copiedId === section.id ? '¡Copiado!' : 'Copiar' }}
          </button>
        </div>

        <!-- Área de Edición vs Vista Previa -->
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

      <!-- Imagen (si existe) -->
      <div v-if="section.image" class="section-image">
        <img :src="section.image" :alt="section.title" />
      </div>

    </div>

  </div>
</template>

<style scoped>
/* --- Estilos Generales (Coherentes con Aristoteles/Platon) --- */

/* Navegación */
.nav-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.nav-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}
.nav-btn:hover { background-color: #0056b3; }

/* Contenedor */
.doc-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #eee;
}

/* Pestañas */
.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-btn {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: #555;
  transition: all 0.2s;
}

.tab-btn:hover {
  background-color: #e2e6ea;
}

.tab-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

/* Secciones */
.doc-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  overflow: hidden;
}

.section-header {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.section-header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #2c3e50;
}

.section-description {
  padding: 15px 20px;
  background-color: #fff;
}

.section-description p {
  margin: 0;
  line-height: 1.6;
}

/* Código */
.section-code {
  padding: 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.code-label {
  font-weight: bold;
  color: #555;
  font-size: 0.9rem;
}

.copy-btn {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.copy-btn:hover { background-color: #f0f0f0; border-color: #bbb; }

.code-preview {
  cursor: pointer;
  background-color: #282c34;
  border: 1px solid #181a1f;
  border-radius: 4px;
  resize: vertical;
  min-height: 50px;
  max-height: 500px;
  overflow: auto;
}

.code-preview pre {
  margin: 0;
  padding: 0;
  background: transparent !important;
}

.hljs {
  padding: 15px !important;
  background: transparent !important;
}

.section-code textarea {
  width: 100%;
  border: 1px solid #181a1f;
  background-color: #282c34;
  color: #abb2bf;
  caret-color: #528bff;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 15px;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  display: block;
  resize: vertical;
  max-height: 500px;
  overflow: auto;
}

.section-code textarea:focus {
  border-color: #4b5263;
  background-color: #2c313a;
}

/* Imagen */
.section-image {
  padding: 20px;
  text-align: center;
  background-color: #fff;
}

.section-image img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
