<script setup>
// --- Importaciones necesarias ---
// `ref` para estados reactivos, `hljs` para resaltar bloques de código.
import { ref } from 'vue'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

// --- sections: contenido completo extraído desde public/aristoteles HTML ---
// He extraído cada bloque <pre class="code"> y el texto descriptivo
// correspondiente y los he colocado en secciones ordenadas. Cada
// sección mantiene el código completo tal cual aparece en el HTML.
const sections = ref([
	{
		id: 1,
		title: 'SERVIDOR: ARISTOTELES - Resumen de servicios',
		description: `Aristoteles contiene los siguientes servicios:\n\n- DHCP para los equipos de la sala de la academia de software libre (segmento 10.0.0.0/24) y para la red inalámbrica FUNDACITE-CDSL (segmento 10.3.3.0/24).\n- Firewall iptables para enrutado de puertos hasta la red del segmento 172.17.2.0/24.\n- Puntos de red en el rack: eth0, eth1, eth2.`,
		code: '',
		image: ''
	},
	{
		id: 2,
		title: 'Archivo: /etc/network/interface',
		description: 'Contenido completo del bloque "Archivo /etc/network/interface"',
		code: `auto lo
iface lo inet loopback

#######################
##RED FUNDACITE SUCRE##
#######################
auto eth0
iface eth0 inet static
			address 172.17.2.12
			netmask 255.255.255.0
			gateway 172.17.2.1
			network 172.17.2.0

auto eth0:1
iface eth0:1 inet static
			address 172.17.2.13
			netmask 255.255.255.0
      
##################################
##RED ACADEMIA DE SOFTWARE LIBRE##
##################################
auto eth1
iface eth1 inet static
			address 10.0.0.1
			netmask 255.255.255.0
			network 10.0.0.0
      
############################
##RED CENTRO DE DESARROLLO##
############################
auto eth2
iface eth2 inet static
			address 10.3.3.1
			netmask 255.255.255.0
			network 10.3.3.0`,
		image: ''
	},
	{
		id: 3,
		title: 'Archivo: /etc/resolv.conf',
		description: 'DNS y búsqueda de dominio del equipo',
		code: `domain fundacite-sucre.gob.ve
search fundacite-sucre.gob.ve
nameserver 172.17.2.4
nameserver 172.17.2.20`,
		image: ''
	},
	{
		id: 4,
		title: 'Instalar paquetes necesarios',
		description: 'Comando para instalar el paquete isc-dhcp-server',
		code: `apt-get install isc-dhcp-server`,
		image: ''
	},
	{
		id: 5,
		title: 'Archivo: /etc/default/isc-dhcp-server',
		description: 'Valores por defecto y interfaces usadas por ISC DHCP',
		code: `# Defaults for isc-dhcp-server initscript
# sourced by /etc/init.d/isc-dhcp-server
# installed at /etc/default/isc-dhcp-server by the maintainer scripts

#
# This is a POSIX shell fragment
#

# Path to dhcpd's config file (default: /etc/dhcp/dhcpd.conf).
#DHCPD_CONF=/etc/dhcp/dhcpd.conf

# Path to dhcpd's PID file (default: /var/run/dhcpd.pid).
#DHCPD_PID=/var/run/dhcpd.pid

# Additional options to start dhcpd with.
#	Don't use options -cf or -pf here; use DHCPD_CONF/ DHCPD_PID instead
#OPTIONS=""

# On what interfaces should the DHCP server (dhcpd) serve DHCP requests?
#	Separate multiple interfaces with spaces, e.g. "eth0 eth1".
INTERFACES="eth1 eth2"`,
		image: ''
	},
	{
		id: 6,
		title: 'Archivo: /etc/dhcp/dhcpd.conf ',
		description: 'Configuración completa extraída del HTML (subnets, hosts y opciones).',
		code: `#
# Sample configuration file for ISC dhcpd for Debian
#
# $Id: dhcpd.conf,v 1.1.1.1 2002/05/21 00:07:44 peloy Exp $
#
#
# The ddns-updates-style parameter controls whether or not the server will
# attempt to do a DNS update when a lease is confirmed. We default to the
# behavior of the version 2 packages ('none', since DHCP v2 didn't
# have support for DDNS.)
ddns-update-style none;

# option definitions common to all supported networks...
#option domain-name "example.org";
#option domain-name-servers ns1.example.org, ns2.example.org;

default-lease-time 600;
max-lease-time 7200;

# If this DHCP server is the official DHCP server for the local
# network, the authoritative directive should be uncommented.
#authoritative;

# Use this to send dhcp log messages to a different log file (you also
# have to hack syslog.conf to complete the redirection).
log-facility local7;

# No service will be given on this subnet, but declaring it helps the 
# DHCP server to understand the network topology.

#subnet 10.152.187.0 netmask 255.255.255.0 {
#}

# This is a very basic subnet declaration.

#subnet 10.254.239.0 netmask 255.255.255.224 {
#  range 10.254.239.10 10.254.239.20;
#  option routers rtr-239-0-1.example.org, rtr-239-0-2.example.org;
#}

# This declaration allows BOOTP clients to get dynamic addresses,
# which we don't really recommend.

#subnet 10.254.239.32 netmask 255.255.255.224 {
#  range dynamic-bootp 10.254.239.40 10.254.239.60;
#  option broadcast-address 10.254.239.31;
#  option routers rtr-239-32-1.example.org;
#}

# A slightly different configuration for an internal subnet.
subnet 10.0.0.0 netmask 255.255.255.0 {
	range 10.0.0.2 10.0.0.50;
	option domain-name-servers 10.0.0.1;
	option routers 10.0.0.1;
	default-lease-time 600;
	max-lease-time 7200;
}

subnet 10.3.3.0 netmask 255.255.255.0 {
	range 10.3.3.3 10.3.3.50;
	option domain-name-servers 10.3.3.1;
	option routers 10.3.3.1;
	deny unknown-clients;
	default-lease-time 600;
	max-lease-time 7200;
}

# Hosts which require special configuration options can be listed in
# host statements.   If no address is specified, the address will be
# allocated dynamically (if possible), but the host-specific information
# will still come from the host declaration.

#host passacaglia {
#  hardware ethernet 0:0:c0:5d:bd:95;
#  filename "vmunix.passacaglia";
#  server-name "toccata.fugue.com";
#}

# Fixed IP addresses can also be specified for hosts.   These addresses
# should not also be listed as being available for dynamic assignment.
# Hosts for which fixed IP addresses have been specified can boot using
# BOOTP or DHCP.   Hosts for which no fixed address is specified can only
# be booted with DHCP, unless there is an address range on the subnet
# to which a BOOTP client is connected which has the dynamic-bootp flag
# set.
#host fantasia {
#  hardware ethernet 08:00:07:26:c0:a5;
#  fixed-address fantasia.fugue.com;
#}

host centro1 {
	hardware ethernet 00:18:02:0f:10:98;
	fixed-address 10.3.3.10;
}

host centro2 {
	hardware ethernet 00:19:d1:1d:d2:6b;
	fixed-address 10.3.3.11;
}

host centro3 {
	hardware ethernet 00:18:02:0f:0e:24;
	fixed-address 10.3.3.12;
}

host centro4 {
	hardware ethernet 00:18:02:0F:0F:BB;
	fixed-address 10.3.3.13;
}

host centro5 {
	hardware ethernet 00:18:02:0f:0f:c0;
	fixed-address 10.3.3.14;
}

host centro6 {
	hardware ethernet 00:18:02:0f:13:0b;
	fixed-address 10.3.3.15;
}

host cdsl {
	hardware ethernet 00:18:02:0f:10:96;
	fixed-address 10.3.3.16;
}

host infopunto {
	hardware ethernet 00:14:85:cd:b7:1e;
	#hardware ethernet 00:1A:70:2E:FC:FB; #nueva wlan0
	fixed-address 10.3.3.18;
}

host CRI {
	hardware ethernet 00:1a:70:2e:fa:c0;
	fixed-address 10.3.3.19;
}

######################
## LAPTOS FUNDACITE ##
######################

host laptopadmon {
	hardware ethernet 00:13:ce:4d:70:b4;
	fixed-address 10.3.3.17;
}

host laptoptoshiba1 {
	hardware ethernet 00:19:d2:70:03:11;
	fixed-address 10.3.3.20;
}

host laptoptoshiba2 {
	hardware ethernet 00:18:de:53:a9:0a;
	fixed-address 10.3.3.21;
}

host laptophp1 {
	hardware ethernet 00:1b:77:9d:5c:3f;
	fixed-address 10.3.3.22;
}

host laptophp2 {
	hardware ethernet 00:13:e8:1c:4b:eb;
	fixed-address 10.3.3.23;
}

host laptopvit1-fs {
	hardware ethernet 00:13:CE:B8:62:03;
	fixed-address 10.3.3.24;
}

host laptopvit2-fs {
	hardware ethernet 00:13:ce:eb:02:c4;
	fixed-address 10.3.3.25;
}

host CDI {
	hardware ethernet 00:25:22:E1:77:66;
	fixed-address 10.3.3.26;
}
`,
		image: ''
	},
	{
		id: 7,
		title: 'Archivo: /etc/rc.local',
		description: 'Script que se ejecuta al final de los runlevels para iniciar firewall',
		code: `#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

/root/firewall.sh
exit 0`,
		image: ''
	},
	{
		id: 8,
		title: 'Archivo: /root/firewall.sh',
		description: 'Script completo con reglas iptables para enrutado y filtrado de tráfico.',
		code: `#!/bin/bash

# BORRANDO LAS REGLAS EXISTENTES
iptables -X
iptables -Z
iptables -F
iptables -t nat -F
iptables -t nat -Z
iptables -t nat -X

# POLITICA POR DEFECTO
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

#ESTABLECIENDO EL FORWARDING
echo 1 > /proc/sys/net/ipv4/ip_forward

# ADMINISTRACION
iptables -A INPUT -s 172.17.2.100/24 -j ACCEPT
iptables -A OUTPUT -s 172.17.2.100/24 -j ACCEPT

#PERMITE QUE ENTREN PAQUETES DESDE LA LAN A TRAVES DE ETH1 Y ETH2
iptables -t nat -A PREROUTING -i eth0 -j ACCEPT

#PERMITE QUE SALGAN LOS PAQUETES POR ETH0 DESDE LA LAN y SON ENMASCARADOS
#iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -j SNAT --to 172.17.2.13

#iptables -t nat -A POSTROUTING -s 10.3.3.0/24 -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -s 10.3.3.0/24 -j SNAT --to 172.17.2.12

#############################
## FILTRADO PARA LAS REDES ##
#############################

# Acceso a el DNS (FUNDACITE DNS SERVER en NEWTON) a traves de ETH2
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 53 -j DNAT --to-destination 172.17.2.4:53
iptables -A FORWARD -p tcp --dport 53 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p tcp --sport 53 -i eth0 -o eth2 -j ACCEPT

iptables -t nat -A PREROUTING -i eth2 -p udp --dport 53 -j DNAT --to-destination 172.17.2.4:53
iptables -A FORWARD -p udp --dport 53 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p udp --sport 53 -i eth0 -o eth2 -j ACCEPT

# Acceso a el SQUID (FUNDACITE SQUID SERVER en NEWTON) a traves de ETH1
iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 3128 -j DNAT --to-destination 172.17.2.8:3128
iptables -A FORWARD -p tcp --dport 3128 -i eth1 -o eth0 -j ACCEPT
iptables -A FORWARD -p tcp --sport 3128 -i eth0 -o eth1 -j ACCEPT

# Acceso a el SQUID (FUNDACITE SQUID SERVER en NEWTON) a traves de ETH2
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 3128 -j DNAT --to-destination 172.17.2.8:3128
iptables -A FORWARD -p tcp --dport 3128 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p tcp --sport 3128 -i eth0 -o eth2 -j ACCEPT

# Acceso a el NTP (FUNDACITE NTP SERVER en COPERNICO) a traves a ETH1
#iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 123 -j DNAT --to-destination 172.17.2.9:123
#iptables -A FORWARD -p tcp --dport 123 -i eth1 -o eth0 -j ACCEPT
#iptables -A FORWARD -p tcp --sport 123 -i eth0 -o eth1 -j ACCEPT

# Acceso a el NTP (FUNDACITE NTP SERVER en COPERNICO) a traves a ETH2
iptables -t nat -A PREROUTING -i eth2 -p udp --dport 123 -j DNAT --to-destination 172.17.2.9:123
iptables -A FORWARD -p udp --dport 123 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p udp --sport 123 -i eth0 -o eth2 -j ACCEPT

# Acceso a el CUPS (FUNDACITE CUPS SERVER en COPERNICO) a traves a ETH2
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 631 -j DNAT --to-destination 172.17.2.9:631
iptables -A FORWARD -p tcp --dport 631 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p tcp --sport 631 -i eth0 -o eth2 -j ACCEPT

# Acceso a los sistemas WEB internos (FUNDACITE WEB INTERNO en DARWIN y PLATON) a traves de ETH2
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 80 -j DNAT --to-destination 172.17.2.15:80
iptables -A FORWARD -p tcp --dport 80 -i eth2 -o eth0 -j ACCEPT
iptables -A FORWARD -p tcp --sport 80 -i eth0 -o eth2 -j ACCEPT


###FIN DEL SCRIPT

echo :: FIREWALL ACTIVO ::
##Reinicia el equipo y verifica la operavilidad del firewall`,
		image: ''
	}
	,{
		id: 9,
		title: 'Recomendación',
		description: 'Antes de aplicar estas configuraciones en producción, sigue estas recomendaciones prácticas para minimizar riesgos y facilitar mantenimiento:',
		code: `- Probar siempre en un entorno de laboratorio o staging que reproduzca la red.
- Hacer copia de seguridad de los archivos de configuración originales antes de modificar (/etc/network/interfaces, /etc/dhcp/dhcpd.conf, /root/firewall.sh, /etc/rc.local).
- Usar control de versiones (git) para los archivos de configuración y scripts.
- Automatizar el inicio del firewall con systemd en lugar de rc.local para mayor fiabilidad: crear un servicio que active /root/firewall.sh.
- Restringir acceso remoto (SSH) y permitir solo IPs de administración confiables.
- Validar reglas de iptables con pruebas de conectividad y monitoreo después de reiniciar.
- Documentar cualquier cambio y fecha/autor para auditoría y reversión rápida.`,
		image: ''
	}
])

