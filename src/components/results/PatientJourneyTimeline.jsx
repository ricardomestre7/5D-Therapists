import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Zap, Stethoscope, ClipboardList, Lightbulb, MessageSquare } from 'lucide-react';

const eventIcons = {
  ANALYSIS_GENERATED: Zap,
  TECHNIQUE_EVALUATION_COMPLETED: Stethoscope,
  PRACTICE_ASSIGNED: ClipboardList,
  PRACTICE_COMPLETED: Lightbulb,
  THERAPIST_NOTE: MessageSquare,
  default: CalendarDays,
};

const EventItem = ({ event, techniqueDetails }) => {
  const Icon = eventIcons[event.event_type] || eventIcons.default;
  const eventDate = new Date(event.timestamp || event.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  let title = event.event_type.replace(/_/g, ' ').toLowerCase();
  title = title.charAt(0).toUpperCase() + title.slice(1);
  let description = `Evento registrado em ${eventDate}.`;
  
  if (event.event_type === 'ANALYSIS_GENERATED' && event.event_data?.analysisId) {
    title = "Análise Quântica 5D Realizada";
    description = `ID da Análise: ${event.event_data.analysisId.substring(0,8)}. ${eventDate}`;
  } else if (event.event_type === 'TECHNIQUE_EVALUATION_COMPLETED' && event.event_data?.technique_evaluation_id) {
    const evalDetails = techniqueDetails[event.event_data.technique_evaluation_id];
    title = `Avaliação de Técnica: ${evalDetails?.technique_title || 'Desconhecida'}`;
    description = `Realizada em ${eventDate}.`;
    if (evalDetails?.evaluation_results?.interpretacao_geral) {
      description += ` Resultado: ${evalDetails.evaluation_results.interpretacao_geral.substring(0, 50)}...`;
    }
  }

  return (
    <motion.li 
      className="mb-6 ml-6 timeline-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full -left-4 ring-4 ring-white dark:ring-slate-850 dark:bg-purple-900">
        <Icon className="w-4 h-4 text-purple-600 dark:text-purple-300" />
      </span>
      <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <time className="block mb-2 text-xs font-normal leading-none text-slate-500 dark:text-slate-400">
          {eventDate}
        </time>
        <p className="text-sm font-normal text-slate-600 dark:text-slate-300">
          {description}
        </p>
        {event.notes && (
          <p className="mt-2 text-xs italic text-slate-500 dark:text-slate-400">Nota: {event.notes}</p>
        )}
      </div>
    </motion.li>
  );
};

const PatientJourneyTimeline = ({ journeyEvents, techniqueEvaluations, therapyKnowledgeBase }) => {
  if (!journeyEvents || journeyEvents.length === 0) {
    return (
      <Card className="quantum-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-purple-500" />
            Histórico da Jornada do Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 dark:text-slate-400">Nenhum evento registrado na jornada deste paciente ainda.</p>
        </CardContent>
      </Card>
    );
  }

  const sortedEvents = [...journeyEvents].sort((a, b) => new Date(b.timestamp || b.created_at) - new Date(a.timestamp || a.created_at));
  
  const techniqueDetailsMap = techniqueEvaluations.reduce((acc, evalItem) => {
    const techniqueInfo = therapyKnowledgeBase.find(tk => tk.id === evalItem.knowledge_base_id);
    acc[evalItem.id] = {
      ...evalItem,
      technique_title: techniqueInfo?.title || 'Técnica Desconhecida'
    };
    return acc;
  }, {});


  return (
    <Card className="quantum-card shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          <CalendarDays className="mr-3 h-6 w-6 text-purple-500" />
          Histórico Detalhado da Jornada
        </CardTitle>
        <CardDescription className="text-slate-400">
          Acompanhe os marcos e intervenções ao longo do tratamento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-slate-300 dark:border-slate-700 ml-2">
          {sortedEvents.map((event) => (
            <EventItem key={event.id} event={event} techniqueDetails={techniqueDetailsMap} />
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default PatientJourneyTimeline;