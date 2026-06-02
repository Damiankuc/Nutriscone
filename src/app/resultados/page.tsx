"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

type SurveyResponse = {
  id: string;
  color: number;
  aroma: number;
  sabor: number;
  textura: number;
  nivel_salado: number;
  sabor_garbanzo: number;
  aceptacion_global: number;
  consumiria_nuevamente: boolean;
  compraria_en_bar: boolean;
  cuanto_pagaria: number | null;
};

export default function Resultados() {
  const [data, setData] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: responses, error } = await supabase
        .from('survey_responses')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(responses as SurveyResponse[]);
      }
      setLoading(false);
    };

    fetchData();

    // Suscribirse a cambios en tiempo real (opcional)
    const channel = supabase
      .channel('public:survey_responses')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'survey_responses' }, payload => {
        setData(current => [...current, payload.new as SurveyResponse]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // fetchData se declara dentro del efecto para evitar acceder a la función antes de su definición.

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-2xl font-bold text-slate-800">Aún no hay respuestas</h2>
        <p className="text-slate-500 mt-2">Comparte el código QR para empezar a recibir datos.</p>
        <Link href="/" className="mt-8 text-emerald-600 font-medium hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  // --- Cálculos Estadísticos ---
  const total = data.length;

  const calculateAverage = (key: keyof SurveyResponse) => {
    const sum = data.reduce((acc, curr) => acc + (curr[key] as number), 0);
    return (sum / total).toFixed(2);
  };

  const promedios = {
    color: calculateAverage('color'),
    aroma: calculateAverage('aroma'),
    sabor: calculateAverage('sabor'),
    textura: calculateAverage('textura'),
    nivel_salado: calculateAverage('nivel_salado'),
    sabor_garbanzo: calculateAverage('sabor_garbanzo'),
    aceptacion_global: calculateAverage('aceptacion_global'),
  };

  const consumiriaSi = data.filter(r => r.consumiria_nuevamente).length;
  const consumiriaNo = total - consumiriaSi;

  // --- Cálculos para Cuánto Pagaría ---
  const cuantoPagariaValues = data
    .map(r => r.cuanto_pagaria)
    .filter((v): v is number => v !== null && v !== undefined && !isNaN(v));

  const minPagaria = cuantoPagariaValues.length > 0 ? Math.min(...cuantoPagariaValues) : 0;
  const maxPagaria = cuantoPagariaValues.length > 0 ? Math.max(...cuantoPagariaValues) : 0;

  let averagePagaria = 0;
  if (cuantoPagariaValues.length > 0) {
    // Filtrar outliers usando Rango Intercuartílico (IQR) para no romper el promedio
    const sorted = [...cuantoPagariaValues].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    
    // Rango aceptado
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    const filteredValues = sorted.filter(v => v >= lowerBound && v <= upperBound);
    const finalValues = filteredValues.length > 0 ? filteredValues : sorted;
    
    const sum = finalValues.reduce((acc, val) => acc + val, 0);
    averagePagaria = sum / finalValues.length;
  }

  // --- Configuraciones de Gráficos ---
  const barChartData = {
    labels: [
      'Color', 
      'Aroma', 
      'Sabor', 
      'Textura', 
      'Nivel de Sal', 
      'Sabor Garbanzo', 
      'Aceptación Global'
    ],
    datasets: [
      {
        label: 'Promedio de Evaluación (1 al 5)',
        data: [
          promedios.color,
          promedios.aroma,
          promedios.sabor,
          promedios.textura,
          promedios.nivel_salado,
          promedios.sabor_garbanzo,
          promedios.aceptacion_global,
        ],
        backgroundColor: 'rgba(52, 211, 153, 0.7)', // Emerald-400
        borderColor: 'rgba(16, 185, 129, 1)',       // Emerald-500
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const pieChartData = {
    labels: ['Sí, consumiría nuevamente', 'No consumiría'],
    datasets: [
      {
        data: [consumiriaSi, consumiriaNo],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)', // Emerald
          'rgba(244, 63, 94, 0.8)',  // Rose
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard de Resultados</h1>
            <p className="mt-2 text-lg text-slate-600">Análisis en tiempo real de los Scones de Garbanzo</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 text-center">
            <span className="block text-3xl font-black text-indigo-600">{total}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Respuestas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Gráfico de Barras - Promedios */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Promedios por Categoría</h2>
            <div className="h-80">
              <Bar 
                data={barChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true, max: 5 },
                  },
                  plugins: {
                    legend: { display: false }
                  }
                }} 
              />
            </div>
          </div>

          {/* Gráfico de Torta - Intención de Consumo */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">¿Consumiría Nuevamente?</h2>
            <div className="h-64 w-full flex justify-center">
              <Pie 
                data={pieChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
              />
            </div>
          </div>

        </div>

        {/* Sección de Precio Dispuesto a Pagar */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Análisis de Precio de Venta (Porción 3 scones)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 flex flex-col justify-center">
              <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Mínimo</span>
              <span className="text-3xl font-black text-slate-700">${minPagaria.toLocaleString('es-AR')}</span>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100 shadow-sm transform scale-105 flex flex-col justify-center">
              <span className="block text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">Promedio Estimado*</span>
              <span className="text-4xl font-black text-emerald-700">${Math.round(averagePagaria).toLocaleString('es-AR')}</span>
              <p className="text-xs text-emerald-500 mt-2">*Filtrando valores atípicos (outliers) extremos</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 flex flex-col justify-center">
              <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Máximo</span>
              <span className="text-3xl font-black text-slate-700">${maxPagaria.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors">
            <span className="mr-2">←</span> Volver al panel de control
          </Link>
        </div>
      </div>
    </div>
  );
}
