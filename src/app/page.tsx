"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';


export default function Home() {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Obtenemos la URL actual para que los QR funcionen dinámicamente
    // ya sea en localhost o cuando esté desplegado.
    queueMicrotask(() => {
      if (typeof window !== 'undefined' && window.location?.origin) {
        setBaseUrl(window.location.origin);
      }
    });
  }, []);

  if (!baseUrl) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-12 text-center">
        <div>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            Scones-Scoring <span className="text-indigo-600">Hub</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Panel central para la evaluación sensorial de scones de garbanzo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* QR Encuesta */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              📝 Encuesta
            </h2>
            <div className="bg-slate-100 p-6 rounded-2xl mb-8">
              <QRCode value={`${baseUrl}/encuesta`} size={220} bgColor="transparent" fgColor="#1e293b" />
            </div>
            <p className="text-slate-600 mb-8 text-center text-lg leading-relaxed">
              Comparte este código con los consumidores para que evalúen el producto desde sus dispositivos.
            </p>
            <Link 
              href="/encuesta" 
              className="mt-auto w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Simular Encuesta
            </Link>
          </div>

          {/* QR Resultados */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              📊 Resultados
            </h2>
            <div className="bg-slate-100 p-6 rounded-2xl mb-8">
              <QRCode value={`${baseUrl}/resultados`} size={220} bgColor="transparent" fgColor="#1e293b" />
            </div>
            <p className="text-slate-600 mb-8 text-center text-lg leading-relaxed">
              Escanea para ver las analíticas y gráficos en tiempo real con todas las respuestas recopiladas.
            </p>
            <Link 
              href="/resultados" 
              className="mt-auto w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
              Ver Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
