# Documentación Técnica del Proyecto: Infraestructura y Servidores (LEO)

Este documento constituye la referencia técnica definitiva del proyecto. Detalla la arquitectura de la aplicación Vue.js, la lógica de enrutamiento, la estructura de directorios y el estado actual de la documentación de la infraestructura de servidores de Fundacite Sucre.

## 1. Arquitectura y Flujo de Navegación

La aplicación funciona como una SPA (Single Page Application) construida con **Vue 3 (Composition API)** y **Vite**. El flujo de navegación está centralizado en el enrutador y se distribuye jerárquicamente.

### Diagrama de Flujo (User Journey)

```mermaid
graph TD
    A[Inicio /] -->|Menu.vue| B(Dashboard Principal)
    B --> C{Selección de Módulo}
    
    C -->|Ruta: /Servidores| D[Dashboard Servidores]
    C -->|Ruta: /system| E[Plan de Contingencia]
    C -->|Ruta: /doc-interna| F[Documentación Interna]
    C -->|Ruta: /doc-usuario| G[Documentación Usuario]
    C -->|Ruta: /modulos| N[Gestión de Módulos]

    subgraph Módulo Servidores
    D --> H[Platon Documentation]
    D --> I[Copernico Documentation]
    D --> J[Aristoteles Documentation]
    D --> K[Newton Documentation]
    D --> L[Darwin Documentation]
    D --> M[Galileo Documentation]
    end
    
    subgraph Módulos (Inventario y Utilitarios)
    N --> O[Inventario Equipos de Oficina]
    N --> P[Inventario Pantallas]
    N --> Q[Inventario Impresoras]
    N --> R[UID Usuario]
    N --> S[Comprimir y OpenW]
    N --> T[Redimensionar Disco Clonezilla]
    end

    subgraph Detalles Técnicos
    H --> H1(DHCP / PXE / LDAP / Jabber)
    I --> I1(CUPS / NTP / Firewall)
    J --> J1(Gateway / IPTables / DHCP)
    E --> E1(Galería secuencial 23 pasos)
    end
```

## 2. Estructura de Carpetas y Propósito

A continuación se detalla la función técnica de cada directorio crítico en el proyecto:

*   **`/src/components/`**: Contiene la lógica de vista y componentes Vue.
    *   `Menu.vue`: Landing page del dashboard. Define los accesos principales.
    *   `SystemDocumentation.vue`: Lógica para el Plan de Contingencia (array reactivo de pasos).
    *   `PlatonDocumentation.vue`: Componente monolítico para el servidor Platon.
*   **`/src/components/Servidores/`**: Submódulo específico para la infraestructura.
    *   `servidores.vue`: Panel de control secundario. Contiene el array `quickRoutes` que actúa como despachador hacia los servidores individuales.
    *   `copernico.vue`: Implementa lógica avanzada de pestañas (`activeTab`) y generación dinámica de pasos (`generateCupsSteps`) para manejar grandes volúmenes de imágenes de CUPS.
    *   `aristoteles.vue`: Documentación basada en extracción de configuraciones crudas (`sections`).
    *   `newton.vue`: Componente interactivo con pestañas para DNS Master, BD y Proxy Squid.
    *   `darwin.vue`: Componente interactivo para Web Interno y Entorno de Pruebas.
    *   `galileo.vue`: Componente interactivo para configuración NFS y Respaldos.
*   **`/src/components/Modulos/`**: **(Nuevo)** Submódulo para inventario físico y utilitarios técnicos.
    *   `InventarioEquiposDeOficina.vue`: Control general de bienes institucionales.
    *   `Pantallas.vue`: Inventario específico de monitores.
    *   `Impresoras.vue`: Inventario y control de consumibles.
    *   `UIDUsuario.vue`: Gestión y consulta de UIDs de usuarios.
    *   `ComprimirOpenW.vue`: Guías y utilitarios de compresión/OpenW.
    *   `Clonezilla.vue`: Guía de redimensionamiento de discos.
*   **`/public/`**: Almacén de activos estáticos. **Crítico**: La estructura interna debe coincidir exactamente con las rutas definidas en los archivos `.vue`.
    *   `/Plan de contingencia/`: Imágenes secuenciales `1.png` a `23.png`.
    *   `/Copernico/`:
        *   `/CUPS/`: Imágenes `cups-00.png` hasta `cups-34.png`.
        *   `/NTP/`: Imágenes de configuración de tiempo.
        *   `/Configuracion copernico/`: Capturas generales.
    *   `/Platon/`: Imágenes de soporte para servicios (Ejabberd, etc.).
    *   `/Modulos/Inventario/`: Imágenes de referencia y recursos para inventario.

