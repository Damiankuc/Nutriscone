import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up a 10 usuarios
    { duration: '1m', target: 50 },    // Ramp up a 50 usuarios
    { duration: '30s', target: 100 },  // Ramp up a 100 usuarios (carga máxima)
    { duration: '1m', target: 100 },   // Mantener carga máxima
    { duration: '30s', target: 0 },    // Ramp down
  ],
  thresholds: {
    // 95% de las solicitudes deben ser < 500ms
    'http_req_duration': ['p(95)<500'],
    // Tasa de error < 1%
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () {
  // Test 1: Cargar página principal
  const mainPageRes = http.get('http://localhost:3000');
  check(mainPageRes, {
    'Página principal carga correctamente': (r) => r.status === 200,
    'Tiempo respuesta < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);

  // Test 2: Cargar página de encuesta
  const surveyPageRes = http.get('http://localhost:3000/encuesta');
  check(surveyPageRes, {
    'Página encuesta carga correctamente': (r) => r.status === 200,
    'Tiempo respuesta encuesta < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);

  // Test 3: Cargar página de resultados
  const resultsPageRes = http.get('http://localhost:3000/resultados');
  check(resultsPageRes, {
    'Página resultados carga correctamente': (r) => r.status === 200,
    'Tiempo respuesta resultados < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);

  // Test 4: Simular inserción de datos
  const payload = JSON.stringify({
    color: 4,
    aroma: 5,
    sabor: 4,
    textura: 3,
    nivel_salado: 3,
    sabor_garbanzo: 4,
    aceptacion_global: 4,
    consumiria_nuevamente: true,
    comentarios: 'Excelente producto',
  });

  const insertRes = http.post(
    'https://lvkyswpprxoqymhicepq.supabase.co/rest/v1/survey_responses',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${__ENV.SUPABASE_KEY}`,
        'Prefer': 'return=representation',
      },
    }
  );

  check(insertRes, {
    'Inserción exitosa': (r) => r.status === 201 || r.status === 200,
  });

  sleep(2);
}
