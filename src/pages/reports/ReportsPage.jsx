import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, User, Calendar, BarChart, Activity, Zap, Brain, Heart, Shield, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { getAllPatients } from '@/lib/services/patientService.js';
import { getAllJourneyEventsForPatient } from '@/lib/services/journeyService.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const iconMap = {
  ANALYSIS_GENERATED: BarChart,
  PRACTICE_COMPLETED: Activity,
  THERAPIST_NOTE: FileText,
  PHASE_UPDATED: Zap,
  MOOD_LOGGED: Heart,
  default: Activity
};

const categoryIconMap = {
  physical: Shield,
  emotional: Heart,
  mental: Brain,
  spiritual: Sparkles,
  energetic: Zap,
};

const ReportJourneyEventCard = ({ event }) => {
  const EventIcon = iconMap[event.event_type] || iconMap.default;
  const formatDate = (dateString) => new Date(dateString).toLocaleString('pt-BR');

  const renderEventData = () => {
    if (!event.event_data) return <p className="text-sm text-slate-400">Detalhes não disponíveis.</p>;

    if (event.event_type === 'ANALYSIS_GENERATED' && event.event_data.categories) {
      return (
        <div className="mt-2 space-y-1">
          <p className="text-xs text-slate-500">Análise ID: {event.related_analysis_id?.substring(0,8)}...</p>
          {Object.entries(event.event_data.categories).map(([key, value]) => {
            const CategoryIcon = categoryIconMap[key.toLowerCase()] || Brain;
            return (
              <div key={key} className="flex items-center justify-between text-xs p-1 bg-slate-700/50 rounded">
                <span className="flex items-center text-slate-300">
                  <CategoryIcon className="h-3 w-3 mr-1.5 text-purple-400" />
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>
                <span className="font-semibold text-purple-300">{Number(value).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      );
    }
    return <pre className="text-xs text-slate-400 bg-slate-700/50 p-2 rounded overflow-x-auto">{JSON.stringify(event.event_data, null, 2)}</pre>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-slate-800/80 border border-slate-700 rounded-lg shadow-md mb-3"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <EventIcon className="h-5 w-5 text-pink-400 mr-2" />
          <span className="text-sm font-semibold text-pink-300">{event.event_type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        <span className="text-xs text-slate-500">{formatDate(event.timestamp)}</span>
      </div>
      {renderEventData()}
      {event.notes && <p className="text-xs text-slate-400 mt-2 italic">Nota: {event.notes}</p>}
    </motion.div>
  );
};


const ReportsPage = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!session) return;
      setIsLoadingPatients(true);
      const response = await getAllPatients();
      if (response.data) {
        setPatients(response.data);
      } else {
        toast({ title: "Erro", description: "Não foi possível carregar a lista de pacientes.", variant: "destructive" });
      }
      setIsLoadingPatients(false);
    };
    fetchPatients();
  }, [session, toast]);

  const handleGenerateReport = async () => {
    if (!selectedPatientId) {
      toast({ title: "Atenção", description: "Por favor, selecione um paciente.", variant: "warning" });
      return;
    }
    
    setIsLoadingReport(true);
    const response = await getAllJourneyEventsForPatient(selectedPatientId);
    if (response.data) {
      setReportData(response.data);
      if (response.data.length === 0) {
        toast({ title: "Nenhum Dado", description: "Nenhum evento encontrado na jornada deste paciente para gerar o relatório.", variant: "default" });
      }
    } else {
      toast({ title: "Erro ao Gerar Relatório", description: response.error.message, variant: "destructive" });
      setReportData(null);
    }
    setIsLoadingReport(false);
  };
  
  const selectedPatientDetails = patients.find(p => p.id === selectedPatientId);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.24))] p-6 bg-slate-900 text-center">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">Acesso Negado</h1>
        <p className="text-slate-300 mb-6">Você precisa estar logado para acessar esta página.</p>
        <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Ir para Login
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <header className="mb-10">
        <div className="flex items-center mb-2">
          <FileText className="h-10 w-10 text-pink-400 mr-4" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Relatórios Quânticos da Jornada
          </h1>
        </div>
        <p className="text-slate-400">Visualize a progressão e interconexões dos eventos na jornada terapêutica do paciente.</p>
      </header>

      <Card className="bg-slate-800/60 backdrop-blur-sm border-purple-500/20 shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-200">Selecionar Paciente</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          {isLoadingPatients ? (
            <div className="flex items-center text-slate-400">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando pacientes...
            </div>
          ) : (
            <Select onValueChange={setSelectedPatientId} value={selectedPatientId}>
              <SelectTrigger className="w-full sm:w-[300px] bg-slate-700 border-slate-600 text-slate-200">
                <SelectValue placeholder="Escolha um paciente" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 text-slate-200 border-slate-600">
                {patients.length > 0 ? patients.map(p => (
                  <SelectItem key={p.id} value={p.id} className="hover:bg-slate-600">{p.full_name}</SelectItem>
                )) : <SelectItem value="no-patients" disabled>Nenhum paciente encontrado</SelectItem>}
              </SelectContent>
            </Select>
          )}
          <Button 
            onClick={handleGenerateReport} 
            disabled={!selectedPatientId || isLoadingReport || isLoadingPatients}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            {isLoadingReport ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <BarChart className="mr-2 h-5 w-5" />}
            Gerar Relatório
          </Button>
        </CardContent>
      </Card>

      {isLoadingReport && (
        <div className="text-center py-10">
            <Loader2 className="mx-auto h-12 w-12 text-purple-400 animate-spin" />
            <p className="text-slate-300">Gerando relatório, por favor aguarde...</p>
        </div>
      )}

      {reportData && selectedPatientDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-slate-800/70 backdrop-blur-md border-pink-500/30 shadow-2xl">
            <CardHeader className="border-b border-pink-500/20 pb-4">
              <div className="flex items-center mb-2">
                <User className="h-8 w-8 text-pink-400 mr-3" />
                <div>
                  <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                    Relatório da Jornada: {selectedPatientDetails.full_name}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Eventos registrados em ordem cronológica.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 max-h-[600px] overflow-y-auto custom-scrollbar">
              {reportData.length > 0 ? (
                reportData.map(event => <ReportJourneyEventCard key={event.id} event={event} />)
              ) : (
                 <div className="text-center py-10">
                    <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
                    <p className="text-xl text-slate-300">Nenhum evento na jornada deste paciente.</p>
                    <p className="text-slate-500">Realize análises ou outras ações para popular o relatório.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {reportData.length > 0 && (
            <Card className="mt-8 bg-slate-800/70 backdrop-blur-md border-purple-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                  Insights Quânticos (Em Desenvolvimento)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Esta seção futuramente analisará as interconexões entre os eventos da jornada,
                  identificando padrões e correlações para fornecer insights mais profundos sobre
                  a progressão terapêutica do paciente. Por exemplo, como diferentes práticas
                  influenciaram os resultados das análises quânticas ao longo do tempo.
                </p>
              </CardContent>
            </Card>
          )}

        </motion.div>
      )}
    </motion.div>
  );
};

export default ReportsPage;