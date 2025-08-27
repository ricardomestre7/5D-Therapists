import React from 'react';

export const quantumQuestions = {
  physical: [
    { id: 'physical_1', question: 'Como você avalia sua energia física geral ultimamente?', answerOptions: [{ value: '1', label: 'Muito Baixa' }, { value: '2', label: 'Baixa' }, { value: '3', label: 'Moderada' }, { value: '4', label: 'Alta' }, { value: '5', label: 'Muito Alta' }] },
    { id: 'physical_2', question: 'Você tem sentido dores ou desconfortos físicos frequentes?', answerOptions: [{ value: '1', label: 'Sim, constantemente' }, { value: '2', label: 'Sim, frequentemente' }, { value: '3', label: 'Ocasionalmente' }, { value: '4', label: 'Raramente' }, { value: '5', label: 'Não' }] },
  ],
  emotional: [
    { id: 'emotional_1', question: 'Como está seu equilíbrio emocional?', answerOptions: [{ value: '1', label: 'Muito Instável' }, { value: '2', label: 'Instável' }, { value: '3', label: 'Neutro' }, { value: '4', label: 'Estável' }, { value: '5', label: 'Muito Estável' }] },
    { id: 'emotional_2', question: 'Com que frequência você se sente sobrecarregado(a) emocionalmente?', answerOptions: [{ value: '1', label: 'Sempre' }, { value: '2', label: 'Frequentemente' }, { value: '3', label: 'Às Vezes' }, { value: '4', label: 'Raramente' }, { value: '5', label: 'Nunca' }] },
  ],
  mental: [
    { id: 'mental_1', question: 'Como você descreveria sua clareza mental e foco?', answerOptions: [{ value: '1', label: 'Muito Ruim' }, { value: '2', label: 'Ruim' }, { value: '3', label: 'Regular' }, { value: '4', label: 'Bom' }, { value: '5', label: 'Excelente' }] },
    { id: 'mental_2', question: 'Você tem tido dificuldade de concentração ou memória?', answerOptions: [{ value: '1', label: 'Muita Dificuldade' }, { value: '2', label: 'Alguma Dificuldade' }, { value: '3', label: 'Pouca Dificuldade' }, { value: '4', label: 'Quase Nenhuma' }, { value: '5', label: 'Nenhuma Dificuldade' }] },
  ],
  spiritual: [
    { id: 'spiritual_1', question: 'Quão conectado(a) você se sente com seu propósito de vida?', answerOptions: [{ value: '1', label: 'Nada Conectado(a)' }, { value: '2', label: 'Pouco Conectado(a)' }, { value: '3', label: 'Moderadamente' }, { value: '4', label: 'Conectado(a)' }, { value: '5', label: 'Muito Conectado(a)' }] },
    { id: 'spiritual_2', question: 'Você tem dedicado tempo para práticas espirituais ou de autoconhecimento?', answerOptions: [{ value: '1', label: 'Não, Nenhuma' }, { value: '2', label: 'Raramente' }, { value: '3', label: 'Ocasionalmente' }, { value: '4', label: 'Frequentemente' }, { value: '5', label: 'Diariamente' }] },
  ],
   energetic: [
    { id: 'energetic_1', question: 'Você se sente energizado e vitalizado na maior parte do tempo?', answerOptions: [{ value: '1', label: 'Nunca' }, { value: '2', label: 'Raramente' }, { value: '3', label: 'Às vezes' }, { value: '4', label: 'Frequentemente' }, { value: '5', label: 'Sempre' }] },
    { id: 'energetic_2', question: 'Você se sente sensível a energias de ambientes ou pessoas?', answerOptions: [{ value: '1', label: 'Extremamente sensível' }, { value: '2', label: 'Bastante sensível' }, { value: '3', label: 'Moderadamente sensível' }, { value: '4', label: 'Pouco sensível' }, { value: '5', label: 'Nada sensível' }] },
  ],
};