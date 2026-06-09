# Documentación del Proyecto: Nutriscone (Scones-Scoring)

**Asignatura:** Ingeniería de Software II  
**Carrera:** Ingeniería en Sistemas de Información  
**Institución:** Universidad Tecnológica Nacional (Sugerido)  
**Fecha:** 9 de Junio de 2026  

---

## Integrantes del Grupo
* Meza Santiago Exequiel (Backend Developer)
* Valentino Codermatz (Frontend Developer)
* Damian Caminos (Database)
* Francisco Sosa (Tester)

---

## 1. Introducción
El proyecto Nutriscone (Scones-Scoring) surge como una solución tecnológica para la recolección y análisis de datos en eventos de evaluación sensorial (degustaciones). Tradicionalmente, la recolección de datos en estas actividades se realiza de forma manual o mediante herramientas genéricas que no ofrecen retroalimentación en tiempo real ni integración directa con procesos de análisis estadístico. Nutriscone resuelve esta problemática mediante una plataforma web full-stack que facilita la captura de respuestas a través de códigos QR y la visualización instantánea de resultados en un dashboard dinámico.

## 2. Descripción del Proyecto
Scones-Scoring es una aplicación diseñada para optimizar la experiencia de usuario tanto para el encuestado como para el analista. La aplicación permite generar códigos QR que dirigen a los usuarios a un formulario de evaluación sensorial optimizado para dispositivos móviles. Los datos recolectados se almacenan de forma segura en una base de datos serverless y se procesan para mostrar promedios, tendencias y distribuciones en un panel de control accesible para los organizadores.

### 2.1. Objetivos del Sistema
*   **Facilitar el acceso:** Eliminar barreras de entrada mediante el uso de códigos QR.
*   **Optimizar la recolección:** Ofrecer una interfaz intuitiva y rápida para la carga de datos sensoriales.
*   **Visualización en tiempo real:** Proporcionar herramientas gráficas para el análisis inmediato de los resultados.
*   **Garantizar la integridad:** Asegurar que los datos se almacenen de forma persistente y bajo normativas de seguridad.

## 3. Requerimientos del Sistema

### 3.1. Requerimientos Funcionales (RF)
El sistema cumple con los siguientes requerimientos clave:
*   **RF01 (Acceso QR):** Generación de códigos QR dinámicos para acceso a la encuesta.
*   **RF02 (Interfaz Mobile):** Diseño adaptativo para dispositivos móviles.
*   **RF03 (Evaluación Sensorial):** Captura de datos sobre sabor, olor, textura y apariencia.
*   **RF04 (Persistencia):** Almacenamiento en base de datos PostgreSQL (vía Supabase).
*   **RF06 (Dashboard Realtime):** Actualización automática de estadísticas mediante WebSockets/Realtime.
*   **RF07 (Contador de Respuestas):** Visualización del volumen total de datos recolectados.

### 3.2. Requerimientos No Funcionales (RNF)
*   **RNF01 (Responsive):** Uso de Tailwind CSS v4 para garantizar compatibilidad con múltiples pantallas.
*   **RNF04 (Usabilidad):** Flujo de usuario simplificado para minimizar el tiempo de respuesta.
*   **RNF06 (Seguridad):** Implementación de Row Level Security (RLS) en la base de datos.
*   **RNF09 (Arquitectura):** Estructura modular basada en Next.js App Router.

## 4. Arquitectura y Tecnologías
La solución adopta una arquitectura de aplicaciones web modernas con un enfoque serverless y de componentes.

*   **Frontend:**
    *   **Next.js 16.2 & React 19:** Framework de última generación para renderizado eficiente y componentes de servidor.
    *   **Tailwind CSS v4:** Framework de estilos utility-first para un diseño moderno y fluido.
    *   **Chart.js:** Biblioteca para la generación de gráficos estadísticos dinámicos.
*   **Backend & Persistencia:**
    *   **Supabase (PostgreSQL):** Plataforma Backend-as-a-Service que provee la base de datos, autenticación y capacidades en tiempo real.
    *   **TypeScript:** Garantiza la seguridad de tipos en todo el ciclo de desarrollo.
*   **Infraestructura & DevOps:**
    *   **Docker:** El proyecto cuenta con soporte para contenedores, facilitando el despliegue en cualquier entorno.
    *   **Playwright:** Suite de pruebas End-to-End para asegurar la calidad del flujo crítico.
    *   **k6:** Herramienta de pruebas de carga para validar la escalabilidad del sistema.

## 5. Implementación y Desarrollo
El desarrollo se ha llevado a cabo siguiendo principios de agilidad y modularidad. La estructura del proyecto está organizada de la siguiente manera:
*   `src/app/`: Contiene las rutas y componentes de la aplicación (Home, Encuesta, Resultados).
*   `src/lib/`: Lógica compartida y configuración de clientes de servicios (Supabase).
*   `migrations/`: Scripts SQL para la evolución del esquema de datos.
*   `tests/`: Casos de prueba automatizados.

## 6. Pruebas y Performance
Se han establecido protocolos de validación rigurosos:
*   **Pruebas E2E:** Verificación de que el flujo desde el escaneo del QR hasta la visualización en el dashboard funciona sin errores.
*   **Auditorías de Performance:** Uso de Lighthouse para garantizar tiempos de carga óptimos (< 3s) y accesibilidad.
*   **Pruebas de Carga:** Simulación de usuarios simultáneos para garantizar la estabilidad durante eventos de alta concurrencia.

## 7. Conclusión
Nutriscone representa una modernización necesaria en los procesos de evaluación sensorial. Gracias al uso de tecnologías de vanguardia como Next.js y Supabase, el sistema ofrece una experiencia de usuario fluida, segura y escalable. El cumplimiento del 70% de los requerimientos iniciales en la fase actual demuestra la viabilidad técnica del proyecto y establece una base sólida para futuras expansiones, como la gestión de múltiples encuestas y la personalización dinámica de preguntas.

---
**Firmado:**  
Grupo de Ingeniería de Software II  
Ingeniería en Sistemas de Información  
9 de Junio de 2026
