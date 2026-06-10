"use client";
import Link from 'next/link';
import { FiEdit, FiBarChart } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF4E4] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-12 text-center">
        <div>
          <img
            src="/logo_Nutriscone.jpeg"
            alt="Nutriscone Logo"
            className="mx-auto mb-10 max-h-56 w-auto rounded-3xl shadow-2xl"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.svg'; }}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Encuesta */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <FiEdit className="w-6 h-6 text-brand" /> Encuesta
            </h2>
            <Link 
              href="/encuesta" 
              className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl btn-brand btn-hover-opacity transition-colors shadow-lg shadow-brand"
            >
              Realizar encuesta
            </Link>
            <p className="mt-4 text-sm text-slate-600 text-center">
              Te llevará menos de 3 minutos
            </p>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <FiBarChart className="w-6 h-6 text-accent" /> Resultados
            </h2>
            <Link 
              href="/resultados" 
              className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl btn-accent btn-hover-opacity transition-colors shadow-lg shadow-accent"
            >
              Ver Dashboard
            </Link>
            <p className="mt-4 text-sm text-slate-600 text-center">
              Conoce los resultados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
