import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Users, BarChart2, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: `0 10px 15px -3px ${color}30, 0 4px 6px -2px ${color}20`}}
      className="flex-1"
    >
      <Card className={`bg-slate-800/70 border-${color}-500/40 shadow-xl h-full`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
          <Icon className={`h-5 w-5 text-${color}-400`} />
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold text-${color}-400`}>{value}</div>
          {description && <p className="text-xs text-slate-500 pt-1">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DashboardStats = ({ stats }) => {
  const { total, recentlyAdded, withAnalysis } = stats;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
      <StatCard title="Total de Pacientes" value={total} icon={Users} color="purple" description="Número total de pacientes registrados." />
      <StatCard title="Adicionados Recentemente" value={recentlyAdded} icon={Activity} color="pink" description="Pacientes adicionados nos últimos 7 dias." />
      <StatCard title="Com Análise Quântica" value={withAnalysis} icon={BarChart2} color="teal" description="Pacientes que já possuem uma análise." />
      <StatCard title="Sessões Futuras" value="0" icon={TrendingUp} color="cyan" description="Sessões agendadas (Em breve)." />
    </div>
  );
};

export default DashboardStats;