import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Loader2, AlertTriangle, ChevronLeft, CheckCircle, SlidersHorizontal, User, ListChecks } from 'lucide-react';
import { getPatientById } from '@/lib/services/patientService.js';
import { getTechniqueById, getAllTechniques, saveTechniqueEvaluation } from '@/lib/services/techniquesService.js';

const DynamicFormField = ({ fieldKey, fieldConfig, value, onChange }) => {
  const id = `eval-${fieldKey}`;
  switch (fieldConfig.type?.toLowerCase()) {
    case 'text':
    case 'string':
      return (
        <div className="space-y-1">
          <Label htmlFor={id} className="text-slate-300">{fieldConfig.label || fieldKey}</Label>
          <Input id={id} name={fieldKey} value={value || ''} onChange={onChange} placeholder={fieldConfig.placeholder || ''} className="bg-slate-700 border-slate-600 focus:border-sky-500" />
        </div>
      );
    case 'textarea':
      return (
        <div className="space-y-1">
          <Label htmlFor={id} className="text-slate-300">{fieldConfig.label || fieldKey}</Label>
          <Textarea id={id} name={fieldKey} value={value || ''} onChange={onChange} placeholder={fieldConfig.placeholder || ''} rows={fieldConfig.rows || 3} className="bg-slate-700 border-slate-600 focus:border-sky-500" />
        </div>
      );
    case 'number':
      return (
        <div className="space-y-1">
          <Label htmlFor={id} className="text-slate-300">{fieldConfig.label || fieldKey}</Label>
          <Input id={id} name={fieldKey} type="number" value={value || ''} onChange={onChange} placeholder={fieldConfig.placeholder || ''} className="bg-slate-700 border-slate-600 focus:border-sky-500" />
        </div>
      );
    case 'select':
      return (
        <div className="space-y-1">
          <Label htmlFor={id} className="text-slate-300">{fieldConfig.label || fieldKey}</Label>
          <Select name={fieldKey} onValueChange={(val) => onChange({ target: { name: fieldKey, value: val }})} value={value || ''}>
            <SelectTrigger id={id} className="bg-slate-700 border-slate-600 focus:border-sky-500">
              <SelectValue placeholder={fieldConfig.placeholder || "Selecione..."} />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 text-slate-200 border-slate-600">
              {fieldConfig.options?.map(opt => <SelectItem key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      );
    default:
      return (
         <div className="space-y-1">
          <Label htmlFor={id} className="text-slate-300">{fieldConfig.label || fieldKey} (Texto Padrão)</Label>
          <Input id={id} name={fieldKey} value={value || ''} onChange={onChange} placeholder={fieldConfig.placeholder || 'Valor...'} className="bg-slate-700 border-slate-600 focus:border-sky-500" />
        </div>
      );
  }
};


const TechniqueEvaluationPage = () => {
  const { session } = useAuth();
  const { patientId, techniqueId: techniqueIdFromParam } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [patient, setPatient] = useState(null);
  const [technique, setTechnique] = useState(null);
  const [allUserTechniques, setAllUserTechniques] = useState([]);
  const [selectedTechniqueId, setSelectedTechniqueId] = useState(techniqueIdFromParam || '');
  
  const [evaluationData, setEvaluationData] = useState({});
  const [evaluationResults, setEvaluationResults] = useState({});
  const [notes, setNotes] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      if (!session || !patientId) {
        toast({ title: "Erro", description: "Dados de sessão ou paciente ausentes.", variant: "destructive" });
        navigate('/');
        return;
      }
      setIsLoading(true);

      const patientRes = await getPatientById(patientId);
      if (patientRes.data) {
        setPatient(patientRes.data);
      } else {
        toast({ title: "Erro", description: "Paciente não encontrado.", variant: "destructive" });
        navigate('/');
        setIsLoading(false); return;
      }

      const techniquesRes = await getAllTechniques();
      if (techniquesRes.data) {
        setAllUserTechniques(techniquesRes.data);
        if (techniqueIdFromParam && techniquesRes.data.find(t => t.id === techniqueIdFromParam)) {
          setSelectedTechniqueId(techniqueIdFromParam);
        }
      } else {
        toast({ title: "Erro", description: "Não foi possível carregar as técnicas.", variant: "destructive" });
      }
      
      setIsLoading(false);
    };
    loadInitialData();
  }, [session, patientId, techniqueIdFromParam, toast, navigate]);

  useEffect(() => {
    const loadSelectedTechniqueDetails = async () => {
      if (selectedTechniqueId) {
        setIsLoading(true);
        const techRes = await getTechniqueById(selectedTechniqueId);
        if (techRes.data) {
          setTechnique(techRes.data);
          if (techRes.data.evaluation_schema) {
            const initialData = {};
            Object.keys(techRes.data.evaluation_schema).forEach(key => {
              initialData[key] = techRes.data.evaluation_schema[key].defaultValue || '';
            });
            setEvaluationData(initialData);
          } else {
            setEvaluationData({});
          }
        } else {
          toast({ title: "Erro", description: "Técnica selecionada não encontrada ou não possui esquema.", variant: "destructive" });
          setTechnique(null);
        }
        setIsLoading(false);
      } else {
        setTechnique(null);
        setEvaluationData({});
      }
    };
    loadSelectedTechniqueDetails();
  }, [selectedTechniqueId, toast]);


  const handleEvaluationDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvaluationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patient || !technique) {
      toast({ title: "Erro", description: "Paciente ou técnica não selecionados.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    const currentResults = evaluationData;

    const payload = {
      patient_id: patient.id,
      knowledge_base_id: technique.id,
      evaluation_data: evaluationData,
      evaluation_results: currentResults, 
      notes: notes,
      evaluation_date: new Date().toISOString(),
    };

    const response = await saveTechniqueEvaluation(payload);
    if (response.data) {
      toast({ title: "Sucesso!", description: `Avaliação da técnica "${technique.title}" salva.`, className: "bg-green-500 text-white" });
      navigate(`/results/${patient.id}`);
    } else {
      toast({ title: "Erro ao Salvar", description: response.error?.message || "Não foi possível salvar a avaliação.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.24))] p-6 bg-slate-900 text-center">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">Acesso Negado</h1>
        <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Ir para Login</Button>
      </div>
    );
  }
  
  if (isLoading && !patient) {
    return <div className="flex justify-center items-center h-screen bg-slate-900"><Loader2 className="h-12 w-12 text-sky-400 animate-spin" /><p className="ml-4 text-sky-300 text-lg">Carregando dados...</p></div>;
  }
  
  if (!patient) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.24))] p-6 bg-slate-900 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-400 mb-4">Paciente não encontrado.</h1>
        <Button onClick={() => navigate('/')}><ChevronLeft className="mr-2 h-4 w-4" />Voltar ao Painel</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-4 md:p-8"
    >
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-6 text-sky-300 border-sky-500 hover:bg-sky-500/20">
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <header className="mb-8 text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 mb-2"
        >
          Avaliação de Técnica Terapêutica
        </motion.h1>
        <p className="text-lg text-slate-400">Paciente: <span className="font-semibold text-sky-300">{patient.full_name}</span></p>
      </header>

      <Card className="bg-slate-800/70 backdrop-blur-sm border-sky-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-sky-300 flex items-center"><ListChecks className="mr-3 h-6 w-6"/> Selecionar Técnica</CardTitle>
          <CardDescription className="text-slate-400">Escolha a técnica que deseja aplicar e avaliar para este paciente.</CardDescription>
        </CardHeader>
        <CardContent>
          {allUserTechniques.length === 0 && !isLoading ? (
            <p className="text-amber-400">Nenhuma técnica cadastrada. <Button variant="link" onClick={() => navigate('/manage-techniques')} className="text-sky-400 p-0 h-auto">Cadastre suas técnicas aqui.</Button></p>
          ) : (
            <Select onValueChange={setSelectedTechniqueId} value={selectedTechniqueId} disabled={isLoading}>
              <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-200">
                <SelectValue placeholder={isLoading ? "Carregando técnicas..." : "Selecione uma técnica"} />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 text-slate-200 border-slate-600">
                {allUserTechniques.map(t => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {isLoading && selectedTechniqueId && (
         <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 text-sky-400 animate-spin" /><p className="ml-3 text-sky-300">Carregando esquema da técnica...</p></div>
      )}

      {technique && technique.evaluation_schema && Object.keys(technique.evaluation_schema).length > 0 && (
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="mt-8 bg-slate-800/70 backdrop-blur-sm border-teal-500/30 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-teal-300 flex items-center"><SlidersHorizontal className="mr-3 h-6 w-6"/> Avaliação: {technique.title}</CardTitle>
              <CardDescription className="text-slate-400">{technique.description || 'Preencha os campos abaixo para esta técnica.'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(technique.evaluation_schema).map(([key, config]) => (
                <DynamicFormField
                  key={key}
                  fieldKey={key}
                  fieldConfig={config}
                  value={evaluationData[key]}
                  onChange={handleEvaluationDataChange}
                />
              ))}
              <div className="space-y-1">
                <Label htmlFor="notes" className="text-slate-300">Notas Adicionais</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Observações sobre a avaliação..." className="bg-slate-700 border-slate-600 focus:border-teal-500" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || isLoading} className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                Salvar Avaliação
              </Button>
            </CardFooter>
          </Card>
        </motion.form>
      )}
      
      {technique && (!technique.evaluation_schema || Object.keys(technique.evaluation_schema).length === 0) && (
        <Card className="mt-8 bg-slate-800/70 backdrop-blur-sm border-amber-500/30 shadow-xl text-center py-8">
          <CardHeader>
            <AlertTriangle className="mx-auto h-10 w-10 text-amber-400 mb-3" />
            <CardTitle className="text-xl text-amber-300">Esquema de Avaliação Não Definido</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-400">
              A técnica selecionada <span className="font-semibold text-amber-300">"{technique.title}"</span> não possui um esquema de avaliação configurado.
            </CardDescription>
            <Button variant="link" onClick={() => navigate('/manage-techniques')} className="mt-2 text-sky-400">Configurar em Gerenciar Técnicas</Button>
          </CardContent>
        </Card>
      )}

    </motion.div>
  );
};

export default TechniqueEvaluationPage;