// --- Edición / copiado similar a Platon ---
const editingId = ref(null)
const copiedId = ref(null)

// Resalta código con highlight.js (igual que en Platon)
const highlight = (code) => {
	if (!code) return ''
	return hljs.highlightAuto(code).value
}

// Copiar al portapapeles (misma UX que Platon)
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
	<!-- Contenedor principal, replicando estructura de Platon -->
	<div class="doc-container">

		<!-- Botones de navegación: volver al Menú y al listado de Servidores -->
		<div class="nav-links">
			<router-link to="/" class="nav-btn">Ir al Menú Principal</router-link>
			<router-link to="/Servidores" class="nav-btn">Volver a Servidores</router-link>
		</div>

		<!-- Encabezado del documento con título y descripción breve -->
		<header class="doc-header">
			<h1>Documentación del Servidor ARISTOTELES</h1>
			<p>Secciones generadas desde el HTML original en <em>public/aristoteles</em>.</p>
		</header>

		<!-- Recorremos `sections` y renderizamos cada bloque como en Platon -->
		<div v-for="section in sections" :key="section.id" class="doc-section">

			<!-- Cabecera de sección -->
			<div class="section-header">
				<h2>{{ section.title }}</h2>
			</div>

			<!-- Descripción breve (puede incluir lista resumida) -->
			<div class="section-description">
				<p v-html="section.description.replace(/\n/g, '<br/>')"></p>
			</div>

			<!-- Código editable / preformateado si existe -->
			<div v-if="section.code" class="section-code">
				<div class="code-header">
					<span class="code-label">Configuración / Código</span>
					<button @click.stop="copyCode(section.id, section.code)" class="copy-btn">
						{{ copiedId === section.id ? '¡Copiado!' : 'Copiar' }}
					</button>
				</div>

				<div v-if="editingId === section.id">
					<!-- Área de edición desplegable (igual que Platon) -->
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

			<!-- Imagen si existe (en este caso no aplicó, pero mantengo la estructura) -->
			<div v-if="section.image" class="section-image">
				<img :src="section.image" :alt="section.title" />
			</div>

		</div>

	</div>
