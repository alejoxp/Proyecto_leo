<script setup>
// Componente: Menu (Dashboard Principal)
// Este archivo implementa el menú principal con el MISMO estilo
// usado en otros componentes como `PlatonDocumentation.vue`
// y `SystemDocumentation.vue`.
//
// INSTRUCCIONES RÁPIDAS (para editar manualmente):
// - Para cambiar textos o rutas: editar la constante `menuItems` abajo.
// - Cada entrada debe tener: { id, title, description, route }
// - Para añadir iconos o más campos, extiende los objetos y actualiza
//   la plantilla donde se renderiza `item`.

import { ref } from 'vue'

// Lista de items del menú. Edita, añade o quita objetos según necesites.
const menuItems = ref([
	{
		id: 1,
		title: 'Servidores',
		description: 'Panel de servidores: estado, configuraciones y acceso remoto.',
		route: '/Servidores' // Asegúrate de que esta ruta exista en `router.js`
	},
	{
		id: 2,
		title: 'Plan de contingencia',
		description: 'Guía visual y pasos del plan de contingencia.',
		// En este proyecto el Plan de contingencia está en la ruta raíz ('/')
		// Si posteriormente cambias la ruta en `router.js`, actualiza este campo.
		route: '/system'
	},
	{
		id: 3,
		title: 'Documentación interna',
		description: 'Manual técnico interno y documentación de sistemas.',
		route: '/documentacion-interna'
	},
	{
		id: 4,
		title: 'Documentación de usuario',
		description: 'Guías y manuales dirigidos a usuarios finales.',
		route: '/documentacion-usuario'
	}
])
</script>

<template>
	<!-- Contenedor principal centrado (misma familia de estilos que otros componentes) -->
	<div class="menu-container">

		<!-- Encabezado del Dashboard -->
		<header class="menu-header">
			<h1>Dashboard Principal</h1>
			<p>Aquí están los accesos a las diferentes secciones del sistema.</p>
		</header>

		<!-- Grid de tarjetas: una tarjeta por cada item del menú -->
		<div class="menu-grid">
			<!-- NOTE: Si quieres que la tarjeta completa sea clicable, usamos <router-link> envolviendo la tarjeta -->
			<router-link
				v-for="item in menuItems"
				:key="item.id"
				:to="item.route"
				class="menu-card"
				aria-label="Ir a {{ item.title }}"
			>
				<div class="card-header">
					<h2>{{ item.title }}</h2>
				</div>
				<div class="card-body">
					<p>{{ item.description }}</p>
				</div>
				<div class="card-footer">
					<!-- Texto guía pequeño; cámbialo o elimina si no lo necesitas -->
					<small>Hacer clic para abrir</small>
				</div>
			</router-link>
		</div>

		<!-- Pie opcional con enlaces rápidos (edítalo si quieres) -->
		<footer class="menu-footer">
			
		</footer>

	</div>
</template>

<style scoped>
/* Estilos coherentes con los otros componentes del proyecto */
.menu-container {
	max-width: 1000px;
	margin: 0 auto;
	padding: 24px;
	font-family: 'Segoe UI', sans-serif;
	color: #333;
}

.menu-header {
	text-align: center;
	margin-bottom: 28px;
	border-bottom: 2px solid #eee;
	padding-bottom: 12px;
}

.menu-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 20px;
	margin-top: 20px;
}

.menu-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	text-decoration: none; /* importante para quitar subrayado */
	color: inherit; /* heredar color del texto */
	overflow: hidden;
	box-shadow: 0 6px 16px rgba(0,0,0,0.04);
	transition: transform 160ms ease, box-shadow 160ms ease;
}

.menu-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 12px 28px rgba(0,0,0,0.08);
}

.card-header {
	background-color: #f8f9fa;
	padding: 14px 16px;
	border-bottom: 1px solid #eee;
}

.card-header h2 {
	margin: 0;
	font-size: 1.05rem;
	color: #2c3e50;
}

.card-body {
	padding: 16px;
}

.card-body p {
	margin: 0;
	line-height: 1.5;
}

.card-footer {
	padding: 10px 16px;
	background: #fafafa;
	border-top: 1px solid #f0f0f0;
	text-align: right;
}

.menu-footer {
	margin-top: 28px;
	text-align: center;
	color: #666;
}

/* Responsive tweaks */
@media (max-width: 480px) {
	.menu-container { padding: 12px; }
	.card-header h2 { font-size: 1rem; }
}
</style>

