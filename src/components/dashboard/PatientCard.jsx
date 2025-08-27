import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, Eye, Edit3, UserCircle, Zap, Trash2, Loader2, Edit } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const PatientCard = ({ patient, onAction, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const phaseLabels = [
    "Fase 1: Liberação", "Fase 2: Regeneração", "Fase 3: Equilíbrio",
    "Fase 4: Vitalidade", "Fase 5: Integração", "Fase 6: Autonomia"
  ];
  const currentPhaseLabel = phaseLabels[(patient.current_phase_number || 1) - 1] || "Fase Desconhecida";

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(patient.id);
    } catch (error) {
      console.error("Error during onDelete callback:", error);
    } finally {
      setIsDeleting(false); 
    }
  };

  const mainAction = patient.has_analysis ? 'view_results' : 'analyze';
  const mainActionLabel = patient.has_analysis ? 'Ver Resultados' : 'Realizar Análise';
  const MainActionIcon = patient.has_analysis ? Eye : Activity;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(168, 85, 247, 0.1)" }}
      className="transition-all duration-300 h-full"
    >
      <Card 
        className={`bg-slate-800/60 backdrop-blur-sm border-purple-500/20 shadow-xl hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col`}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold text-purple-300">{patient.full_name}</CardTitle>
              <CardDescription className="text-sm text-slate-400">{patient.email}</CardDescription>
            </div>
            {patient.has_analysis ? (
              <Activity className="h-6 w-6 text-teal-400 quantum-pulse" />
            ) : (
              <Edit3 className="h-6 w-6 text-yellow-400" />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 text-sm text-slate-300">
          <div><strong>Idade:</strong> {calculateAge(patient.birth_date)} anos</div>
          <div><strong>Gênero:</strong> {patient.gender || 'N/A'}</div>
          {patient.therapistName && (
            <div className="flex items-center">
              <UserCircle className="h-4 w-4 mr-1 text-slate-400" />
              <strong>Terapeuta:</strong>&nbsp;{patient.therapistName}
            </div>
          )}
           <div className="flex items-center text-xs mt-1">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
            <span className="font-medium text-purple-400">{currentPhaseLabel}</span>
          </div>
          <div className={`mt-2 p-2 rounded-md text-xs font-medium ${
            patient.has_analysis 
              ? 'bg-teal-900/50 text-teal-300' 
              : 'bg-yellow-900/50 text-yellow-300'
          }`}>
            {patient.has_analysis ? 'Análise Quântica Realizada' : 'Análise Quântica Pendente'}
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-700/50 pt-4 flex flex-col sm:flex-row gap-2">
          <Button 
            className="w-full sm:flex-grow quantum-glow shadow-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => onAction(patient, mainAction)}
          >
            <MainActionIcon className="mr-2 h-4 w-4" /> {mainActionLabel}
            <ArrowRight className="ml-auto h-4 w-4" />
          </Button>
          <div className="flex w-full sm:w-auto gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="flex-1 sm:flex-none text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white"
              aria-label="Editar Paciente"
              onClick={() => onAction(patient, 'edit')}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="flex-1 sm:flex-none text-red-500 hover:bg-red-500/10"
                  aria-label="Excluir Paciente"
                  disabled={isDeleting}
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-800 border-purple-600 text-slate-200">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-400">
                    Tem certeza que deseja excluir o paciente "{patient.full_name}"? Esta ação não pode ser desfeita e removerá todos os dados associados, incluindo análises.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting} className="border-slate-600 hover:bg-slate-700">Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PatientCard;