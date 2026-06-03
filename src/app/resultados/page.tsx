"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiInbox, FiChevronLeft } from 'react-icons/fi';
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="mb-4"><FiInbox className="w-12 h-12 text-slate-400" /></div>
        <h2 className="text-2xl font-bold text-slate-800">Aún no hay respuestas</h2>
        <p className="text-slate-500 mt-2">Comparte la URL /encuesta para empezar a recibir datos.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-accent font-medium hover:underline"><FiChevronLeft className="w-4 h-4" /> Volver al inicio</Link>
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
            <span className="block text-3xl font-black text-brand">{total}</span>
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

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors">
            <span className="mr-2">←</span> Volver al panel de control
          </Link>
        </div>
      </div>
    </div>
  );
}
