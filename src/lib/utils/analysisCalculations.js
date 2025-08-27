import React from 'react';
import { quantumQuestions } from '@/lib/config/quantumQuestions.js';

export const calculateQuantumResults = (answers) => {
  const results = { categories: {}, recommendations: [] };
  const categoryScores = {};

  Object.keys(quantumQuestions).forEach(category => {
    let totalScore = 0;
    let questionCount = 0;
    quantumQuestions[category].forEach(q => {
      const answerValue = parseInt(answers[q.id], 10);
      if (!isNaN(answerValue)) {
        totalScore += answerValue;
        questionCount++;
      }
    });
    if (questionCount > 0) {
      categoryScores[category] = (totalScore / (questionCount * 5)) * 100; 
    } else {
      categoryScores[category] = 0;
    }
  });
  results.categories = categoryScores;
  
  results.recommendations.push("Manter uma rotina de sono regular e hidratação adequada.");
  if(categoryScores.physical < 60) results.recommendations.push("Considerar atividades físicas leves como caminhada ou yoga para melhorar a vitalidade física.");
  if(categoryScores.emotional < 60) results.recommendations.push("Praticar meditação ou mindfulness diariamente por 10-15 minutos para cultivar equilíbrio emocional.");
  if(categoryScores.mental < 60) results.recommendations.push("Experimentar técnicas de foco e organização, como a técnica Pomodoro, para melhorar a clareza mental.");
  if(categoryScores.spiritual < 60) results.recommendations.push("Dedicar tempo para reflexão sobre seus valores e propósito, talvez através de um diário ou conversas inspiradoras.");
  if(categoryScores.energetic < 60) results.recommendations.push("Explorar práticas de limpeza e proteção energética, como banhos de ervas ou visualizações de escudos de luz.");

  return results;
};