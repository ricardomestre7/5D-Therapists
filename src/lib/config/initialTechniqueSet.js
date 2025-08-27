export const initialTechniqueSet = [
  {
    id_key: "radiestesia_energetica",
    title: "Radiestesia Energética",
    category: "Diagnóstico Vibracional",
    description: "Avaliação de campos energéticos, chakras e desequilíbrios através de instrumentos radiestésicos.",
    type: "Avaliação",
    evaluation_schema: {
      instrumento_utilizado: { label: "Instrumento Utilizado", type: "select", options: ["Pêndulo de Cristal", "Aurameter", "Dual Rod", "Gráficos Radiestésicos", "Outro"] },
      foco_analise: { label: "Foco Principal da Análise", type: "select", options: ["Chakras Principais", "Corpos Sutis", "Energia do Ambiente Residencial", "Energia do Ambiente Comercial", "Desequilíbrios Específicos (detalhar)"] },
      nivel_vitalidade_geral: { label: "Nível de Vitalidade Geral (0-100%)", type: "number", min: 0, max: 100, step: 5, placeholder: "Ex: 75" },
      principais_desequilibrios_detectados: { label: "Principais Desequilíbrios Detectados", type: "textarea", rows: 3, placeholder: "Ex: Chakra Laríngeo bloqueado, Fuga energética no corpo etérico..." },
      observacoes_radiestesista: { label: "Observações e Recomendações Preliminares", type: "textarea", rows: 4, placeholder: "Considerações adicionais, sugestões de harmonização..." }
    },
    report_template: null 
  },
  {
    id_key: "cromoterapia_basica",
    title: "Cromoterapia Básica",
    category: "Terapia Vibracional",
    description: "Aplicação de cores para reequilíbrio energético e bem-estar.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      areas_tratadas: { label: "Áreas/Chakras Focados na Sessão", type: "text", placeholder: "Ex: Chakra Frontal, Plexo Solar, Corpo Mental" },
      cores_utilizadas: { label: "Cores Predominantemente Utilizadas", type: "text", placeholder: "Ex: Azul Índigo, Amarelo, Verde" },
      metodo_aplicacao: { label: "Método de Aplicação", type: "select", options: ["Luz Direta", "Mentalização", "Água Solarizada", "Ambiente Colorido"] },
      percepcao_cliente_durante: { label: "Percepção do Cliente Durante a Sessão", type: "textarea", rows: 2, placeholder: "Relato breve do cliente: relaxamento, visualizações, etc." },
      avaliacao_terapeuta_pos: { label: "Avaliação do Terapeuta Pós-Sessão", type: "textarea", rows: 2, placeholder: "Observações do terapeuta sobre a resposta do cliente." }
    },
    report_template: null
  },
  {
    id_key: "florais_bach_primeira_consulta",
    title: "Florais de Bach (Primeira Consulta)",
    category: "Terapia Vibracional",
    description: "Avaliação inicial para recomendação de essências florais de Bach.",
    type: "Avaliação",
    evaluation_schema: {
      estado_emocional_principal: { label: "Estado Emocional Principal Relatado", type: "text", placeholder: "Ex: Medo, Insegurança, Tristeza, Ansiedade" },
      queixas_secundarias: { label: "Queixas Secundárias / Aspectos a Trabalhar", type: "textarea", rows: 2, placeholder: "Outros sentimentos ou situações desafiadoras." },
      florais_considerados_inicialmente: { label: "Florais Considerados (Discussão Inicial)", type: "text", placeholder: "Ex: Mimulus, Larch, Gentian" },
      primeira_formula_recomendada: { label: "Primeira Fórmula Floral Recomendada", type: "textarea", rows: 3, placeholder: "Listar os florais e breve justificativa para cada um." },
      orientacoes_uso: { label: "Orientações de Uso", type: "text", placeholder: "Ex: 4 gotas, 4 vezes ao dia." }
    },
    report_template: null
  },
  {
    id_key: "reiki_nivel_1_aplicacao",
    title: "Reiki Nível 1 (Aplicação)",
    category: "Terapia Energética",
    description: "Sessão de aplicação de Reiki visando equilíbrio e bem-estar.",
    type: "Prática",
    evaluation_schema: {
      intencao_sessao: { label: "Intenção Principal para a Sessão", type: "text", placeholder: "Ex: Redução de estresse, Alívio de dores, Clareza mental" },
      posicoes_foco: { label: "Posições de Mãos com Maior Foco/Tempo", type: "text", placeholder: "Ex: Cabeça, Ombros, Plexo Solar" },
      sensacoes_terapeuta: { label: "Sensações Percebidas pelo Terapeuta", type: "textarea", rows: 2, placeholder: "Ex: Calor intenso na região X, Fluxo energético Y..." },
      feedback_cliente_imediato: { label: "Feedback Imediato do Cliente Pós-Sessão", type: "textarea", rows: 2, placeholder: "Relato do cliente sobre suas sensações." },
      observacoes_gerais_reikiano: { label: "Observações Gerais do Reikiano", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "reflexologia_podal_basica",
    title: "Reflexologia Podal Básica",
    category: "Terapia Corporal",
    description: "Estimulação de pontos reflexos nos pés para promover equilíbrio.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      principais_areas_sensibilidade: { label: "Principais Áreas de Sensibilidade nos Pés", type: "text", placeholder: "Ex: Ponto do Estômago, Região da Coluna Cervical" },
      pontos_trabalhados_enfase: { label: "Pontos Trabalhados com Maior Ênfase", type: "text", placeholder: "Descrever os pontos ou áreas." },
      reacao_cliente_estimulos: { label: "Reação do Cliente aos Estímulos", type: "textarea", rows: 2, placeholder: "Ex: Relaxamento profundo, Sensibilidade em pontos X, Leve desconforto em Y." },
      observacoes_terapeuta_reflexo: { label: "Observações do Terapeuta Reflexologista", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "meditacao_guiada_personalizada",
    title: "Meditação Guiada Personalizada",
    category: "Expansão da Consciência",
    description: "Criação e condução de uma meditação guiada adaptada às necessidades do cliente.",
    type: "Prática",
    evaluation_schema: {
      tema_foco_meditacao: { label: "Tema Central / Foco da Meditação", type: "text", placeholder: "Ex: Paz Interior, Conexão com Eu Superior, Liberação de Bloqueios" },
      elementos_utilizados_guia: { label: "Elementos Utilizados na Condução", type: "textarea", rows: 2, placeholder: "Ex: Visualizações da natureza, Afirmações positivas, Música suave." },
      feedback_cliente_experiencia: { label: "Feedback do Cliente Sobre a Experiência", type: "textarea", rows: 3 },
      insights_terapeuta_processo: { label: "Insights do Terapeuta Sobre o Processo", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "auriculoterapia_avaliacao_inicial",
    title: "Auriculoterapia (Avaliação Inicial)",
    category: "Diagnóstico Vibracional",
    description: "Inspeção e palpação do pavilhão auricular para identificar pontos de desequilíbrio.",
    type: "Avaliação",
    evaluation_schema: {
      queixa_principal_cliente: { label: "Queixa Principal do Cliente", type: "text" },
      pontos_dolorosos_detectados: { label: "Pontos Dolorosos ou Reativos Detectados na Orelha", type: "textarea", rows: 3, placeholder: "Ex: Ponto Shenmen, Ponto do Estômago, Ponto da Ansiedade..." },
      aspecto_geral_orelha: { label: "Aspecto Geral da Orelha (Cor, Textura, etc.)", type: "text", placeholder: "Ex: Palidez, Vermelhidão em áreas específicas, Descamação..." },
      protocolo_sugerido_tratamento: { label: "Protocolo de Pontos Sugerido para Tratamento", type: "textarea", rows: 3, placeholder: "Listar os pontos a serem tratados e o porquê." }
    },
    report_template: null
  },
  {
    id_key: "cristaloterapia_alinhamento_chakras",
    title: "Cristaloterapia (Alinhamento de Chakras)",
    category: "Terapia Energética",
    description: "Utilização de cristais para alinhamento e harmonização dos centros de energia (chakras).",
    type: "Prática/Avaliação",
    evaluation_schema: {
      chakras_foco_alinhamento: { label: "Chakras Foco do Alinhamento", type: "text", placeholder: "Ex: Todos os 7 principais, ou foco em específicos (Cardíaco, Laríngeo)." },
      cristais_utilizados_por_chakra: { label: "Cristais Utilizados (listar por chakra, se aplicável)", type: "textarea", rows: 4, placeholder: "Ex: Raiz - Jaspe Vermelho, Sacral - Cornalina..." },
      percepcao_fluxo_energetico: { label: "Percepção do Fluxo Energético (Terapeuta)", type: "textarea", rows: 2, placeholder: "Sensações do terapeuta durante a aplicação." },
      feedback_cliente_sensacoes: { label: "Feedback do Cliente (Sensações, Cores, Insights)", type: "textarea", rows: 3 }
    },
    report_template: null
  },
  {
    id_key: "mesa_radionica_diagnostico",
    title: "Mesa Radiônica (Diagnóstico)",
    category: "Diagnóstico Vibracional Avançado",
    description: "Diagnóstico energético e espiritual utilizando a mesa radiônica.",
    type: "Avaliação",
    evaluation_schema: {
      questao_principal_cliente: { label: "Questão Principal Trazida pelo Cliente", type: "text" },
      ferramentas_mesa_ativadas: { label: "Principais Ferramentas da Mesa Ativadas", type: "textarea", rows: 2, placeholder: "Ex: Espada de Miguel, Chama Trina, Florais Etéricos..." },
      percentuais_desequilibrio_medidos: { label: "Percentuais de Desequilíbrio Medidos (se aplicável)", type: "textarea", rows: 2, placeholder: "Ex: Campo emocional - 70% bloqueado, Prosperidade - 45%..." },
      orientacoes_finais_mesa: { label: "Orientações e Encaminhamentos da Mesa", type: "textarea", rows: 3 }
    },
    report_template: null
  },
  {
    id_key: "constelacao_familiar_individual_bonecos",
    title: "Constelação Familiar Individual (com Bonecos)",
    category: "Terapia Sistêmica",
    description: "Abordagem sistêmica para questões familiares e pessoais utilizando bonecos ou âncoras.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      tema_constelado: { label: "Tema Principal Trazido para a Constelação", type: "text" },
      elementos_sistema_representados: { label: "Elementos do Sistema Representados", type: "textarea", rows: 2, placeholder: "Ex: Eu, Pai, Mãe, Sintoma, Dinheiro..." },
      principais_dinamicas_reveladas: { label: "Principais Dinâmicas Sistêmicas Reveladas", type: "textarea", rows: 3 },
      frases_solucao_trabalhadas: { label: "Frases de Solução ou Cura Trabalhadas", type: "textarea", rows: 2 },
      insights_finais_cliente_terapeuta: { label: "Insights Finais (Cliente e Terapeuta)", type: "textarea", rows: 3 }
    },
    report_template: null
  },
  {
    id_key: "aromaterapia_consulta_oleos_essenciais",
    title: "Aromaterapia (Consulta e Recomendação)",
    category: "Terapia Vibracional",
    description: "Consulta para recomendação de óleos essenciais visando bem-estar físico e emocional.",
    type: "Avaliação",
    evaluation_schema: {
        objetivo_principal_cliente_com_aromaterapia: { label: "Objetivo Principal do Cliente com Aromaterapia", type: "text", placeholder: "Ex: Reduzir ansiedade, Melhorar o sono, Aumentar foco" },
        historico_saude_relevante: { label: "Histórico de Saúde Relevante (Alergias, Condições Médicas)", type: "textarea", rows: 2 },
        oleos_essenciais_considerados: { label: "Óleos Essenciais Considerados/Testados", type: "textarea", rows: 2, placeholder: "Ex: Lavanda, Hortelã-Pimenta, Olíbano" },
        sinergia_recomendada_composicao: { label: "Sinergia Recomendada (Composição e Proporção)", type: "textarea", rows: 3, placeholder: "Ex: Lavanda (3 gotas), Laranja Doce (2 gotas) em óleo carreador X" },
        metodo_uso_recomendado: { label: "Método de Uso Recomendado", type: "select", options: ["Inalação (Direta/Difusor)", "Uso Tópico (Massagem/Compressa)", "Escalda-pés", "Outro"] },
        precaucoes_especificas: { label: "Precauções Específicas", type: "textarea", rows: 2, placeholder: "Ex: Evitar exposição solar após uso tópico, Não ingerir, etc." }
    },
    report_template: null
  },
  {
    id_key: "apometria_quantica_basica",
    title: "Apometria Quântica (Sessão Básica)",
    category: "Terapia Energética Avançada",
    description: "Sessão de desdobramento e tratamento de corpos sutis e níveis de consciência.",
    type: "Prática/Avaliação",
    evaluation_schema: {
        queixa_principal_tratamento_apometrico: { label: "Queixa Principal para Tratamento Apométrico", type: "text" },
        niveis_corpos_trabalhados: { label: "Níveis/Corpos Sutis Trabalhados com Ênfase", type: "textarea", rows: 2, placeholder: "Ex: Corpo Astral, Mental Inferior, Nível de Vidas Passadas..." },
        tecnicas_apometricas_utilizadas: { label: "Principais Técnicas Apométricas Utilizadas", type: "textarea", rows: 2, placeholder: "Ex: Desdobramento, Dialimetria, Eteriatria, Cromoterapia Apométrica..." },
        resgates_encaminhamentos_realizados: { label: "Resgates/Encaminhamentos Realizados (se houver)", type: "textarea", rows: 2 },
        orientacoes_pos_sessao_cliente: { label: "Orientações Pós-Sessão para o Cliente", type: "textarea", rows: 2, placeholder: "Ex: Repouso, Hidratação, Evitar ambientes densos..." }
    },
    report_template: null
  },
  {
    id_key: "terapia_multidimensional_arcturiana",
    title: "Terapia Multidimensional Arcturiana",
    category: "Terapia Quântica Avançada",
    description: "Canalização de frequências arcturianas para cura e ascensão, utilizando geometria sagrada e códigos de luz.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      intencao_sessao_arcturiana: { label: "Intenção Principal da Sessão Arcturiana", type: "text", placeholder: "Ex: Limpeza de implantes etéricos, Ativação de DNA adormecido, Conexão com guias arcturianos" },
      simbolos_codigos_ativados: { label: "Símbolos/Códigos Arcturianos Ativados ou Canalizados", type: "textarea", rows: 2, placeholder: "Descrever símbolos visualizados ou ativados." },
      areas_corpos_foco_tratamento: { label: "Áreas do Corpo ou Corpos Sutis com Foco no Tratamento", type: "text", placeholder: "Ex: Coração, Terceiro Olho, Corpo Emocional Superior" },
      percepcoes_cliente_canalizacao: { label: "Percepções do Cliente Durante a Canalização", type: "textarea", rows: 3, placeholder: "Relato de sensações, visualizações, emoções." },
      orientacoes_arcturianas_recebidas: { label: "Orientações Arcturianas Recebidas (para o cliente)", type: "textarea", rows: 3, placeholder: "Mensagens ou direcionamentos canalizados." }
    },
    report_template: null
  },
  {
    id_key: "thetahealing_sessao_basica",
    title: "ThetaHealing® (Sessão Básica)",
    category: "Terapia Quântica",
    description: "Identificação e reprogramação de crenças limitantes em nível Theta, promovendo cura e bem-estar.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      questao_principal_theta: { label: "Questão Principal a ser Trabalhada na Sessão", type: "text", placeholder: "Ex: Dificuldade financeira, Problemas de relacionamento, Baixa autoestima" },
      crencas_raiz_identificadas_theta: { label: "Crenças Raiz Identificadas (e seus níveis)", type: "textarea", rows: 3, placeholder: "Ex: 'Não sou bom o suficiente' (nível fundamental), 'Dinheiro é sujo' (nível histórico)" },
      crencas_substituidas_canceladas_theta: { label: "Crenças Substituídas ou Canceladas", type: "textarea", rows: 2 },
      downloads_sentimentos_instalados_theta: { label: "Downloads de Sentimentos Instalados", type: "textarea", rows: 2, placeholder: "Ex: Eu sei como é viver com alegria, Eu sou merecedor(a) de amor..." },
      feedback_cliente_theta: { label: "Feedback do Cliente Pós-Sessão ThetaHealing®", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "barras_access_consciousness_sessao",
    title: "Barras de Access Consciousness®",
    category: "Terapia Energética",
    description: "Toque suave em 32 pontos na cabeça para liberar pensamentos, ideias, emoções, considerações e crenças limitantes.",
    type: "Prática",
    evaluation_schema: {
      pontos_corridos_maior_liberacao_barras: { label: "Pontos Corridos com Maior Percepção de Liberação (pelo facilitador ou cliente)", type: "text", placeholder: "Ex: Dinheiro, Controle, Criatividade, Cura, Alegria" },
      estado_cliente_antes_depois_barras: { label: "Estado do Cliente (Relato Antes e Depois da Sessão)", type: "textarea", rows: 2, placeholder: "Como se sentia antes e como se sente agora." },
      processos_verbais_utilizados_barras: { label: "Processos Verbais Utilizados Durante a Sessão (se houver)", type: "textarea", rows: 2, placeholder: "Ex: 'Tudo na vida vem a mim com Facilidade, Alegria e Glória®'" },
      observacoes_facilitador_barras: { label: "Observações do Facilitador de Barras", type: "textarea", rows: 2, placeholder: "Percepções sobre a energia, liberações, etc." }
    },
    report_template: null
  },
  {
    id_key: "pnl_sessao_transformacao",
    title: "PNL - Programação Neurolinguística",
    category: "Desenvolvimento Pessoal",
    description: "Aplicação de técnicas de PNL para reprogramação mental, comportamental e alcance de objetivos.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      objetivo_pnl_sessao: { label: "Objetivo Principal da Sessão de PNL", type: "text", placeholder: "Ex: Superar fobia de falar em público, Melhorar comunicação interpessoal, Aumentar autoconfiança" },
      estado_atual_pnl: { label: "Estado Atual do Cliente em Relação ao Objetivo", type: "textarea", rows: 2 },
      tecnicas_pnl_aplicadas_sessao: { label: "Técnicas de PNL Aplicadas na Sessão", type: "textarea", rows: 2, placeholder: "Ex: Âncora, Ressignificação em 6 passos, Ponte ao Futuro, Swish" },
      estado_desejado_pnl: { label: "Estado Desejado Pós-Sessão (Verificação)", type: "textarea", rows: 2 },
      tarefas_acompanhamento_pnl: { label: "Tarefas de Acompanhamento ou 'Exercícios para Casa'", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "hipnose_clinica_sessao",
    title: "Hipnose Clínica / Ericksoniana",
    category: "Terapia Mental/Emocional",
    description: "Utilização do estado hipnótico para acessar o subconsciente, promover mudanças, ressignificar traumas e potencializar recursos internos.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      objetivo_sessao_hipnotica: { label: "Objetivo Terapêutico da Sessão de Hipnose", type: "text", placeholder: "Ex: Controle da ansiedade, Parar de fumar, Regressão de memória (se aplicável e ético)" },
      tipo_inducao_hipnotica_utilizada: { label: "Tipo de Indução Hipnótica Utilizada", type: "text", placeholder: "Ex: Relaxamento Progressivo, Visualização Criativa, Confusão (Ericksoniana)" },
      nivel_transe_alcancado_percepcao: { label: "Nível de Transe Alcançado (Percepção do Terapeuta/Cliente)", type: "select", options: ["Leve", "Médio", "Profundo"] },
      sugestoes_metaforas_principais_trabalhadas: { label: "Sugestões ou Metáforas Principais Trabalhadas Durante o Transe", type: "textarea", rows: 3 },
      feedback_cliente_pos_hipnose: { label: "Feedback do Cliente Imediatamente Após a Sessão", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "geobiologia_harmonizacao_ambientes_sessao",
    title: "Geobiologia e Harmonização de Ambientes",
    category: "Harmonização de Ambientes",
    description: "Diagnóstico e correção de energias telúricas, interferências eletromagnéticas e outras desarmonias em ambientes residenciais ou comerciais.",
    type: "Avaliação/Prática",
    evaluation_schema: {
      tipo_ambiente_avaliado_geo: { label: "Tipo de Ambiente Avaliado", type: "select", options: ["Residencial (Casa/Apto)", "Comercial (Loja/Escritório)", "Terreno"] },
      queixas_principais_ambiente_geo: { label: "Queixas Principais Relacionadas ao Ambiente", type: "textarea", rows: 2, placeholder: "Ex: Insônia, Brigas constantes, Negócios não prosperam" },
      instrumentos_diagnostico_geo_utilizados: { label: "Instrumentos de Diagnóstico Utilizados", type: "text", placeholder: "Ex: Dual Rod, Aurameter, Pêndulo, Medidor EMF" },
      principais_desarmonias_detectadas_geo_sessao: { label: "Principais Desarmonias Detectadas (Geopatias, Veios d'água, Redes Hartmann/Curry, Eletromagnetismo, Memórias de Parede)", type: "textarea", rows: 3 },
      solucoes_harmonizacao_aplicadas_sugeridas_geo: { label: "Soluções de Harmonização Aplicadas ou Sugeridas", type: "textarea", rows: 3, placeholder: "Ex: Placas radiônicas, Cristais, Gráficos de correção, Reposicionamento de móveis, Plantas específicas" }
    },
    report_template: null
  },
  {
    id_key: "tarot_terapeutico_leitura_completa",
    title: "Tarot Terapêutico / Arquetípico",
    category: "Oráculos e Autoconhecimento",
    description: "Uso do Tarot como ferramenta de autoconhecimento, diagnóstico de padrões inconscientes e orientação terapêutica.",
    type: "Avaliação",
    evaluation_schema: {
      questao_principal_tarot_leitura: { label: "Questão Principal ou Área da Vida Trazida para a Leitura", type: "text" },
      metodo_tiragem_tarot_utilizado: { label: "Método de Tiragem Utilizado", type: "text", placeholder: "Ex: Cruz Celta, Mandala Astrológica, Peladan, Caminho da Vida" },
      arcanos_maiores_relevantes_tarot: { label: "Arcanos Maiores de Maior Relevância na Leitura e Suas Posições", type: "textarea", rows: 2 },
      arcanos_menores_significativos_tarot: { label: "Arcanos Menores Significativos e Suas Posições/Aspectos", type: "textarea", rows: 2 },
      interpretacao_insights_principais_tarot_leitura: { label: "Interpretação e Insights Psicológicos/Arquetípicos Principais da Leitura", type: "textarea", rows: 4 },
      aconselhamentos_orientacoes_terapeuticas_tarot: { label: "Aconselhamentos e Orientações Terapêuticas Baseadas na Leitura", type: "textarea", rows: 3 }
    },
    report_template: null
  },
  {
    id_key: "numerologia_cabalistica_mapa_completo",
    title: "Numerologia Cabalística (Mapa Pessoal Completo)",
    category: "Autoconhecimento",
    description: "Estudo numerológico aprofundado do nome completo e data de nascimento para revelar potenciais, desafios, missão de vida e ciclos.",
    type: "Avaliação",
    evaluation_schema: {
      nome_completo_nascimento_numerologia: { label: "Nome Completo de Nascimento (conforme certidão)", type: "text" },
      data_nascimento_numerologia: { label: "Data de Nascimento (DD/MM/AAAA)", type: "date" },
      numero_motivacao_alma: { label: "Número de Motivação (Alma)", type: "text", placeholder: "Cálculo e interpretação breve" },
      numero_impressao_personalidade: { label: "Número de Impressão (Personalidade Aparente)", type: "text", placeholder: "Cálculo e interpretação breve" },
      numero_expressao_missao: { label: "Número de Expressão (Missão de Vida/Caminho do Destino)", type: "text", placeholder: "Cálculo e interpretação breve" },
      dividas_carmicas_identificadas: { label: "Dívidas Cármicas Identificadas (se houver)", type: "text", placeholder: "Ex: 13, 14, 16, 19" },
      licoes_carmicas_identificadas: { label: "Lições Cármicas Identificadas (se houver)", type: "text", placeholder: "Números ausentes no nome" },
      principais_ciclos_vida_numerologia: { label: "Principais Ciclos de Vida (Formativos, Produtivos, Colheita) e Seus Números", type: "textarea", rows: 2 },
      ano_pessoal_atual_numerologia: { label: "Ano Pessoal Atual e Suas Influências", type: "text" },
      interpretacao_geral_potencialidades_desafios_numerologia: { label: "Interpretação Geral: Potencialidades e Desafios Revelados", type: "textarea", rows: 4 }
    },
    report_template: null
  },
  {
    id_key: "magnified_healing_sessao_completa",
    title: "Magnified Healing® (Sessão Completa)",
    category: "Terapia Energética Avançada",
    description: "Prática de cura que utiliza a energia da Deusa Kwan Yin para transmutação, cura do carma e preparação para a ascensão.",
    type: "Prática",
    evaluation_schema: {
      fase_magnified_healing_aplicada_sessao: { label: "Fase de Magnified Healing® Aplicada", type: "select", options: ["Fase 1 (Cura)", "Fase 3 (Light Healing - Cura à Distância/Transplante de Órgãos Etéricos)"] },
      intencao_cura_magnified_sessao: { label: "Intenção de Cura para a Sessão (Cliente e Praticante)", type: "text" },
      passos_protocolo_magnified_realizados: { label: "Passos do Protocolo Realizados com Ênfase", type: "textarea", rows: 2, placeholder: "Ex: Conexão com o Altíssimo Deus do Universo, Cura do Carma, Expansão da Chama Trina" },
      observacoes_praticante_magnified_sessao: { label: "Observações do Praticante Durante a Sessão (Energia, Visualizações, Mensagens)", type: "textarea", rows: 3 },
      feedback_cliente_magnified_sessao: { label: "Feedback do Cliente Pós-Sessão (Sensações, Insights)", type: "textarea", rows: 3 }
    },
    report_template: null
  },
  {
    id_key: "registros_akashicos_leitura_aprofundada",
    title: "Registros Akáshicos (Leitura Aprofundada)",
    category: "Expansão da Consciência",
    description: "Acesso aos registros da alma para obter informações detalhadas, cura de padrões, compreensão de contratos de alma e orientação espiritual.",
    type: "Avaliação/Prática",
    evaluation_schema: {
      foco_principal_leitura_akashica: { label: "Foco Principal ou Questões para a Leitura Akáshica", type: "textarea", rows: 2 },
      oracao_portal_akashico_utilizada: { label: "Oração de Abertura do Portal Akáshico Utilizada (se aplicável)", type: "text", placeholder: "Ex: Oração Sagrada, Oração do Coração, etc." },
      informacoes_relevantes_vidas_passadas_acessadas: { label: "Informações Relevantes de Vidas Passadas Acessadas (se pertinente à questão)", type: "textarea", rows: 3 },
      padroes_contratos_alma_identificados_akasha: { label: "Padrões Repetitivos ou Contratos de Alma Identificados", type: "textarea", rows: 2 },
      curas_liberacoes_energeticas_ocorridas_akasha: { label: "Curas ou Liberações Energéticas Ocorridas Durante a Leitura", type: "textarea", rows: 2 },
      orientacoes_guias_mestres_akashicos: { label: "Orientações dos Guias e Mestres dos Registros Akáshicos", type: "textarea", rows: 3 }
    },
    report_template: null
  },
  {
    id_key: "xamanismo_ancestral_resgate_alma",
    title: "Xamanismo Ancestral (Resgate de Alma)",
    category: "Terapia Espiritual",
    description: "Prática xamânica profunda para resgatar fragmentos de alma perdidos devido a traumas ou choques, restaurando a integridade energética.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      motivo_busca_resgate_alma: { label: "Motivo da Busca pelo Resgate de Alma (Sintomas, Sensação de Vazio, etc.)", type: "textarea", rows: 2 },
      jornada_xamanica_realizada_para_resgate: { label: "Jornada Xamânica Realizada (Mundo Inferior, Médio ou Superior)", type: "text" },
      fragmentos_alma_resgatados_idade_situacao: { label: "Fragmentos de Alma Resgatados (Idade Aproximada, Situação Associada)", type: "textarea", rows: 3 },
      qualidades_dons_retornados_com_fragmentos: { label: "Qualidades ou Dons Retornados com os Fragmentos", type: "textarea", rows: 2 },
      integracao_pos_resgate_orientacoes: { label: "Orientações para Integração Pós-Resgate", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "psicotronica_aplicada_saude_bem_estar",
    title: "Psicotrônica Aplicada à Saúde e Bem-Estar",
    category: "Técnicas Mentais Avançadas",
    description: "Uso direcionado da mente e de equipamentos psicotrônicos (se aplicável) para influenciar campos energéticos visando saúde e equilíbrio.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      objetivo_especifico_saude_psicotronica: { label: "Objetivo Específico de Saúde ou Bem-Estar", type: "text" },
      metodologia_psicotronica_utilizada: { label: "Metodologia Psicotrônica Utilizada", type: "textarea", rows: 2, placeholder: "Ex: Emissão mental de frequências, Uso de gráficos radiônicos potencializados, Programação de cristais" },
      parametros_avaliados_antes_depois_psicotronica: { label: "Parâmetros Avaliados Antes e Depois da Aplicação (se mensurável)", type: "textarea", rows: 2, placeholder: "Ex: Nível de dor, Qualidade do sono, Disposição energética" },
      percepcoes_subjetivas_cliente_psicotronica: { label: "Percepções Subjetivas do Cliente Durante/Após a Aplicação", type: "textarea", rows: 2 },
      observacoes_terapeuta_psicotronica: { label: "Observações do Terapeuta Psicotrônico", type: "textarea", rows: 2 }
    },
    report_template: null
  },
  {
    id_key: "coaching_quantico_manifestacao_realidade",
    title: "Coaching Quântico para Manifestação",
    category: "Desenvolvimento Pessoal Avançado",
    description: "Processo de coaching focado em alinhar pensamentos, emoções e ações com os princípios quânticos para manifestar objetivos e uma nova realidade.",
    type: "Prática/Avaliação",
    evaluation_schema: {
      objetivo_manifestacao_coaching_quantico: { label: "Objetivo Principal de Manifestação do Coachee", type: "text" },
      crencas_limitantes_identificadas_sobre_manifestacao: { label: "Crenças Limitantes Identificadas em Relação ao Objetivo", type: "textarea", rows: 2 },
      principios_quanticos_aplicados_coaching: { label: "Princípios Quânticos Aplicados no Processo", type: "textarea", rows: 2, placeholder: "Ex: Lei da Atração, Colapso da Função de Onda, Emaranhamento Quântico (metafórico)" },
      tecnicas_ferramentas_quanticas_utilizadas_coaching: { label: "Técnicas e Ferramentas Quânticas Utilizadas", type: "textarea", rows: 2, placeholder: "Ex: Visualização Criativa 5D, Afirmações Quânticas, Meditação de Ponto Zero" },
      evidencias_progresso_manifestacao: { label: "Evidências de Progresso e Sincronicidades Observadas", type: "textarea", rows: 3 },
      proximos_passos_plano_acao_quantico: { label: "Próximos Passos e Ajustes no Plano de Ação Quântico", type: "textarea", rows: 2 }
    },
    report_template: null
  }
];