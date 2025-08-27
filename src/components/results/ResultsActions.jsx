import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Share2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";


const ResultsActions = ({ onPrint, onShare, patientId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNewAnalysis = () => {
    if (patientId) {
      navigate(`/quantum-analysis/${patientId}`);
    } else {
      toast({
        title: "Erro",
        description: "ID do paciente não encontrado para iniciar nova análise.",
        variant: "destructive",
      });
    }
  };

  const actionButtons = [
    { label: "Imprimir", icon: Printer, onClick: onPrint, variant: "outline" },
    { label: "Compartilhar", icon: Share2, onClick: onShare, variant: "outline" },
    { label: "Nova Análise", icon: RefreshCw, onClick: handleNewAnalysis, variant: "default" },
  ];

  return (
    <motion.div 
      className="flex flex-col sm:flex-row sm:justify-end gap-3 my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {actionButtons.map((btn, index) => (
        <motion.div
          key={btn.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button onClick={btn.onClick} variant={btn.variant} className="w-full shadow-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out">
            <btn.icon className="mr-2 h-4 w-4" />
            {btn.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ResultsActions;