import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, SlidersHorizontal } from 'lucide-react';

const TechniqueFormDialog = ({ 
  isOpen, 
  onOpenChange, 
  currentTechnique, 
  formState, 
  onFormStateChange, 
  onSubmit, 
  isSubmitting,
  onSetCurrentTechnique
}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormStateChange(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseDialog = () => {
    onOpenChange(false);
    if (!isOpen) { // Check if it was truly closed, not just a re-render
        onSetCurrentTechnique(null);
        onFormStateChange({ 
            title: '', description: '', category: '', type: '', 
            core_principles: '', target_conditions: '', techniques_practices: '', 
            contraindications: '', evaluation_schema: '', report_template: '', id_key: '' 
        });
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[600px] bg-slate-850 border-cyan-500/50 text-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
            {currentTechnique ? 'Editar Técnica' : 'Adicionar Nova Técnica'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Preencha os detalhes da sua técnica terapêutica. Campos JSON devem ser válidos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <Input name="title" placeholder="Título da Técnica (ex: Radiestesia Avançada)" value={formState.title} onChange={handleInputChange} required className="bg-slate-800 border-slate-700 focus:border-cyan-500" />
          <Input name="id_key" placeholder="ID Chave (ex: radiestesia_avancada)" value={formState.id_key} onChange={handleInputChange} className="bg-slate-800 border-slate-700 focus:border-cyan-500" />
          <Textarea name="description" placeholder="Descrição detalhada da técnica" value={formState.description} onChange={handleInputChange} className="bg-slate-800 border-slate-700 focus:border-cyan-500" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="category" placeholder="Categoria (ex: Energética, Mental)" value={formState.category} onChange={handleInputChange} className="bg-slate-800 border-slate-700 focus:border-cyan-500" />
            <Input name="type" placeholder="Tipo (ex: Curso, Prática, Avaliação)" value={formState.type} onChange={handleInputChange} className="bg-slate-800 border-slate-700 focus:border-cyan-500" />
          </div>
          <Textarea name="core_principles" placeholder='Princípios Chave (JSON, ex: {"principio1": "desc"})' value={formState.core_principles} onChange={handleInputChange} rows={3} className="bg-slate-800 border-slate-700 focus:border-cyan-500 font-mono text-sm" />
          <Input name="target_conditions" placeholder="Condições Alvo (separadas por vírgula, ex: ansiedade, estresse)" value={formState.target_conditions} onChange={handleInputChange} className="bg-slate-800 border-slate-700 focus:border-cyan-500" />
          <Textarea name="techniques_practices" placeholder='Técnicas/Práticas Específicas (JSON, ex: [{"nome": "uso do pêndulo"}])' value={formState.techniques_practices} onChange={handleInputChange} rows={3} className="bg-slate-800 border-slate-700 focus:border-cyan-500 font-mono text-sm" />
          <Textarea name="contraindications" placeholder="Contraindicações ou precauções" value={formState.contraindications} onChange={handleInputChange} className="bg-slate-800 border-slate-700 focus:border-cyan-500" />
          
          <div className="border-t border-cyan-500/30 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center"><SlidersHorizontal className="mr-2 h-5 w-5"/> Configuração da Avaliação (Opcional)</h3>
              <Textarea name="evaluation_schema" placeholder='Esquema de Avaliação (JSON, ex: {"campo1": {"label": "Nome Campo", "type": "texto"}, "campo2": {"label":"Opções", "type":"select", "options":["A","B"]}})' value={formState.evaluation_schema} onChange={handleInputChange} rows={4} className="bg-slate-800 border-slate-700 focus:border-cyan-500 font-mono text-sm" />
              <Textarea name="report_template" placeholder='Template do Relatório (JSON, para estrutura do relatório individual)' value={formState.report_template} onChange={handleInputChange} rows={4} className="bg-slate-800 border-slate-700 focus:border-cyan-500 font-mono text-sm mt-2" />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={handleCloseDialog} className="text-slate-300 border-slate-600 hover:bg-slate-700">Cancelar</Button>
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (currentTechnique ? 'Salvar Alterações' : 'Adicionar Técnica')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TechniqueFormDialog;