## 3. Lógica de Enrutamiento (`router.js`)

Aunque el archivo `router.js` (o `router/index.js`) gestiona la navegación, su lógica se infiere de los componentes desarrollados. Es la columna vertebral que mapea las URLs del navegador a los componentes de Vue.

**Mapa de Rutas Configurado (Inferred):**
| Ruta (Path) | Componente Destino | Descripción Técnica |
| :--- | :--- | :--- |
| `/` | `Menu.vue` | Home / Dashboard Principal. |
| `/Servidores` | `Servidores/servidores.vue` | Dashboard de selección de servidor. |
| `/system` | `SystemDocumentation.vue` | Visor del Plan de Contingencia. |
| `/platon` | `PlatonDocumentation.vue` | Documentación del servidor Core/DHCP. |
| `/copernico` | `Servidores/copernico.vue` | Documentación de Impresión/NTP. |
| `/aristoteles` | `Servidores/aristoteles.vue` | Documentación de Gateway/Firewall. |
| `/newton` | `Servidores/newton.vue` | Servidor de BD, DNS Master y Proxy. |
| `/darwin` | `Servidores/darwin.vue` | Servidor de Pruebas y Web Interno. |
| `/galileo` | `Servidores/galileo.vue` | Servidor de Archivos/NFS y Respaldos. |
| `/inventario-oficina` | `Modulos/InventarioEquiposDeOficina.vue` | Inventario general de equipos institucionales. |
| `/pantallas` | `Modulos/Pantallas.vue` | Gestión e inventario de monitores. |
| `/impresoras` | `Modulos/Impresoras.vue` | Gestión e inventario de impresoras. |
| `/uid-usuario` | `Modulos/UIDUsuario.vue` | Consulta de identificadores de usuario (UID). |
| `/comprimir-openw` | `Modulos/ComprimirOpenW.vue` | Utilidades de compresión y OpenW. |
| `/clonezilla` | `Modulos/Clonezilla.vue` | Procedimientos de redimensionamiento de discos. |

## 4. Detalle Técnico de Servidores Implementados

### A. Servidor COPERNICO (`172.17.2.9`)
Este componente (`copernico.vue`) destaca por su complejidad en la gestión de UI:
*   **Sistema de Pestañas**: Utiliza un estado reactivo (`ref('Configuracion copernico')`) para cambiar vistas sin recargar.
*   **Generador de Pasos CUPS**: Una función `generateCupsSteps()` crea dinámicamente 35 objetos de configuración para evitar código repetitivo, enlazando imágenes desde `/public/Copernico/CUPS/cups-XX.png`.
*   **Servicios Documentados**:
    1.  **CUPS**: Configuración de `cupsd.conf`, permisos `<Location>`, puerto 631.
    2.  **NTP**: Sincronización con `pool.ntp.org` y restricción de red `restrict 172.17.2.0`.
    3.  **Firewall**: Script `/root/firewall.sh` específico para permitir tráfico UDP/123 y TCP/631.

### B. Servidor ARISTOTELES (`172.17.2.12`)
Este servidor actúa como el perímetro de la red interna. Documentado en `aristoteles.vue`.
*   **Topología de Red**:
    *   `eth0`: WAN/LAN Principal (172.17.2.x).
    *   `eth1`: Red Academia (10.0.0.x).
    *   `eth2`: Red Desarrollo/Wifi (10.3.3.x).
*   **Configuración Crítica**:
    *   **IPTables (NAT/DNAT)**: El script documentado realiza **SNAT** (Enmascaramiento) para dar salida a internet a las subredes y **DNAT** (Port Forwarding) para redirigir peticiones DNS (53), Web (80) y Proxy (3128) hacia los servidores internos correspondientes.
    *   **DHCP Multisubred**: Configuración compleja de `dhcpd.conf` manejando múltiples declaraciones `subnet` y `host` estáticos (ej. laptops, puntos de acceso).

### C. Servidor PLATON (`172.17.2.3`)
El corazón de la infraestructura lógica. Documentado en `PlatonDocumentation.vue`.
*   **Netboot / PXE**: Documentación del script PHP (`boot.php`) que intercepta peticiones iPXE para servir menús de arranque (HDD Regenerator, DRBL, Live Distros).
*   **Servicios Core**:
    *   **OpenLDAP**: Backend de usuarios.
    *   **Ejabberd (XMPP)**: Configuración YAML detallada, integración con LDAP y módulos de administración web (puerto 5280).
    *   **NFS**: Exportación de `/var/www/html/netboot` para clientes diskless.

