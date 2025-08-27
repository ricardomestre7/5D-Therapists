import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader.jsx'; // Assuming this will be recreated or adapted
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx";
import { BookOpen, Music, Brain, Video } from 'lucide-react'; // Example icons

const resourceItemsPlaceholder = [
  {
    id: "intro-5d",
    title: "Introdução à Terapia 5D",
    icon: <BookOpen className="h-6 w-6 text-purple-400" />,
    description: "Entenda os conceitos fundamentais da terapia quântica e integrativa.",
    content: <p className="p-4 text-slate-300">Conteúdo detalhado sobre os princípios da Terapia 5D, o campo quântico, e como as práticas energéticas e de IA se integram neste novo paradigma de cura.</p>,
    category: "Fundamentos Quânticos"
  },
  {
    id: "guided-meditation-sample",
    title: "Meditação Guiada: Conexão com o Eu Superior",
    icon: <Music className="h-6 w-6 text-pink-400" />,
    description: "Uma amostra de meditação guiada para terapeutas.",
    content: <div className="p-4 text-slate-300"> <p>Áudio da meditação aqui. Este exercício foca em expandir a consciência e conectar-se com a intuição e sabedoria interior, essencial para terapeutas 5D.</p> </div>,
    category: "Práticas para Terapeutas"
  },
];

const ResourcesPage = () => {
  // Placeholder for categories if needed
  const categories = [...new Set(resourceItemsPlaceholder.map(item => item.category))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-1"
    >
      <PageHeader 
        title="Recursos para Terapeutas 5D"
        description="Materiais de estudo, práticas e ferramentas para aprofundar seu conhecimento."
        icon={BookOpen}
      />

      {categories.map((category, index) => (
        <motion.section 
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
            {category}
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {resourceItemsPlaceholder.filter(item => item.category === category).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-slate-800/60 shadow-lg rounded-xl overflow-hidden quantum-card border border-slate-700/50 hover:shadow-purple-500/20 transition-shadow duration-300"
              >
                <AccordionItem value={item.id} className="border-b-0">
                  <AccordionTrigger className="p-5 text-left hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="flex items-center text-lg font-medium text-slate-100">
                      <span className="mr-4 p-2 bg-purple-500/20 rounded-full text-purple-400">
                        {item.icon}
                      </span>
                      <div>
                        {item.title}
                        <p className="text-sm font-normal text-slate-400 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-700/30 p-0">
                    <div className="prose prose-invert max-w-none p-5 text-slate-300">
                     {item.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.section>
      ))}
    </motion.div>
  );
};

export default ResourcesPage;