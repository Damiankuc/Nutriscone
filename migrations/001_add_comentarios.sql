-- Script de Migración - Agregar campo de comentarios
-- Ejecuta este script en el SQL Editor de Supabase

ALTER TABLE public.survey_responses
ADD COLUMN comentarios TEXT;

-- Verificación (opcional)
-- SELECT * FROM public.survey_responses LIMIT 1;
