<script setup>
// Importamos 'ref' de Vue. Esto nos permite crear una lista de datos que,
// si cambiamos en el futuro, actualizará la página automáticamente.
import { ref } from 'vue'

// --- ZONA DE EDICIÓN DE DATOS ---
// Aquí defines los pasos para la documentación del sistema.
// Es un "array" (lista) de objetos. Cada objeto {} es un paso con imagen del plan de contingencia.
const steps = ref([
  // Imagen 1: Detalle inicial
  {
    id: 1,
    title: 'Imagen 1',
    image: '/Plan de contingencia/1.png',
    description: 'Escribe aquí la descripción detallada para la imagen 1.'
  },
  // Imagen 2: Segundo detalle
  {
    id: 2,
    title: 'Imagen 2',
    image: '/Plan de contingencia/2.png',
    description: 'Escribe aquí la descripción detallada para la imagen 2.'
  },
  // Imagen 3: Tercer detalle
  {
    id: 3,
    title: 'Imagen 3',
    image: '/Plan de contingencia/3.png',
    description: 'Escribe aquí la descripción detallada para la imagen 3.'
  },
  // Imagen 4: Cuarto detalle
  {
    id: 4,
    title: 'Imagen 4',
    image: '/Plan de contingencia/4.png',
    description: 'Escribe aquí la descripción detallada para la imagen 4.'
  },
  // Imagen 5: Quinto detalle
  {
    id: 5,
    title: 'Imagen 5',
    image: '/Plan de contingencia/5.png',
    description: 'Escribe aquí la descripción detallada para la imagen 5.'
  },
  // Imagen 6: Sexto detalle
  {
    id: 6,
    title: 'Imagen 6',
    image: '/Plan de contingencia/6.png',
    description: 'Escribe aquí la descripción detallada para la imagen 6.'
  },
  // Imagen 7: Séptimo detalle
  {
    id: 7,
    title: 'Imagen 7',
    image: '/Plan de contingencia/7.png',
    description: 'Escribe aquí la descripción detallada para la imagen 7.'
  },
  // Imagen 8: Octavo detalle
  {
    id: 8,
    title: 'Imagen 8',
    image: '/Plan de contingencia/8.png',
    description: 'Escribe aquí la descripción detallada para la imagen 8.'
  },
  // Imagen 9: Noveno detalle
  {
    id: 9,
    title: 'Imagen 9',
    image: '/Plan de contingencia/9.png',
    description: 'Escribe aquí la descripción detallada para la imagen 9.'
  },
  // Imagen 10: Décimo detalle
  {
    id: 10,
    title: 'Imagen 10',
    image: '/Plan de contingencia/10.png',
    description: 'Escribe aquí la descripción detallada para la imagen 10.'
  },
  // Imagen 11: Undécimo detalle
  {
    id: 11,
    title: 'Imagen 11',
    image: '/Plan de contingencia/11.png',
    description: 'Escribe aquí la descripción detallada para la imagen 11.'
  },
  // Imagen 12: Duodécimo detalle
  {
    id: 12,
    title: 'Imagen 12',
    image: '/Plan de contingencia/12.png',
    description: 'Escribe aquí la descripción detallada para la imagen 12.'
  },
  // Imagen 13: Decimotercero detalle
  {
    id: 13,
    title: 'Imagen 13',
    image: '/Plan de contingencia/13.png',
    description: 'Escribe aquí la descripción detallada para la imagen 13.'
  },
  // Imagen 14: Decimocuarto detalle
  {
    id: 14,
    title: 'Imagen 14',
    image: '/Plan de contingencia/14.png',
    description: 'Escribe aquí la descripción detallada para la imagen 14.'
  },
  // Imagen 15: Decimoquinto detalle
  {
    id: 15,
    title: 'Imagen 15',
    image: '/Plan de contingencia/15.png',
    description: 'Escribe aquí la descripción detallada para la imagen 15.'
  },
  // Imagen 16: Decimosexto detalle
  {
    id: 16,
    title: 'Imagen 16',
    image: '/Plan de contingencia/16.png',
    description: 'Escribe aquí la descripción detallada para la imagen 16.'
  },
  // Imagen 17: Nota - Imagen no encontrada en la carpeta
  {
    id: 17,
    title: 'Imagen 17',
    image: '', // Imagen no disponible
    description: 'Imagen 17 no se encuentra en la carpeta. Escribe aquí si tienes una descripción alternativa.'
  },
  // Imagen 18: Decimoctavo detalle
  {
    id: 18,
    title: 'Imagen 18',
    image: '/Plan de contingencia/18.png',
    description: 'Escribe aquí la descripción detallada para la imagen 18.'
  },
  // Imagen 19: Decimonoveno detalle
  {
    id: 19,
    title: 'Imagen 19',
    image: '/Plan de contingencia/19.png',
    description: 'Escribe aquí la descripción detallada para la imagen 19.'
  },
  // Imagen 20: Vigésimo detalle
  {
    id: 20,
    title: 'Imagen 20',
    image: '/Plan de contingencia/20.png',
    description: 'Escribe aquí la descripción detallada para la imagen 20.'
  },
  // Imagen 21: Vigésimo primero detalle
  {
    id: 21,
    title: 'Imagen 21',
    image: '/Plan de contingencia/21.png',
    description: 'Escribe aquí la descripción detallada para la imagen 21.'
  },
  // Imagen 22: Vigésimo segundo detalle
  {
    id: 22,
    title: 'Imagen 22',
    image: '/Plan de contingencia/22.png',
    description: 'Escribe aquí la descripción detallada para la imagen 22.'
  },
  // Imagen 23: Vigésimo tercero detalle
  {
    id: 23,
    title: 'Imagen 23',
    image: '/Plan de contingencia/23.png',
    description: 'Escribe aquí la descripción detallada para la imagen 23.'
  }
])
</script>

