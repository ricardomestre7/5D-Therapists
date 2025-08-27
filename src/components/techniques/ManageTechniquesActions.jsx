import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Sparkles, Loader2, Search } from 'lucide-react';

const ManageTechniquesActions = ({ 
  searchTerm, 
  onSearchTermChange, 
  onPopulateInitial, 
  onAddNew, 
  isPopulating, 
  isLoading 
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="relative w-full sm:max-w-xs">
        <Input 
          type="text"
          placeholder="Buscar técnicas..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pl-10 bg-slate-800/70 border-cyan-500/50 focus:border-cyan-400 text-slate-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" />
      </div>
      <div className="flex gap-2">
          <Button onClick={onPopulateInitial} variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20" disabled={isPopulating || isLoading}>
              {isPopulating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              Popular Iniciais
          </Button>
          <Button onClick={onAddNew} className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white">
            <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Nova
          </Button>
      </div>
    </div>
  );
};

export default ManageTechniquesActions;