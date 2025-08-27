import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash2, UserCheck, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
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
import { saveTherapist, deleteTherapist, getTherapists } from '@/lib/services/therapistService.js';
import { motion, AnimatePresence } from 'framer-motion';

const TherapistManagement = ({ onTherapistUpdate }) => {
  const [therapists, setTherapists] = useState([]);
  const [newTherapistName, setNewTherapistName] = useState('');
  const [isLoadingAction, setIsLoadingAction] = useState(false); 
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const fetchTherapists = async () => {
    setIsFetching(true);
    try {
      const data = await getTherapists();
      setTherapists(data ? data.sort((a,b) => a.name.localeCompare(b.name)) : []);
    } catch (error) {
      console.error("Error fetching therapists:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  const handleAddTherapist = async () => {
    if (!newTherapistName.trim()) {
      toast({ title: "Nome Inválido", description: "O nome do terapeuta não pode estar vazio.", variant: "destructive" });
      return;
    }
    setIsLoadingAction(true);
    try {
      const result = await saveTherapist(newTherapistName);
      if (result.success && result.therapist) {
        setTherapists(prev => [...prev, result.therapist].sort((a,b) => a.name.localeCompare(b.name)));
        setNewTherapistName('');
        if (onTherapistUpdate) onTherapistUpdate();
      }
    } catch (error) {
       toast({ title: "Erro ao adicionar terapeuta", description: error.message || "Ocorreu um problema.", variant: "destructive" });
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleDeleteTherapist = async (therapistId) => {
    setIsLoadingAction(true);
     try {
      const result = await deleteTherapist(therapistId);
      if (result.success) {
        setTherapists(prev => prev.filter(t => t.id !== therapistId));
        if (onTherapistUpdate) onTherapistUpdate();
      }
    } catch (error) {
       toast({ title: "Erro ao remover terapeuta", description: error.message || "Ocorreu um problema.", variant: "destructive" });
    } finally {
      setIsLoadingAction(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <Card className="quantum-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center font-semibold">
          <UserCheck className="mr-2 h-6 w-6 text-indigo-500" />
          Gerenciar Terapeutas
        </CardTitle>
        <CardDescription>Adicione ou remova terapeutas do sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Nome do novo terapeuta"
            value={newTherapistName}
            onChange={(e) => setNewTherapistName(e.target.value)}
            className="flex-grow"
            disabled={isLoadingAction}
            onKeyDown={(e) => e.key === 'Enter' && !isLoadingAction && handleAddTherapist()}
          />
          <Button onClick={handleAddTherapist} className="quantum-glow bg-indigo-500 hover:bg-indigo-600" disabled={isLoadingAction || !newTherapistName.trim()}>
            {isLoadingAction && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <PlusCircle className="mr-2 h-4 w-4" /> {isLoadingAction ? "Adicionando..." : "Adicionar"}
          </Button>
        </div>

        {isFetching && <div className="flex items-center justify-center py-4"><Loader2 className="h-6 w-6 animate-spin text-indigo-500" /><span className="ml-2 text-sm text-muted-foreground">Carregando terapeutas...</span></div>}
        
        {!isFetching && therapists.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y:10 }} animate={{opacity:1, y:0}}
            className="text-center py-4 text-muted-foreground border border-dashed rounded-md"
          >
            <AlertTriangle className="mx-auto h-8 w-8 mb-2 text-yellow-500" />
            <p>Nenhum terapeuta cadastrado ainda.</p>
            <p className="text-xs">Use o campo acima para adicionar o primeiro.</p>
          </motion.div>
        )}

        <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
          <AnimatePresence>
            {therapists.map((therapist) => (
              <motion.div
                key={therapist.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-slate-700 dark:text-slate-200">{therapist.name}</span>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/50 disabled:opacity-50" disabled={isLoadingAction}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja remover o terapeuta "{therapist.name}"? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isLoadingAction}>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteTherapist(therapist.id)} className="bg-red-500 hover:bg-red-600" disabled={isLoadingAction}>
                        {isLoadingAction ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Removendo...</> : "Remover"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapistManagement;