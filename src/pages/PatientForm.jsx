import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx'; 
import { UserCircle, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast.js';

const PatientDataFormPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Dados Salvos (Simulação)",
      description: "As informações do paciente foram salvas localmente.",
      className: "bg-green-500 text-white"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-1"
    >
      <div className="flex items-center space-x-3">
        <UserCircle className="h-10 w-10 text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Coleta de Dados do Paciente
          </h1>
          <p className="text-slate-400">Insira as informações detalhadas para análise.</p>
        </div>
      </div>

      <Card className="bg-slate-800 border border-slate-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-200">Informações Pessoais e Anamnese</CardTitle>
          <CardDescription className="text-slate-400">Preencha todos os campos relevantes para uma análise completa.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-300">Nome Completo</Label>
                <Input id="fullName" placeholder="Nome do Paciente" className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-slate-300">Data de Nascimento</Label>
                <Input id="birthDate" type="date" className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mainComplaint" className="text-slate-300">Queixa Principal</Label>
              <Textarea id="mainComplaint" placeholder="Descreva a principal queixa ou motivo da consulta" rows={3} className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="history" className="text-slate-300">Histórico de Saúde e Condições Preexistentes</Label>
              <Textarea id="history" placeholder="Detalhe o histórico de saúde, incluindo condições médicas, cirurgias, alergias, etc." rows={4} className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"/>
            </div>
            
            <p className="text-slate-500 text-sm text-center">
              (Mais campos para alinhamento dos chakras, constelações familiares, campo astrológico, etc., serão adicionados aqui conforme o plano.)
            </p>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                <Save className="mr-2 h-5 w-5" />
                Salvar Dados
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PatientDataFormPage;