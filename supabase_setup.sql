-- SQL Script for Scones-Scoring
-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase

create table public.survey_responses (
  id uuid default gen_random_uuid() primary key,
  color integer not null check (color >= 1 and color <= 5),
  aroma integer not null check (aroma >= 1 and aroma <= 5),
  sabor integer not null check (sabor >= 1 and sabor <= 5),
  textura integer not null check (textura >= 1 and textura <= 5),
  nivel_salado integer not null check (nivel_salado >= 1 and nivel_salado <= 5),
  sabor_garbanzo integer not null check (sabor_garbanzo >= 1 and sabor_garbanzo <= 5),
  aceptacion_global integer not null check (aceptacion_global >= 1 and aceptacion_global <= 5),
  consumiria_nuevamente boolean not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Seguridad a Nivel de Fila (RLS)
alter table public.survey_responses enable row level security;

-- Permitir a cualquier usuario anónimo INSERTAR respuestas (para la encuesta)
create policy "Permitir inserts anónimos" 
  on public.survey_responses for insert 
  with check (true);

-- Permitir a cualquier usuario anónimo LEER respuestas (para el Dashboard de resultados)
create policy "Permitir select público" 
  on public.survey_responses for select 
  using (true);
