import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, BookOpen, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getAllTechniques, saveTechnique, deleteTechnique } from '@/lib/services/techniquesService.js';
import { initialTechniqueSet } from '@/lib/config/initialTechniqueSet.js';
import { getSupabaseUser } from '@/lib/supabaseClient.jsx';
import { supabase } from '@/lib/customSupabaseClient.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';

import ManageTechniquesHeader from '@/components/techniques/ManageTechniquesHeader.jsx';
import ManageTechniquesActions from '@/components/techniques/ManageTechniquesActions.jsx';
import TechniqueList from '@/components/techniques/TechniqueList.jsx';
import TechniqueFormDialog from '@/components/techniques/TechniqueFormDialog.jsx';
import { Button } from '@/components/ui/button.jsx';

const ManageTechniquesPage = () => {
  const { session } = useAuth();
  const [techniques, setTechniques] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopulating, setIsPopulating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTechnique, setCurrentTechnique] = useState(null);
  const [formState, setFormState] = useState({
    title: '', description: '', category: '', type: '',
    core_principles: '', target_conditions: '', techniques_practices: '',
    contraindications: '', evaluation_schema: '', report_template: '', id_key: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadTechniques = useCallback(async () => {
    if (!session) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const response = await getAllTechniques();
    if (response.data) {
      setTechniques(response.data);
    }
    setIsLoading(false);
  }, [session]);

  useEffect(() => {
    if (session) {
      loadTechniques();
    } else {
      setIsLoading(false);
    }
  }, [session, loadTechniques]);

  const handlePopulateInitialTechniques = async () => {
    if (!session) {
      toast({ title: "Erro", description: "Usuário não autenticado.", variant: "destructive" });
      return;
    }
    setIsPopulating(true);
    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;
    const user = await getSupabaseUser();

    if (!user) {
      toast({ title: "Erro Fatal", description: "Não foi possível obter informações do usuário.", variant: "destructive" });
      setIsPopulating(false);
      return;
    }

    for (const initialTech of initialTechniqueSet) {
      const currentIdKey = initialTech.id_key || initialTech.title.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '');
      
      const { data: existing, error: checkError } = await supabase
        .from('therapy_knowledge_base')
        .select('id')
        .eq('user_id', user.id)
        .eq('id_key', currentIdKey)
        .maybeSingle();

      if (checkError) {
        console.error(`Error checking existing technique ${currentIdKey}:`, checkError);
        failCount++;
        continue;
      }

      if (existing) {
        skippedCount++;
        continue; 
      }
      
      const techToSave = {
        title: initialTech.title,
        description: initialTech.description,
        category: initialTech.category,
        type: initialTech.type,
        evaluation_schema: initialTech.evaluation_schema || null,
        report_template: initialTech.report_template || null,
        core_principles: initialTech.core_principles || null,
        techniques_practices: initialTech.techniques_practices || null,
        target_conditions: initialTech.target_conditions || null,
        contraindications: initialTech.contraindications || null,
        user_id: user.id,
        id_key: currentIdKey
      };

      const response = await saveTechnique(techToSave); 
      if (response.data) {
        successCount++;
      } else {
        failCount++;
        console.error(`Failed to populate ${initialTech.title}:`, response.error);
      }
    }
    setIsPopulating(false);

    if (successCount > 0) {
      toast({ title: "Técnicas Populadas!", description: `${successCount} técnicas iniciais foram adicionadas.`, className: "bg-green-500 text-white" });
      loadTechniques(); 
    }
    if (failCount > 0) {
      toast({ title: "Falha Parcial", description: `${failCount} técnicas não puderam ser adicionadas. Verifique o console.`, variant: "warning" });
    }
    if (skippedCount > 0 && successCount === 0 && failCount === 0) {
       toast({ title: "Nenhuma Técnica Nova", description: `${skippedCount} técnicas já existiam e foram puladas. Nenhuma nova adicionada.`, variant: "default" });
    } else if (skippedCount > 0) {
      toast({ title: "Informação", description: `${skippedCount} técnicas já existiam e foram puladas.`, variant: "default", duration: 2000 });
    }
    if (successCount === 0 && failCount === 0 && skippedCount === 0 && initialTechniqueSet.length > 0){
      toast({ title: "Nenhuma Ação", description: "Não haviam técnicas para popular ou todas falharam silenciosamente.", variant: "warning" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const parseJsonOrString = (jsonString, fieldName) => {
    if (!jsonString || typeof jsonString !== 'string' || jsonString.trim() === '') {
      return null; 
    }
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      toast({
        title: `Erro de Formato em ${fieldName}`,
        description: `O campo ${fieldName} não é um JSON válido. Por favor, corrija. Exemplo: {"key": "value"} ou ["item1", "item2"]`,
        variant: "destructive",
        duration: 7000
      });
      throw new Error(`Invalid JSON in ${fieldName}`);
    }
  };
  
  const parseArrayOrString = (arrayString) => {
    if (!arrayString || typeof arrayString !== 'string' || arrayString.trim() === '') {
      return null;
    }
    return arrayString.split(',').map(item => item.trim()).filter(item => item !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let parsedCorePrinciples, parsedTechniquesPractices, parsedEvaluationSchema, parsedReportTemplate, parsedTargetConditions;

    try {
      parsedCorePrinciples = formState.core_principles ? parseJsonOrString(formState.core_principles, 'Princípios Chave') : null;
      parsedTechniquesPractices = formState.techniques_practices ? parseJsonOrString(formState.techniques_practices, 'Técnicas/Práticas') : null;
      parsedEvaluationSchema = formState.evaluation_schema ? parseJsonOrString(formState.evaluation_schema, 'Esquema de Avaliação') : null;
      parsedReportTemplate = formState.report_template ? parseJsonOrString(formState.report_template, 'Template de Relatório') : null;
      parsedTargetConditions = formState.target_conditions ? parseArrayOrString(formState.target_conditions) : null;
    } catch (error) {
      setIsSubmitting(false);
      return; 
    }
    
    const idKeyToUse = formState.id_key 
      ? formState.id_key.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '')
      : formState.title.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '');

    if (!idKeyToUse) {
        toast({ title: "Erro de Validação", description: "O ID Chave ou Título é necessário para gerar um ID Chave.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    const techniqueToSave = {
      id: currentTechnique?.id,
      title: formState.title,
      description: formState.description,
      category: formState.category,
      type: formState.type,
      core_principles: parsedCorePrinciples,
      target_conditions: parsedTargetConditions,
      techniques_practices: parsedTechniquesPractices,
      contraindications: formState.contraindications,
      evaluation_schema: parsedEvaluationSchema,
      report_template: parsedReportTemplate,
      id_key: idKeyToUse
    };

    const response = await saveTechnique(techniqueToSave);
    if (response.data) {
      loadTechniques();
      setIsFormOpen(false);
      setCurrentTechnique(null);
      setFormState({ title: '', description: '', category: '', type: '', core_principles: '', target_conditions: '', techniques_practices: '', contraindications: '', evaluation_schema: '', report_template: '', id_key: '' });
    }
    setIsSubmitting(false);
  };

  const handleEdit = (technique) => {
    setCurrentTechnique(technique);
    setFormState({
      title: technique.title || '',
      description: technique.description || '',
      category: technique.category || '',
      type: technique.type || '',
      core_principles: technique.core_principles ? JSON.stringify(technique.core_principles, null, 2) : '',
      target_conditions: Array.isArray(technique.target_conditions) ? technique.target_conditions.join(', ') : (typeof technique.target_conditions === 'string' ? technique.target_conditions : ''),
      techniques_practices: technique.techniques_practices ? JSON.stringify(technique.techniques_practices, null, 2) : '',
      contraindications: technique.contraindications || '',
      evaluation_schema: technique.evaluation_schema ? JSON.stringify(technique.evaluation_schema, null, 2) : '',
      report_template: technique.report_template ? JSON.stringify(technique.report_template, null, 2) : '',
      id_key: technique.id_key || ''
    });
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setCurrentTechnique(null);
    setFormState({
      title: '', description: '', category: '', type: '',
      core_principles: '', target_conditions: '', techniques_practices: '',
      contraindications: '', evaluation_schema: '', report_template: '', id_key: ''
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (techniqueId) => {
    if (window.confirm("Tem certeza que deseja excluir esta técnica? Esta ação não pode ser desfeita.")) {
      setIsLoading(true);
      const response = await deleteTechnique(techniqueId);
      if (!response.error) {
        loadTechniques();
      } else {
        setIsLoading(false);
      }
    }
  };

  const filteredTechniques = techniques.filter(tech => 
    (tech.title && tech.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tech.category && tech.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tech.description && tech.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!session && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.24))] p-6 bg-slate-900 text-center">
        <motion.h1 
           initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
           className="text-2xl font-bold text-purple-400 mb-4">Acesso Negado</motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-300 mb-6">Você precisa estar logado para acessar esta página.</motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Ir para Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-4 md:p-8"
    >
      <ManageTechniquesHeader />
      <ManageTechniquesActions
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onPopulateInitial={handlePopulateInitialTechniques}
        onAddNew={handleAddNew}
        isPopulating={isPopulating}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
          <p className="ml-4 text-slate-300 text-lg">Carregando suas técnicas...</p>
        </div>
      ) : techniques.length === 0 && !isPopulating ? (
         <div className="text-center py-12 bg-slate-800/30 rounded-lg shadow-xl">
          <BookOpen className="mx-auto h-16 w-16 text-slate-500 mb-4" />
          <p className="text-2xl text-slate-300 font-semibold">Nenhuma técnica cadastrada ainda.</p>
          <p className="text-slate-400 mt-2">
            Clique em "Adicionar Nova" para criar sua primeira técnica ou em "Popular Iniciais" para carregar um conjunto pré-definido.
          </p>
        </div>
      ) : filteredTechniques.length === 0 && searchTerm ? (
        <div className="text-center py-12 bg-slate-800/30 rounded-lg shadow-xl">
          <Search className="mx-auto h-16 w-16 text-slate-500 mb-4" />
          <p className="text-2xl text-slate-300 font-semibold">Nenhuma técnica encontrada para "{searchTerm}".</p>
          <p className="text-slate-400 mt-2">
            Tente um termo de busca diferente ou limpe a busca para ver todas as suas técnicas.
          </p>
        </div>
      ) : (
        <TechniqueList
          techniques={filteredTechniques}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TechniqueFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        currentTechnique={currentTechnique}
        formState={formState}
        onFormStateChange={setFormState}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onSetCurrentTechnique={setCurrentTechnique}
      />
    </motion.div>
  );
};

export default ManageTechniquesPage;