<template>
  <!-- Contenedor principal que centra todo el contenido en la pantalla -->
  <div class="doc-container">
    
    <!-- Encabezado del documento -->
    <header class="doc-header">
      <h1>Documentación del Plan de Contingencia</h1>
      <p>Guía visual con imágenes del plan de contingencia, del 1 al 23.</p>
      <p><router-link to="/" class="nav-btn">Menu</router-link></p>
    </header>

    <!-- 
      Bucle (v-for): Esto crea una tarjeta automáticamente por cada paso 
      que definiste arriba en la variable 'steps'. No necesitas copiar y pegar código HTML.
    -->
    <div v-for="step in steps" :key="step.id" class="doc-card">
      
      <!-- Título del paso individual -->
      <div class="card-header">
        <h2>{{ step.title }}</h2>
      </div>

      <!-- Área de la Imagen: Aquí se mostrará la captura de pantalla -->
      <div class="card-image">
        <img :src="step.image" :alt="step.title" />
      </div>

      <!-- Área de Texto: Aquí se muestran las instrucciones específicas -->
      <div class="card-content">
        <strong>Instrucciones:</strong>
        <p>{{ step.description }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Estilos para que se vea bonito y ordenado */

.doc-container {
  max-width: 800px; /* Ancho máximo para que no se estire demasiado en pantallas grandes */
  margin: 0 auto;   /* Centra el contenedor */
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #eee;
}

.doc-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden; /* Recorta la imagen si se sale de las esquinas redondeadas */
  margin-bottom: 40px; /* Espacio entre cada paso */
  box-shadow: 0 4px 10px rgba(0,0,0,0.05); /* Sombra suave */
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.card-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.card-image {
  background-color: #eee; /* Fondo gris por si la imagen tarda en cargar */
  text-align: center;
}

.card-image img {
  max-width: 100%; /* La imagen nunca será más ancha que la tarjeta */
  height: auto;
  display: block;
}

.card-content {
  padding: 20px;
  background-color: #fff;
}

.card-content p {
  margin-top: 5px;
  line-height: 1.6; /* Mejor lectura */
}

/* ---------- Estilos del botón "Menu" (azul) ----------
   Explicación paso a paso:
   - background-color: define el color de relleno del botón. Usamos
     un azul estándar `#007bff` para que coincida con otros botones.
   - color: color del texto; blanco para obtener buen contraste.
   - padding: espacio interno. `10px 20px` (vertical | horizontal)
     hace que el botón sea más grande y clicable.
   - border-radius: redondea las esquinas; 5px da un aspecto moderno.
   - text-decoration: none quita el subrayado que tienen los enlaces por defecto.
   - font-weight: 700 (negrita) destaca el texto dentro del botón.
   - transition: suaviza el cambio de color cuando el usuario pasa el cursor.
     `background-color .3s` tarda 0.3 segundos en completar la transición.
   - :hover: al pasar el cursor cambiamos el `background-color` a uno más oscuro
     (`#0056b3`), dando feedback visual inmediato.

   Interacciones:
   - El `padding` y `border-radius` afectan directamente la "zona clicable".
   - `background-color` + `color` determinan contraste y accesibilidad.
   - `transition` hace que el `:hover` sea menos brusco, mejorando la UX.
*/
.nav-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none; /* quitar subrayado de enlaces */
  font-weight: 700;
  transition: background-color .3s;
}
.nav-btn:hover {
  background-color: #0056b3;
}
</style>
