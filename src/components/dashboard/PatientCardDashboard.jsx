import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import { User, Settings, Trash2, BarChart3, Zap, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
} from "@/components/ui/alert-dialog.jsx";

const PatientCardDashboard = ({ patient, onAction, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'P';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  };

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

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(patient.id);
    setIsDeleting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(168, 85, 247, 0.2)" }}
    >
      <Card className="bg-slate-800/60 backdrop-blur-sm border-purple-500/20 shadow-xl hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center space-x-4 pb-3">
          <Avatar className="h-12 w-12 border-2 border-purple-400">
            <AvatarImage src={`https://avatar.vercel.sh/${patient.email || patient.full_name}.png?size=128`} alt={patient.full_name} />
            <AvatarFallback className="bg-purple-500 text-white font-bold">{getInitials(patient.full_name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-purple-300">{patient.full_name}</CardTitle>
            <CardDescription className="text-xs text-slate-400">{patient.email || 'E-mail não informado'}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-slate-300 space-y-2 flex-grow">
          <p><User className="inline mr-2 h-4 w-4 text-pink-400" /> Idade: {calculateAge(patient.birth_date)} anos</p>
          <p><Calendar className="inline mr-2 h-4 w-4 text-pink-400" /> Membro desde: {new Date(patient.created_at).toLocaleDateString()}</p>
          <p className={patient.has_analysis ? 'text-teal-400' : 'text-yellow-400'}>
            {patient.has_analysis ? <BarChart3 className="inline mr-2 h-4 w-4" /> : <Zap className="inline mr-2 h-4 w-4" />}
            {patient.has_analysis ? 'Análise Quântica Realizada' : 'Análise Pendente'}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-4 border-t border-slate-700/50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10" disabled={isDeleting}>
                {isDeleting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Trash2 className="h-5 w-5" /></motion.div> : <Trash2 className="h-5 w-5" />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-800 border-purple-600 text-slate-200">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  Tem certeza que deseja excluir o paciente {patient.full_name}? Esta ação não pode ser desfeita e removerá todos os dados associados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-slate-600 hover:bg-slate-700">Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button 
            onClick={() => onAction(patient)} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-xs px-3 py-2"
          >
            {patient.has_analysis ? 'Ver Resultados' : 'Iniciar Análise'}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PatientCardDashboard;