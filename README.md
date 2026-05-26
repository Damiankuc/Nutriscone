This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:


```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Docker (RNF10)

### Requisitos
- Tener configuradas las variables de entorno de Supabase.

### Ejecutar
1) Copiar variables:

```bash
copy .env.example .env
```

2) Levantar la app:

```bash
docker compose up --build
```

La aplicación queda disponible en: http://localhost:3000

## Performance (RNF02 / RNF03)

### Lighthouse
```bash
./scripts/lighthouse.sh
```

El reporte HTML queda en `lighthouse-report/`.

### Load test con k6
Asegurate de tener k6 instalado y ejecutar:

```bash
k6 run k6-loadtest.js
```

Nota: el script asume un endpoint de Supabase. Si tu entorno requiere auth, ajusta el payload/headers.

## Learn More


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
