import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Brain, Heart, Zap, Shield, Sparkles, Activity } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController);

const iconMap = {
  physical: Shield,
  emotional: Heart,
  mental: Brain,
  spiritual: Sparkles,
  energetic: Zap,
  default: Activity
};

const categoryLabels = {
  physical: 'Físico',
  emotional: 'Emocional',
  mental: 'Mental',
  spiritual: 'Espiritual',
  energetic: 'Energético',
};


const QuantumCharts = ({ analysisData, patientName }) => {
  const chartRef = useRef(null);
  
  if (!analysisData || !analysisData.results || !analysisData.results.categories) {
    return (
        <Card className="bg-slate-800/70 border-red-500/40 shadow-xl">
            <CardHeader>
                <CardTitle className="text-red-400">Dados da Análise Indisponíveis</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-slate-300">Não foi possível carregar os dados para o gráfico de resultados.</p>
            </CardContent>
        </Card>
    );
  }

  const categories = analysisData.results.categories;
  const labels = Object.keys(categories).map(key => categoryLabels[key] || key.charAt(0).toUpperCase() + key.slice(1));
  const dataValues = Object.values(categories);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Níveis 5D - ${patientName || 'Paciente'}`,
        data: dataValues,
        backgroundColor: 'rgba(168, 85, 247, 0.3)', // Purple with opacity
        borderColor: 'rgba(192, 132, 252, 1)', // Lighter Purple
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(192, 132, 252, 1)',
        pointHoverBackgroundColor: 'rgba(192, 132, 252, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(203, 213, 225, 0.2)', // Slate-400 with opacity
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.2)', // Slate-400 with opacity
        },
        pointLabels: {
          font: {
            size: 13,
            weight: '500',
          },
          color: 'rgba(226, 232, 240, 0.9)', // Slate-200
        },
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 20,
          backdropColor: 'rgba(30, 41, 59, 0.5)', // Slate-800 with opacity for ticks background
          color: 'rgba(148, 163, 184, 0.8)', // Slate-400
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(226, 232, 240, 0.9)', // Slate-200
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.85)', // Slate-900 with opacity
        titleColor: 'rgba(192, 132, 252, 1)', // Purple
        bodyColor: 'rgba(226, 232, 240, 1)', // Slate-200
        borderColor: 'rgba(168, 85, 247, 0.5)',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.r !== null) {
              label += context.parsed.r.toFixed(0) + '%';
            }
            return label;
          }
        }
      },
    },
  };
  
  const renderCategorySummary = () => {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(categories).map(([key, value]) => {
          const Icon = iconMap[key] || iconMap.default;
          const label = categoryLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
          let barColor = 'bg-purple-500';
          if (value < 33) barColor = 'bg-red-500';
          else if (value < 66) barColor = 'bg-yellow-500';
          else barColor = 'bg-green-500';

          return (
            <Card key={key} className="bg-slate-800/50 border-slate-700/70">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300 flex items-center">
                  <Icon className={`h-4 w-4 mr-2 text-${barColor.split('-')[1]}-400`} />
                  {label}
                </CardTitle>
                <span className={`text-lg font-bold text-${barColor.split('-')[1]}-400`}>{value.toFixed(0)}%</span>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };


  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/70 backdrop-blur-md border-purple-500/30 shadow-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Panorama Energético 5D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] relative p-2 sm:p-4">
            {dataValues.length > 0 ? (
                <Radar ref={chartRef} data={data} options={options} />
            ) : (
                <p className="text-center text-slate-400">Dados insuficientes para exibir o gráfico.</p>
            )}
          </div>
        </CardContent>
      </Card>
      {renderCategorySummary()}
    </div>
  );
};

export default QuantumCharts;