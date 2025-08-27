import React from 'react';

export const quantumPracticeTemplates = [
    { 
        id: 'chakra_visualization', 
        title: 'Visualização Guiada de Alinhamento dos Chakras', 
        category: 'energetic',
        description: 'Uma meditação guiada para equilibrar e alinhar os sete principais chakras, promovendo bem-estar e harmonia interior.',
        content: [
            { type: 'subtitle', text: 'Preparação' },
            { type: 'paragraph', text: 'Encontre um lugar calmo e confortável. Sente-se ou deite-se com a coluna ereta. Feche os olhos suavemente.' },
            { type: 'subtitle', text: 'Visualização' },
            { type: 'list', items: [
                'Concentre-se na sua respiração, inspirando e expirando profundamente.',
                'Visualize o chakra raiz (Muladhara) na base da sua coluna, como uma luz vermelha vibrante.',
                'Suba para o chakra sacral (Svadhisthana), abaixo do umbigo, visualizando uma luz laranja.',
                'Continue para o plexo solar (Manipura), acima do umbigo, com uma luz amarela brilhante.',
                'No centro do peito, o chakra cardíaco (Anahata), visualize uma luz verde esmeralda.',
                'Na garganta, o chakra laríngeo (Vishuddha), com uma luz azul celeste.',
                'Entre as sobrancelhas, o chakra frontal (Ajna), uma luz índigo profunda.',
                'No topo da cabeça, o chakra coronário (Sahasrara), uma luz violeta ou branca luminosa.',
                'Permaneça sentindo a energia fluindo por todos os chakras alinhados.'
            ]},
            { type: 'subtitle', text: 'Finalização' },
            { type: 'paragraph', text: 'Traga sua consciência de volta ao corpo. Mova suavemente os dedos das mãos e dos pés. Abra os olhos quando estiver pronto.' }
        ],
        durationMinutes: 20,
        keywords: ['chakras', 'alinhamento', 'meditação', 'visualização', 'energia']
    },
    {
        id: 'frequency_528hz',
        title: 'Sessão de Frequência 528Hz',
        category: 'energetic',
        description: 'Sessão de áudio com a frequência de 528Hz, conhecida como a "frequência do amor", associada à reparação do DNA e clareza mental.',
        content: [
            { type: 'paragraph', text: 'Esta prática envolve a audição da frequência de 528Hz. Recomenda-se o uso de fones de ouvido de boa qualidade.'},
            { type: 'subtitle', text: 'Instruções'},
            { type: 'list', items: [
                'Encontre um ambiente tranquilo onde não seja interrompido.',
                'Use fones de ouvido e ajuste o volume para um nível confortável.',
                'Feche os olhos e concentre-se na sua respiração enquanto ouve a frequência.',
                'Permita que as vibrações sonoras permeiem seu corpo e mente.',
                'Ao final, permaneça em silêncio por alguns minutos, observando suas sensações.'
            ]}
        ],
        frequency: '528Hz',
        durationMinutes: 15,
        keywords: ['528hz', 'frequência', 'transformação', 'milagres', 'reparo dna', 'amor']
    },
    {
        id: 'gratitude_meditation',
        title: 'Meditação da Gratidão Profunda',
        category: 'emotional',
        description: 'Uma prática para cultivar a gratidão, elevando a vibração pessoal e atraindo mais positividade para a vida.',
        content: [
            { type: 'paragraph', text: 'A gratidão é uma ferramenta poderosa para transformar sua perspectiva e bem-estar.' },
            { type: 'subtitle', text: 'Como praticar:'},
            { type: 'list', items: [
                'Sente-se confortavelmente e feche os olhos.',
                'Respire profundamente algumas vezes para relaxar.',
                'Traga à mente três coisas pelas quais você é grato hoje. Pode ser algo simples.',
                'Para cada item, sinta verdadeiramente a gratidão em seu coração.',
                'Expanda esse sentimento, agradecendo por sua saúde, seus relacionamentos, suas oportunidades.',
                'Termine com uma afirmação de gratidão, como: "Eu sou grato por todas as bênçãos em minha vida."'
            ]}
        ],
        durationMinutes: 10,
        keywords: ['gratidão', 'meditação', 'positividade', 'bem-estar emocional']
    },
    {
        id: 'hooponopono_healing',
        title: 'Prática de Ho\'oponopono',
        category: 'emotional',
        description: 'Utilize as quatro frases sagradas do Ho\'oponopono para limpar memórias e padrões negativos.',
        content: [
            { type: 'paragraph', text: 'Ho\'oponopono é uma antiga prática havaiana de reconciliação e perdão.' },
            { type: 'subtitle', text: 'As Quatro Frases:'},
            { type: 'list', items: [
                'Sinto muito.',
                'Me perdoe.',
                'Te amo.',
                'Sou grato(a).'
            ]},
            { type: 'subtitle', text: 'Como praticar:'},
            { type: 'list', items: [
                'Pense em uma situação, pessoa ou memória que cause desconforto.',
                'Repita as quatro frases, direcionando-as à Divindade Interior, ao Universo ou à situação em si.',
                'Não é necessário sentir as emoções no momento, apenas repita as frases com intenção.',
                'Confie que a limpeza está ocorrendo em níveis mais profundos.'
            ]}
        ],
        durationMinutes: 10,
        keywords: ['hooponopono', 'cura', 'perdão', 'amor', 'gratidão', 'limpeza']
    },
    {
        id: 'mindfulness_breathing',
        title: 'Respiração Consciente (Mindfulness)',
        category: 'mental',
        description: 'Uma prática fundamental de mindfulness para ancorar a atenção no momento presente através da respiração.',
        content: [
            { type: 'paragraph', text: 'A respiração consciente ajuda a acalmar a mente e reduzir o estresse.'},
            { type: 'subtitle', text: 'Passos:'},
            { type: 'list', items: [
                'Sente-se em uma posição confortável, com a coluna ereta mas relaxada.',
                'Feche os olhos ou mantenha um olhar suave para baixo.',
                'Traga sua atenção para sua respiração. Observe o ar entrando e saindo do seu corpo.',
                'Sinta as sensações da respiração: o ar passando pelas narinas, o movimento do abdômen ou peito.',
                'Quando a mente divagar (o que é normal), gentilmente traga o foco de volta para a respiração.',
                'Pratique por 5-10 minutos, ou o tempo que desejar.'
            ]}
        ],
        durationMinutes: 10,
        keywords: ['mindfulness', 'respiração', 'atenção plena', 'calma', 'estresse']
    }
];