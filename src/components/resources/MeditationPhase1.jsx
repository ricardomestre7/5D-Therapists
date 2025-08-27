import React from 'react';
import { Sparkles, Brain, Leaf, Music, BookOpen, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";

const MeditationPhase1 = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-slate-800 dark:via-purple-900 dark:to-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-inner">
      <header className="mb-8 text-center">
        <h1 className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-2",
          "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600",
          "dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400"
        )}>
          MEDITAÇÃO GUIADA PARA INICIANTES
        </h1>
        <p className="text-lg font-medium text-indigo-500 dark:text-indigo-300">Protocolo Lumina Restauris - Fase 1</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Desenvolvido por mestre Ricardo</p>
      </header>

      <section className="mb-8 p-6 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-300 flex items-center">
          <Music size={28} className="mr-3 text-purple-500" /> Instruções
        </h2>
        <p className="mb-4 leading-relaxed">
          Esta meditação guiada de 10 minutos foi especialmente desenvolvida para a Fase 1 do Protocolo Lumina Restauris. Seu objetivo é acalmar a mente, encontrar seu centro energético e preparar seu campo para o processo de liberação.
        </p>
        <h3 className="text-lg font-medium mb-2 text-purple-600 dark:text-purple-400">Recomendações:</h3>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Escolha um local tranquilo e confortável</li>
          <li>Use fones de ouvido para uma experiência mais imersiva</li>
          <li>Pratique preferencialmente pela manhã, antes de tomar a fórmula Lumina Libertas</li>
          <li>Repita diariamente durante toda a Fase 1</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-pink-200 dark:border-pink-700">
        <h2 className="text-2xl font-semibold mb-4 text-pink-700 dark:text-pink-300 flex items-center">
          <Zap size={28} className="mr-3 text-pink-500" /> Roteiro da Meditação
        </h2>
        <p className="italic text-sm mb-4 text-slate-500 dark:text-slate-400">[Música suave de fundo - 432 Hz]</p>

        <div className="space-y-6">
          <div>
            <h4 className="text-md font-semibold text-pink-600 dark:text-pink-400">Introdução (0:00 - 1:00)</h4>
            <p className="leading-relaxed">Encontre uma posição confortável, sentado ou deitado, com sua coluna naturalmente alinhada. Permita que seu corpo relaxe completamente, liberando qualquer tensão desnecessária.</p>
            <p className="leading-relaxed">Comece a perceber sua respiração... sem alterá-la inicialmente... apenas observando seu ritmo natural.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-pink-600 dark:text-pink-400">Respiração Consciente (1:00 - 3:00)</h4>
            <p className="leading-relaxed">Agora, comece a aprofundar sua respiração suavemente. Inspire lentamente pelo nariz... contando mentalmente até quatro... 1... 2... 3... 4...</p>
            <p className="leading-relaxed">Segure brevemente o ar por dois segundos... 1... 2...</p>
            <p className="leading-relaxed">E expire lentamente pela boca, contando mentalmente até seis... 1... 2... 3... 4... 5... 6...</p>
            <p className="leading-relaxed">Continue este padrão respiratório, permitindo que cada ciclo seja mais profundo e relaxante que o anterior.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-pink-600 dark:text-pink-400">Escaneamento Corporal (3:00 - 5:30)</h4>
            <p className="leading-relaxed">Mantendo esta respiração rítmica, direcione sua atenção para o topo de sua cabeça. Visualize uma luz dourada suave começando a se formar neste ponto.</p>
            <p className="leading-relaxed">A cada inspiração, esta luz se intensifica... a cada expiração, ela começa a fluir lentamente para baixo...</p>
            <p className="leading-relaxed">Permita que esta luz dourada desça pelo seu rosto... relaxando seus olhos... sua mandíbula... seu pescoço...</p>
            <p className="leading-relaxed">Continue acompanhando esta luz enquanto ela flui pelos seus ombros... braços... mãos... tórax... abdômen...</p>
            <p className="leading-relaxed">Sinta esta luz se movendo pela sua coluna... quadris... pernas... até os pés...</p>
            <p className="leading-relaxed">Agora todo seu corpo está preenchido por esta luz dourada relaxante...</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-pink-600 dark:text-pink-400">Encontrando o Centro (5:30 - 8:00)</h4>
            <p className="leading-relaxed">Direcione sua atenção para o centro do seu peito, na região do coração. Sinta um ponto de luz mais intensa se formando nesta área.</p>
            <p className="leading-relaxed">Este é seu centro energético, o ponto de equilíbrio do seu campo. A partir deste centro, ondas de harmonia começam a se expandir em todas as direções.</p>
            <p className="leading-relaxed">A cada inspiração, este centro se fortalece... a cada expiração, ele se expande...</p>
            <p className="leading-relaxed">Imagine que este centro de luz está dissolvendo suavemente quaisquer bloqueios ou estagnações em seu campo energético.</p>
            <p className="leading-relaxed">Fique com essa sensação de centro, de equilíbrio. Este é o seu ponto de reconexão, sempre disponível a qualquer momento.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-pink-600 dark:text-pink-400">Intenção para a Fase 1 (8:00 - 9:30)</h4>
            <p className="leading-relaxed">Agora, mantendo sua consciência neste centro, estabeleça sua intenção para esta fase de liberação do Protocolo Lumina Restauris.</p>
            <p className="leading-relaxed italic">Mentalmente, repita: "Estou aberto e receptivo ao processo de liberação. Permito que tudo o que não serve mais ao meu bem-estar maior seja gentilmente dissolvido e liberado do meu campo. Estou seguro neste processo de transformação."</p>
            <p className="leading-relaxed">Sinta esta intenção ancorada em seu centro luminoso.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-pink-600 dark:text-pink-400">Conclusão (9:30 - 10:00)</h4>
            <p className="leading-relaxed">Gradualmente, comece a trazer sua consciência de volta para seu corpo e para o ambiente ao seu redor.</p>
            <p className="leading-relaxed">Movimente suavemente seus dedos das mãos e dos pés... respire profundamente... e quando estiver pronto, abra lentamente seus olhos, trazendo consigo a clareza e o equilíbrio desta prática.</p>
            <p className="leading-relaxed">Lembre-se de que você pode retornar a este estado centrado a qualquer momento durante seu dia, simplesmente focando em sua respiração e reconectando-se com seu centro luminoso.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 p-6 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-indigo-200 dark:border-indigo-700">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center">
          <BookOpen size={28} className="mr-3 text-indigo-500" /> Recomendações Adicionais
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Pratique esta meditação diariamente durante a Fase 1 do protocolo</li>
          <li>Para resultados ideais, faça esta prática antes de tomar a fórmula Lumina Libertas</li>
          <li>Mantenha um registro de suas experiências no Diário de Bordo</li>
          <li>À medida que avança na prática, você pode notar sensações de leveza, calor ou formigamento - todas são indicadores normais do processo de liberação</li>
        </ul>
      </section>

      <footer className="mt-12 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Protocolo Lumina Restauris - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default MeditationPhase1;