</template>

<style scoped>
/* --- Estilos replicados desde PlatonDocumentation.vue con comentarios --- */

/* NAV LINKS
	 - display:flex coloca botones en fila
	 - gap separa los botones
	 - margin-bottom separa del contenido principal
*/
.nav-links {
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-bottom: 30px;
}

/* NAV BTN (botón azul)
	 Comentarios:
	 - background-color: color principal del botón
	 - color: color del texto
	 - padding: zona clicable; mayor padding = más fácil clicar
	 - border-radius: redondeo (estética)
	 - transition: suaviza el cambio en :hover
*/
.nav-btn {
	background-color: #007bff;
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	text-decoration: none;
	font-weight: bold;
	transition: background-color 0.3s;
}
.nav-btn:hover { background-color: #0056b3 }

/* CONTENEDOR PRINCIPAL
	 - max-width limita la línea para mejor lectura
	 - margin:0 auto centra
	 - padding separa contenido de bordes
*/
.doc-container {
	max-width: 900px;
	margin: 0 auto;
	padding: 20px;
	font-family: 'Segoe UI', sans-serif;
	color: #333;
}

.doc-header { text-align:center; margin-bottom:40px; border-bottom:2px solid #eee }

.doc-section {
	background: white;
	border: 1px solid #ddd;
	border-radius: 8px;
	margin-bottom: 40px;
	box-shadow: 0 4px 10px rgba(0,0,0,0.05);
	overflow: hidden;
}

.section-header { background-color:#f8f9fa; padding:15px 20px; border-bottom:1px solid #eee }
.section-header h2 { margin:0; font-size:1.3rem; color:#2c3e50 }
.section-description { padding:15px 20px; background-color:#fff }
.section-description p { margin:0; line-height:1.6 }

/* SECCION DE CODIGO (gris):
	 - background-color: gris claro para separar visualmente
	 - textarea: monoespaciada y estilizada para facilitar edición
	 - .copy-btn: botón pequeño para copiar rápidamente
*/
.section-code { padding:20px; background-color:#f8f9fa; border-top:1px solid #eee; border-bottom:1px solid #eee }
.code-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px }
.code-label { font-weight:bold; color:#555; font-size:0.9rem }
.copy-btn { background-color:#fff; border:1px solid #ccc; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:0.8rem; transition:all .2s }
.copy-btn:hover { background-color:#f0f0f0; border-color:#bbb }
/* Mejora la caja de previsualización para que sea consistente */
.code-preview {
  cursor: pointer;
  background-color: #282c34; 
  border: 1px solid #181a1f;
  border-radius: 4px;

  /* --- LO NUEVO PARA LA VISTA PREVIA --- */
  resize: vertical; 
  min-height: 50px;  /* Para que los cortos de 2 líneas se vean bien */
  max-height: 500px; /* El límite máximo igual que el textarea */
  overflow: auto;    /* La barra de scroll si el código es larguísimo */
}

/* Ajuste del pre y code para eliminar márgenes extraños */
.code-preview pre {
  margin: 0;
  padding: 0;
  background: transparent !important;
}
.hljs {
  padding: 15px !important;
  background: transparent !important; /* Deja que el contenedor mande */
}
/* Esto asegura que el área de edición sea igual de oscura que el código */
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

  /* --- LO NUEVO PARA EL TEXTAREA --- */
  resize: vertical; 
  max-height: 500px; /* Evita que crezca infinitamente */
  overflow: auto;    /* Pone la barra de scroll si pasa los 400px */
}
/* Para que al hacer focus no pierda el estilo */
.section-code textarea:focus {
  border-color: #4b5263;
  background-color: #2c313a; 
}
.section-image { padding:20px; text-align:center; background-color:#fff }
.section-image img { max-width:100%; height:auto; border:1px solid #ddd; border-radius:4px }

/* Enlaces de regreso (si los hubiera fuera de nav) */
.back-link { text-align:center; margin-top:40px }
.back-link a { color:#007bff; text-decoration:none }
.back-link a:hover { text-decoration:underline }
</style>

