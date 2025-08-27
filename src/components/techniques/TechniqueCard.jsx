import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

const TechniqueCard = ({ technique, onEdit, onDelete }) => {
  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-cyan-500/30 shadow-xl transition-all duration-300 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">{technique.title}</CardTitle>
        <CardDescription className="text-slate-400 text-sm">{technique.category || 'Sem categoria'} - {technique.type || 'Não especificado'}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-slate-300 text-sm line-clamp-3 mb-3">{technique.description || 'Sem descrição detalhada.'}</p>
        <div className="flex flex-wrap gap-2">
          {technique.evaluation_schema && <Badge variant="outline" className="border-teal-500 text-teal-300 bg-teal-500/10">Possui Avaliação</Badge>}
          {technique.id_key && <Badge variant="secondary" className="bg-purple-600/20 border-purple-500 text-purple-300">ID: {technique.id_key}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t border-slate-700/50 pt-4 mt-auto">
        <Button variant="ghost" size="icon" onClick={onEdit} className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-full">
          <Edit className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-red-500 hover:text-red-400 hover:bg-red-500/20 rounded-full">
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TechniqueCard;