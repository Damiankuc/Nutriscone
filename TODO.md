# TODO - Sprint 1 (Mejoras rápidas)

## Sprint 1 objetivo
Dejar el proyecto más “production-ready” con: RF08 (comentarios), RNF10 (Docker/compose), y evidencia de performance (RNF02/RNF03).

---

## Tarea 1 — RF08 Comentarios opcionales
- [ ] Actualizar `supabase_setup.sql` agregando columna `comentarios TEXT` a `survey_responses`
- [ ] (si aplica) Ajustar RLS/policies para que el insert/select siga funcionando
- [ ] Verificar que `src/app/encuesta/page.tsx` inserta en la columna existente

## Tarea 2 — RNF10 Docker reproducible
- [ ] Crear/ajustar `docker-compose.yml` para levantar el servicio con variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Actualizar `README.md` con pasos build/run y variables necesarias
- [ ] Confirmar que `docker compose up --build` levanta Next.js en el puerto 3000

## Tarea 3 — Validación performance (RNF02/RNF03)
- [ ] Ajustar/documentar `scripts/lighthouse.sh` para que deje el output en carpeta report y sea ejecutable
- [ ] Ajustar `k6-loadtest.js` para no depender de auth no existente (o documentar env var required)
- [ ] Agregar scripts npm o comandos documentados para correr lighthouse y k6
- [ ] Ejecutar en local y dejar evidencia (carpetas `lighthouse-report/`, resultados del k6)

---

## Criterios de aceptación Sprint 1
- [ ] El insert de encuesta incluye comentarios sin fallar (sin error por columna inexistente)
- [ ] Existe un flujo docker reproducible (build/run) documentado
- [ ] Hay evidencia de performance (aunque sea preliminar) con lighthouse y/o k6

