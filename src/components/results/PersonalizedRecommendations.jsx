import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Lightbulb, Zap, Heart, Brain, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const recommendationIcons = {
  default: Lightbulb,
  physical: Shield,
  emotional: Heart,
  mental: Brain,
  spiritual: Sparkles,
  energetic: Zap,
  general: CheckCircle,
};

const PersonalizedRecommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="bg-slate-800/70 border-slate-700/40 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg text-slate-300">Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">Nenhuma recomendação personalizada disponível no momento.</p>
        </CardContent>
      </Card>
    );
  }
  
  const getIconForRecommendation = (recText) => {
    const lowerRecText = recText.toLowerCase();
    if (lowerRecText.includes('físic') || lowerRecText.includes('corpo')) return recommendationIcons.physical;
    if (lowerRecText.includes('emocion') || lowerRecText.includes('sentimento')) return recommendationIcons.emotional;
    if (lowerRecText.includes('ment') || lowerRecText.includes('foco') || lowerRecText.includes('clareza')) return recommendationIcons.mental;
    if (lowerRecText.includes('espirit') || lowerRecText.includes('propósito') || lowerRecText.includes('conexão')) return recommendationIcons.spiritual;
    if (lowerRecText.includes('energi') || lowerRecText.includes('vitalidade')) return recommendationIcons.energetic;
    return recommendationIcons.default;
  };

  return (
    <Card className="bg-slate-800/70 backdrop-blur-md border-teal-500/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
          <Lightbulb className="mr-3 h-6 w-6 text-teal-400" />
          Recomendações Personalizadas 5D
        </CardTitle>
        <CardDescription className="text-slate-400">
          Sugestões para promover seu bem-estar e equilíbrio energético.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = getIconForRecommendation(rec);
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-start p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-teal-500/70 transition-colors duration-200"
              >
                <Icon className="h-6 w-6 text-teal-400 mr-4 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{rec}</p>
              </motion.li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;