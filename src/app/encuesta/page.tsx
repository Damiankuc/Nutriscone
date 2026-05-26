"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

const QUESTIONS = [
  { id: 'color', label: '1. ¿Cómo considera el color del producto?', scale: ['Muy desagradable', 'Desagradable', 'Neutro', 'Agradable', 'Muy agradable'] },
  { id: 'aroma', label: '2. ¿Cómo considera el aroma?', scale: ['Muy débil', 'Débil', 'Moderado', 'Intenso', 'Muy intenso'] },
  { id: 'sabor', label: '3. ¿Cómo considera el sabor?', scale: ['Muy desagradable', 'Desagradable', 'Neutro', 'Agradable', 'Muy agradable'] },
  { id: 'textura', label: '4. ¿Cómo percibe la textura?', scale: ['Muy seca/dura', 'Poco agradable', 'Intermedia', 'Suave y agradable', 'Muy suave y húmeda'] },
  { id: 'nivel_salado', label: '5. ¿Cómo considera el nivel de salado?', scale: ['Muy bajo', 'Bajo', 'Adecuado', 'Alto', 'Muy alto'] },
  { id: 'sabor_garbanzo', label: '6. ¿Cómo considera el sabor a garbanzo?', scale: ['Muy débil', 'Débil', 'Moderado', 'Intenso', 'Muy intenso'] },
  { id: 'aceptacion_global', label: '7. ¿Cómo considera la aceptación global del producto?', scale: ['Me disgusta mucho', 'Me disgusta', 'Ni me gusta ni me disgusta', 'Me gusta', 'Me gusta mucho'] },
];

export default function Encuesta() {
  const [formData, setFormData] = useState<Record<string, number | null | boolean | string>>({
    color: null,
    aroma: null,
    sabor: null,
    textura: null,
    nivel_salado: null,
    sabor_garbanzo: null,
    aceptacion_global: null,
    consumiria_nuevamente: null,
    comentarios: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (field: string, value: number | boolean | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que todas las preguntas fueron respondidas (comentarios es opcional)
    const requiredFields = ['color', 'aroma', 'sabor', 'textura', 'nivel_salado', 'sabor_garbanzo', 'aceptacion_global', 'consumiria_nuevamente'];
    const isComplete = requiredFields.every(field => formData[field] !== null);
    if (!isComplete) {
      setErrorMessage('Por favor, completa todas las preguntas antes de enviar.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Limitar comentarios a 500 caracteres
      const dataToInsert = {
        ...formData,
        comentarios: (formData.comentarios as string).substring(0, 500) || null,
      };

      const { error } = await supabase
        .from('survey_responses')
        .insert([dataToInsert]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Ocurrió un error al enviar la encuesta.';
      setErrorMessage(message);
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">¡Gracias por participar!</h2>
          <p className="text-slate-600 text-lg">Tus respuestas han sido registradas exitosamente y nos ayudarán a mejorar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Evaluación de Producto</h1>
          <p className="text-lg text-slate-600">Scones de Garbanzo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="bg-white rounded-3xl shadow-md p-8 transition hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">{q.label}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {q.scale.map((label, index) => {
                  const value = index + 1;
                  const isSelected = formData[q.id] === value;
                  return (
                    <label 
                      key={value}
                      className={`
                        relative flex flex-col items-center p-4 cursor-pointer rounded-2xl border-2 transition-all
                        ${isSelected ? 'border-indigo-600 bg-indigo-50 shadow-md transform scale-105' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'}
                      `}
                    >
                      <input 
                        type="radio" 
                        name={q.id} 
                        value={value}
                        className="sr-only"
                        onChange={() => handleChange(q.id, value)}
                      />
                      <span className="text-2xl font-bold mb-2 text-slate-700">{value}</span>
                      <span className="text-xs text-center font-medium text-slate-500 leading-tight">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Pregunta 8 - Boolean */}
          <div className="bg-white rounded-3xl shadow-md p-8 transition hover:shadow-lg">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">8. ¿Consumiría nuevamente este producto?</h3>
            <div className="grid grid-cols-2 gap-4">
              <label 
                className={`
                  relative flex items-center justify-center p-4 cursor-pointer rounded-2xl border-2 transition-all
                  ${formData.consumiria_nuevamente === true ? 'border-emerald-500 bg-emerald-50 shadow-md transform scale-105' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'}
                `}
              >
                <input 
                  type="radio" 
                  name="consumiria_nuevamente" 
                  className="sr-only"
                  onChange={() => handleChange('consumiria_nuevamente', true)}
                />
                <span className={`text-lg font-bold ${formData.consumiria_nuevamente === true ? 'text-emerald-700' : 'text-slate-700'}`}>Sí</span>
              </label>
              
              <label 
                className={`
                  relative flex items-center justify-center p-4 cursor-pointer rounded-2xl border-2 transition-all
                  ${formData.consumiria_nuevamente === false ? 'border-rose-500 bg-rose-50 shadow-md transform scale-105' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'}
                `}
              >
                <input 
                  type="radio" 
                  name="consumiria_nuevamente" 
                  className="sr-only"
                  onChange={() => handleChange('consumiria_nuevamente', false)}
                />
                <span className={`text-lg font-bold ${formData.consumiria_nuevamente === false ? 'text-rose-700' : 'text-slate-700'}`}>No</span>
              </label>
            </div>
          </div>

          {/* Comentarios Opcionales */}
          <div className="bg-white rounded-3xl shadow-md p-8 transition hover:shadow-lg">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">9. Comentarios (Opcional)</h3>
            <p className="text-slate-600 text-sm mb-4">¿Hay algo adicional que quieras comentar sobre el producto?</p>
            <textarea
              value={formData.comentarios as string}
              onChange={(e) => handleChange('comentarios', e.target.value)}
              placeholder="Comparte tus opiniones, sugerencias o comentarios..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-slate-800 placeholder-slate-400 resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">Máximo 500 caracteres</p>
          </div>

          {errorMessage && (
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl">
              <p className="text-rose-700 font-medium">{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-center pt-6 pb-12">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`
                px-10 py-4 rounded-xl text-white font-bold text-lg shadow-xl transition-all
                ${status === 'submitting' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-1'}
              `}
            >
              {status === 'submitting' ? 'Enviando...' : 'Enviar Respuestas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
