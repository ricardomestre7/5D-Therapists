import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs.jsx';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Shield, Sparkles, Activity } from 'lucide-react';

const iconMap = {
  physical: Shield,
  emotional: Heart,
  mental: Brain,
  spiritual: Sparkles,
  energetic: Zap,
  default: Activity
};

const QuantumAnalysisTabs = ({ currentTab, setCurrentTab, questionsByCategory, children }) => {
  if (!questionsByCategory) {
    return null; 
  }

  const categories = Object.keys(questionsByCategory);

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-slate-800 p-2 rounded-lg">
        {categories.map((categoryKey) => {
          const IconComponent = iconMap[categoryKey.toLowerCase()] || iconMap.default;
          return (
            <TabsTrigger
              key={categoryKey}
              value={categoryKey}
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white 
                         text-slate-300 hover:bg-purple-500/20 hover:text-purple-300
                         transition-all duration-200 ease-in-out px-3 py-2.5 rounded-md
                         flex items-center justify-center text-sm font-medium group"
            >
              <IconComponent className={`mr-2 h-5 w-5 transition-colors duration-200 ease-in-out ${currentTab === categoryKey ? 'text-white' : 'text-slate-400 group-hover:text-purple-300'}`} />
              {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {categories.map((categoryKey) => (
        <TabsContent key={categoryKey} value={categoryKey} className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children(categoryKey, questionsByCategory[categoryKey])}
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default QuantumAnalysisTabs;