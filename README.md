# 5D-Therapists

> Aplicativo multidimensional para terapeutas conscientes

---

## ✨ Visão Geral da Arquitetura do Aplicativo

Nosso aplicativo é construído sobre uma arquitetura de ponta, utilizando tecnologias modernas para garantir performance, segurança e uma excelente experiência de usuário.

---

## 🔧 Fundação Tecnológica (Frontend)

- **React com Vite**: O coração do aplicativo é o React, permitindo uma interface interativa e modular (SPA), com construção e otimização via Vite.
- **TailwindCSS**: Estilização "utility-first" para um design responsivo e limpo.
- **shadcn/ui**: Componentes acessíveis e elegantes, totalmente personalizáveis.
- **Framer Motion**: Transições e animações suaves, criando uma experiência imersiva.

---

## 📁 Backend e Banco de Dados (Supabase)

- **Autenticação Segura**: Cadastro e login de terapeutas.
- **PostgreSQL**: Banco de dados relacional robusto com tabelas para pacientes, terapeutas, análises quânticas, jornada e técnicas.
- **APIs em Tempo Real**: APIs geradas automaticamente para comunicação com o frontend.

---

## 🔍 Estrutura do Código

- `src/components`: Componentes reutilizáveis de interface.
- `src/hooks`: Hooks com lógica isolada (ex: `useDashboardLogic`).
- `src/lib/services`: Camada de serviços para comunicação com Supabase.
- `Context API`: Gerenciamento global de autenticação e sessão do terapeuta.

---

## 🚀 Funcionalidades Aplicadas

### 🔐 Autenticação Completa

- Páginas de cadastro e login seguras.
- Rotas protegidas por autenticação.

### 📊 Dashboard Inteligente

- Estatísticas de pacientes e terapeutas.
- Cards interativos e sistema de busca em tempo real.

### 👨‍⚕️ Gerenciamento de Pacientes

- Formulário detalhado com seções (anamnese, histórico, etc.).
- Edição, exclusão e vinculação com análises e histórico.

### ⚛️ Análise Quântica 5D

- Questionário por categoria (Físico, Emocional, Mental, etc.).
- Cálculo automático de percentuais e recomendações.
- Resultados salvos e vinculados ao paciente.

### 🔄 Resultados Detalhados

- Gráfico de radar da análise.
- Gráfico de evolução ao longo do tempo.
- Linha do tempo da jornada terapêutica.
- Atualização manual da fase do paciente.

### 📚 Base de Conhecimento e Avaliação de Técnicas

- Cadastro, edição e exclusão de técnicas.
- Definição de formulários personalizados para avaliação.
- Avaliação aplicada e registrada na linha do tempo.

---

## 📖 Desenvolvido por

**Mestre Ricardo e Equipe 5D Therapists**  
> Aplicando consciência quântica ao cuidado terapêutico do futuro.

---

> Para colaborações, sugestões ou dúvidas, entre em contato através do repositório ou pelos canais da Cyntreon.