### D. Servidores NEWTON, DARWIN y GALILEO
Implementados recientemente siguiendo el estándar de UI interactiva (pestañas, edición en vivo y resaltado de sintaxis):
*   **NEWTON (`172.17.2.4`)**: Documenta configuraciones de Bind9 (Zonas directa/inversa), escucha de red para bases de datos relacionales y Listas de Control de Acceso (ACLs) para Squid Proxy.
*   **DARWIN (`172.17.2.6`)**: Documenta VirtualHosts de Apache, entornos Docker Compose para staging y tareas Cron de mantenimiento.
*   **GALILEO (`172.17.2.10`)**: Documenta configuraciones de `/etc/exports` para NFS, montaje persistente en `/etc/fstab` y scripts de sincronización (`rsync`) de respaldos.

## 5. Plan de Contingencia (Recuperación de Desastres)
El módulo `SystemDocumentation.vue` implementa una galería secuencial de **23 pasos críticos**.
*   **Técnica**: Array de objetos en Javascript.
*   **Recurso**: Carpeta `/Plan de contingencia/`.
*   **Objetivo**: Guía visual a prueba de fallos para restaurar servicios en caso de catástrofe.

## 6. Características de Desarrollo (Vue.js)
El proyecto utiliza patrones modernos de desarrollo frontend:
*   **Highlight.js**: Integración de librería para coloreado de sintaxis en bloques de código (`bash`, `apache`, `xml`).
*   **Clipboard API**: Funcionalidad nativa asíncrona (`navigator.clipboard.writeText`) para botones de "Copiar código".
*   **Edición en Vivo**: Los bloques `<textarea>` enlazados con `v-model` permiten a los administradores editar las configuraciones en pantalla antes de copiarlas, facilitando adaptaciones rápidas.

## 7. Checklist de Servidores Pendientes (GAP Analysis)

Gran parte de la deuda técnica de documentación ha sido cubierta. Estado actual de los nodos:

| Servidor | IP (Ref) | Rol Esperado | Estado Documental |
| :--- | :--- | :--- | :--- |
| **NEWTON** | `172.17.2.4` | DNS Master, Base de Datos, Proxy Squid. | 🟢 Listo (Estructura creada) |
| **DARWIN** | `172.17.2.6` | Servidor Web Interno, Pruebas. | 🟢 Listo (Estructura creada) |
| **GALILEO** | `172.17.2.10` | Almacenamiento Masivo, NFS Backup. | 🟢 Listo (Estructura creada) |
| **SOCRATES** | `172.17.2.11` | DNS Esclavo, Servicios Auxiliares. | 🔴 Pendiente (Mencionado en DNS) |

## 8. Checklist de Módulos (Documentación Interna)

La sección de Documentación Interna actúa como un panel de utilitarios e inventarios. Estado actual de su desarrollo:

| Módulo | Componente Planificado | Estado Documental |
| :--- | :--- | :--- |
| **Dashboard Interno** | `DocumentacionInterna.vue` | 🟢 Listo |
| **Equipos de Oficina** | `InventarioEquiposDeOficina.vue` | 🟢 Listo (Esqueleto creado) |
| **Pantallas** | `Pantallas.vue` | 🔴 Pendiente |
| **Impresoras** | `Impresoras.vue` | 🔴 Pendiente |
| **UID Usuario** | `UIDUsuario.vue` | 🔴 Pendiente |
| **Comprimir y OpenW** | `ComprimirOpenW.vue` | 🔴 Pendiente |
| **Clonezilla** | `Clonezilla.vue` | 🔴 Pendiente |

## 9. Próximos Pasos Recomendados (Para continuar luego)
1.  **Desarrollar Módulos de Inventario**: Crear `Pantallas.vue` e `Impresoras.vue` en la carpeta `Documentacion_interna/` utilizando una estructura de tabla similar a la de equipos de oficina.
2.  **Desarrollar Utilitarios**: Crear las plantillas para `UIDUsuario.vue`, `ComprimirOpenW.vue` y `Clonezilla.vue`.
3.  **Actualizar `router.js`**: Ir registrando las nuevas rutas a medida que se vayan creando estos archivos.
4.  **Crear `socrates.vue`**: Finalizar la deuda técnica de los servidores completando el nodo SOCRATES.
