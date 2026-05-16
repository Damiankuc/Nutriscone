# Scones-Scoring 📊

Este proyecto es un trabajo práctico universitario. Se trata de una aplicación web para el análisis, gestión y visualización de datos, construida con tecnologías web modernas y orientada a la calidad y el rendimiento.

## 🚀 Tecnologías Utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) (App Router) y [React](https://reactjs.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos & Backend:** [Supabase](https://supabase.com/)
- **Visualización de Datos:** [Chart.js](https://www.chartjs.org/) y [react-chartjs-2](https://react-chartjs-2.js.org/) (Gráficos de torta y barras)
- **Testing (E2E):** [Playwright](https://playwright.dev/)

## 📋 Requisitos Previos

Asegúrate de tener instalado en tu sistema:
- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- Un gestor de paquetes como `npm` (viene con Node.js)

## 🛠️ Instalación y Configuración Local

Sigue estos pasos para levantar el entorno de desarrollo localmente:

1. **Clonar el repositorio** (Si aplica)
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Scones-Scoring
   ```

2. **Instalar las dependencias del proyecto**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**
   - El proyecto necesita conectarse a una base de datos de Supabase.
   - Crea o edita el archivo `.env.local` en la raíz del proyecto y añade tus credenciales:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
     ```

4. **Instalar navegadores para Playwright** (Necesario para correr los tests)
   ```bash
   npx playwright install --with-deps
   ```

## 💻 Servidor de Desarrollo

Para iniciar el servidor de desarrollo en tu máquina, ejecuta:

```bash
npm run dev
```

Luego, abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación. La página principal se encuentra y se puede editar en `src/app/page.tsx`.

## 🧪 Testing Automatizado

Este proyecto utiliza Playwright para asegurar que los flujos principales de la aplicación funcionen correctamente simulando el uso de un usuario real. 

Para ejecutar los tests en segundo plano (headless):

```bash
npx playwright test
```

Para ver el reporte HTML detallado generado tras los tests:

```bash
npx playwright show-report
```

## 👥 Equipo / Autores
- **[Tu Nombre / Nombres de los integrantes]**
- *Materia / Proyecto Universitario*
