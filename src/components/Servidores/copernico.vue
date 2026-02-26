<script setup>
import { ref } from 'vue'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

// Pestañas: Servidor | CUPS | NTP
const tabs = ['Servidor', 'CUPS', 'NTP']
const activeTab = ref('Servidor')

// Secciones por pestaña. Rellenadas con fragmentos disponibles en el repo
const sectionsByTab = {
  Servidor: [
    {
      id: 'srv-info',
      title: 'Información básica de COPERNICO',
      description: 'IP interna conocida y notas de acceso utilizadas en la red (según otros documentos).',
      code: `IP interno: 172.17.2.9
Rol: Servicios de sincronización NTP y servidor de impresión CUPS
Nota: Asegúrate de que las rutas y reglas de firewall apunten a esta IP cuando corresponda.`,
      image: ''
    },
    {
      id: 'srv-firewall',
      title: 'Reglas NAT / Firewall relevantes para COPERNICO',
      description: 'Reglas copiadas de otras configuraciones donde se direccionan servicios hacia COPERNICO.',
      code: `# Acceso a el NTP (FUNDACITE NTP SERVER en COPERNICO) a traves a ETH2
iptables -t nat -A PREROUTING -i eth2 -p udp --dport 123 -j DNAT --to-destination 172.17.2.9:123
iptables -A FORWARD -p udp --dport 123 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p udp --sport 123 -i eth0 -o eth2 -j ACCEPT

# Acceso a el CUPS (FUNDACITE CUPS SERVER en COPERNICO) a traves a ETH2
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 631 -j DNAT --to-destination 172.17.2.9:631
iptables -A FORWARD -p tcp --dport 631 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p tcp --sport 631 -i eth0 -o eth2 -j ACCEPT`,
      image: ''
    }
  ],
  CUPS: [
    {
      id: 'cups-access',
      title: 'Acceso a CUPS (puerto 631)',
      description: 'Regla de NAT que permite acceder al servicio CUPS alojado en COPERNICO desde la red externa/interior.',
      code: `# DNAT para CUPS hacia COPERNICO
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 631 -j DNAT --to-destination 172.17.2.9:631
iptables -A FORWARD -p tcp --dport 631 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p tcp --sport 631 -i eth0 -o eth2 -j ACCEPT

# Nota: El servicio CUPS normalmente se configura en /etc/cups/cupsd.conf
# Por favor proporciona el contenido original de CUPS si deseas incluirlo aquí.`,
      image: ''
    }
  ],
  NTP: [
    {
      id: 'ntp-access-1',
      title: 'Acceso a NTP (puerto 123)',
      description: 'Reglas que permiten reenviar peticiones NTP hacia COPERNICO.',
      code: `# DNAT para NTP hacia COPERNICO (UDP 123)
iptables -t nat -A PREROUTING -i eth2 -p udp --dport 123 -j DNAT --to-destination 172.17.2.9:123
iptables -A FORWARD -p udp --dport 123 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p udp --sport 123 -i eth0 -o eth2 -j ACCEPT

# Nota: El demonio NTP (ntpd) o chrony se configura en /etc/ntp.conf o /etc/chrony/chrony.conf
# Si quieres que copie el archivo de configuración completo, sube el HTML o el contenido de /etc/ntp.conf.`,
      image: ''
    }
  ]
}

const editingId = ref(null)
const copiedId = ref(null)

const highlight = (code) => {
  if (!code) return ''
  try {
    return hljs.highlight(code, { language: 'plaintext' }).value
  } catch (e) {
    return hljs.highlightAuto(code).value
  }
}

function copyCode(id, text) {
  try {
    navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => (copiedId.value = null), 1800)
  } catch (e) {
    console.warn('Clipboard write failed', e)
  }
}
</script>

<template>
  <div class="doc-container">
    <div class="nav-links">
      <router-link to="/" class="nav-btn">Volver al Menú</router-link>
    </div>

    <header class="doc-header">
      <h1>COPERNICO — Documentación</h1>
      <p>Configuración y accesos para COPERNICO (Servidor, CUPS, NTP).</p>
    </header>

    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t"
        :class="['tab-btn', { active: activeTab === t || activeTab === t } ]"
        @click="activeTab = t"
      >
        {{ t }}
      </button>
    </div>

    <div v-for="section in sectionsByTab[activeTab]" :key="section.id" class="doc-section">
      <div class="section-header"><h2>{{ section.title }}</h2></div>
      <div class="section-description"><p>{{ section.description }}</p></div>

      <div v-if="section.code" class="section-code">
        <div class="code-header">
          <span class="code-label">Configuración / Código</span>
          <button @click.stop="copyCode(section.id, section.code)" class="copy-btn">
            {{ copiedId === section.id ? '¡Copiado!' : 'Copiar' }}
          </button>
        </div>

        <div v-if="editingId === section.id">
          <textarea v-model="section.code" rows="8" @blur="editingId = null" autofocus></textarea>
          <small style="color:#666; display:block; margin-top:5px;">Haz clic fuera para guardar y ver resaltado.</small>
        </div>
        <div v-else @click="editingId = section.id" class="code-preview" title="Haz clic para editar">
          <pre><code class="hljs" v-html="highlight(section.code)"></code></pre>
        </div>
      </div>

      <div v-if="section.image" class="section-image"><img :src="section.image" :alt="section.title"/></div>
    </div>
  </div>
</template>

<style scoped>
/* Reusar estilos del resto de documentación de servidores */
.nav-links{display:flex;justify-content:center;gap:20px;margin-bottom:20px}
.nav-btn{background-color:#007bff;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:700;transition:background-color .2s}
.nav-btn:hover{background-color:#0056b3}
.doc-container{max-width:920px;margin:0 auto;padding:18px;font-family:'Segoe UI',sans-serif;color:#333}
.doc-header{text-align:center;margin-bottom:20px}
.tabs{display:flex;gap:10px;justify-content:center;margin-bottom:18px}
.tab-btn{background:#f1f3f5;border:1px solid #e6e6e6;padding:8px 14px;border-radius:6px;cursor:pointer;font-weight:700}
.tab-btn.active{background:#007bff;color:#fff;border-color:#0062cc}
.doc-section{background:#fff;border:1px solid #ddd;border-radius:8px;margin-bottom:22px;box-shadow:0 4px 10px rgba(0,0,0,.03);overflow:hidden}
.section-header{background:#f8f9fa;padding:12px 16px;border-bottom:1px solid #eee}
.section-header h2{margin:0;font-size:1.1rem;color:#2c3e50}
.section-description{padding:12px 16px;background:#fff}
.section-code{padding:16px;background:#f8f9fa;border-top:1px solid #eee;border-bottom:1px solid #eee}
.code-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.code-label{font-weight:700;color:#555;font-size:.88rem}
.copy-btn{background:#fff;border:1px solid #ccc;padding:6px 10px;border-radius:4px;cursor:pointer;font-size:.86rem}
.copy-btn:hover{background:#f0f0f0;border-color:#bbb}
.code-preview{cursor:pointer;border-radius:4px;overflow:auto;min-height:90px;border:1px solid #ddd}
.code-preview pre{margin:0}
.section-code textarea{width:100%;border:none;background:#e9ecef;font-family:'Courier New',monospace;font-size:.9rem;line-height:1.4;padding:10px;border-radius:4px;resize:vertical;box-sizing:border-box}
.section-code textarea:focus{outline:none;background:#fff;border:1px solid #007bff}
.section-image{padding:14px;text-align:center;background:#fff}
.section-image img{max-width:100%;height:auto;border:1px solid #ddd;border-radius:4px}
</style>
