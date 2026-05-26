#!/bin/bash
# Script para ejecutar Lighthouse audit en la aplicación

echo "🔍 Instalando Lighthouse CLI..."
npm install -g @lhci/cli@latest lighthouse

echo "⏳ Esperando que el servidor esté listo..."
sleep 5

echo "📊 Ejecutando Lighthouse audit en http://localhost:3000..."
lighthouse \
  http://localhost:3000 \
  --output=json \
  --output=html \
  --output-path=./lighthouse-report

echo ""
echo "✅ Lighthouse audit completado!"
echo "📄 Reporte disponible en: lighthouse-report.html"
echo ""
echo "Resultados principales:"
lighthouse \
  http://localhost:3000 \
  --output=json \
  --quiet | jq '.categories | {performance: .performance.score, accessibility: .accessibility.score, "best-practices": ."best-practices".score, seo: .seo.score}'
