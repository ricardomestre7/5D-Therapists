import React from 'react';

export const patientFormStructure = {
  personalInfo: {
    title: 'Informações Pessoais',
    icon: 'UserCircle', 
    fields: [
      { id: 'full_name', label: 'Nome Completo', type: 'text', required: true, placeholder: 'Nome completo do paciente' },
      { id: 'email', label: 'E-mail', type: 'email', placeholder: 'email@example.com' },
      { id: 'phone', label: 'Telefone', type: 'tel', placeholder: '(XX) XXXXX-XXXX' },
      { id: 'birth_date', label: 'Data de Nascimento', type: 'date' },
      { 
        id: 'gender', 
        label: 'Gênero', 
        type: 'select', 
        placeholder: 'Selecione o gênero',
        options: [
          { value: 'masculino', label: 'Masculino' },
          { value: 'feminino', label: 'Feminino' },
          { value: 'outro', label: 'Outro' },
          { value: 'nao_informar', label: 'Prefiro não informar' }
        ]
      },
      { id: 'address', label: 'Endereço', type: 'text', placeholder: 'Rua, Número, Bairro' },
      { id: 'city', label: 'Cidade', type: 'text', placeholder: 'Cidade' },
      { id: 'state', label: 'Estado', type: 'text', placeholder: 'UF' },
      { id: 'zip_code', label: 'CEP', type: 'text', placeholder: 'XXXXX-XXX' },
    ]
  },
  professionalAnamnesis: {
    title: 'Anamnese e Informações Profissionais',
    icon: 'Briefcase',
    fields: [
      { id: 'occupation', label: 'Ocupação/Profissão', type: 'text', placeholder: 'Profissão atual' },
      { 
        id: 'marital_status', 
        label: 'Estado Civil', 
        type: 'select',
        placeholder: 'Selecione o estado civil',
        options: [
          { value: 'solteiro', label: 'Solteiro(a)' },
          { value: 'casado', label: 'Casado(a)' },
          { value: 'divorciado', label: 'Divorciado(a)' },
          { value: 'viuvo', label: 'Viuvo(a)' },
          { value: 'uniao_estavel', label: 'União Estável' },
        ]
      },
      { id: 'emergency_contact_name', label: 'Nome do Contato de Emergência', type: 'text', placeholder: 'Nome completo do contato' },
      { id: 'emergency_contact_phone', label: 'Telefone do Contato de Emergência', type: 'tel', placeholder: '(XX) XXXXX-XXXX' },
    ]
  },
  healthHistory: {
    title: 'Histórico de Saúde e Queixas',
    icon: 'HeartPulse',
    fields: [
      { id: 'main_complaint', label: 'Queixa Principal', type: 'textarea', rows: 3, required: true, placeholder: 'Descreva a principal queixa do paciente' },
      { id: 'history_of_illness', label: 'Histórico da Doença Atual', type: 'textarea', rows: 4, placeholder: 'Detalhes sobre a evolução da queixa' },
      { id: 'previous_treatments', label: 'Tratamentos Anteriores', type: 'textarea', rows: 3, placeholder: 'Quais tratamentos já foram realizados?' },
      { id: 'medications_in_use', label: 'Medicações em Uso', type: 'textarea', rows: 3, placeholder: 'Liste todas as medicações' },
      { id: 'allergies', label: 'Alergias', type: 'textarea', rows: 2, placeholder: 'Alguma alergia conhecida?' },
      { id: 'family_history', label: 'Histórico Familiar Relevante', type: 'textarea', rows: 3, placeholder: 'Doenças importantes na família' },
      { id: 'lifestyle_habits', label: 'Hábitos de Vida', type: 'textarea', rows: 3, placeholder: 'Alimentação, sono, exercícios, vícios' },
    ]
  },
  psychoSpiritualState: {
    title: 'Estado Psicoemocional e Espiritual',
    icon: 'Sparkles',
    fields: [
      { id: 'emotional_state', label: 'Estado Emocional Geral', type: 'textarea', rows: 3, placeholder: 'Como o paciente se sente emocionalmente?' },
      { id: 'mental_state', label: 'Estado Mental/Cognitivo', type: 'textarea', rows: 3, placeholder: 'Clareza mental, concentração, memória' },
      { id: 'spiritual_state', label: 'Crenças e Práticas Espirituais', type: 'textarea', rows: 3, placeholder: 'Conexão espiritual, crenças, práticas' },
      { id: 'objectives', label: 'Objetivos com a Terapia', type: 'textarea', rows: 3, required: true, placeholder: 'O que o paciente espera alcançar?' },
      { id: 'additional_notes', label: 'Notas Adicionais do Terapeuta', type: 'textarea', rows: 4, placeholder: 'Observações e informações relevantes' },
    ]
  }
};

export const getInitialPatientFormData = () => {
  let initialState = {};
  Object.values(patientFormStructure).forEach(section => {
    section.fields.forEach(field => {
      initialState[field.id] = '';
    });
  });
  return initialState;
};