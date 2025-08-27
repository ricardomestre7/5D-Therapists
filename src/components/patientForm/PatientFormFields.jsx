import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormField from '@/components/patient/FormField.jsx';
import SectionCard from '@/components/patient/SectionCard.jsx';

const PatientFormFields = ({ formStructure, formData, handleInputChange, onSelectChange, therapists }) => {
  if (!Array.isArray(formStructure) || formStructure.length === 0) {
    return <p className="text-slate-400 text-center py-8">Estrutura do formulário não disponível ou vazia.</p>;
  }

  return formStructure.map((section) => {
    if (!section || !section.id || !Array.isArray(section.fields)) {
      console.warn('Seção do formulário inválida ou sem campos:', section);
      return null; 
    }

    return (
      <SectionCard key={section.id} title={section.title} icon={section.icon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {section.fields.map((field) => {
            if (!field || !field.id) {
              console.warn('Campo do formulário inválido:', field);
              return null; 
            }

            const commonProps = {
              id: field.id,
              name: field.id,
              value: formData[field.id] || '',
              onChange: handleInputChange,
              className: "bg-slate-800 border-slate-700 focus:border-purple-500 placeholder-slate-500 text-slate-200",
              placeholder: field.placeholder || field.label || '',
              required: field.required,
            };

            let inputComponent;
            if (field.type === 'textarea') {
              inputComponent = <Textarea {...commonProps} rows={field.rows || 3} />;
            } else if (field.type === 'select') {
              let options = Array.isArray(field.options) ? field.options : [];
              if (field.id === 'therapist_id') {
                options = Array.isArray(therapists) ? therapists.map(therapist => ({ value: therapist.id, label: therapist.name })) : [];
              }

              inputComponent = (
                <Select
                  name={field.id}
                  value={formData[field.id] || ''}
                  onValueChange={(value) => onSelectChange(field.id, value)}
                  required={field.required}
                >
                  <SelectTrigger className={`${commonProps.className} w-full`}>
                    <SelectValue placeholder={field.placeholder || `Selecione ${field.label ? field.label.toLowerCase() : ''}`} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="hover:bg-purple-500/20 focus:bg-purple-500/30">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            } else {
              inputComponent = <Input type={field.type} {...commonProps} />;
            }

            return (
              <FormField 
                key={field.id} 
                label={field.label || 'Campo sem rótulo'} 
                htmlFor={field.id} 
                className={field.fullWidth ? 'md:col-span-2' : ''}
                required={field.required}
              >
                {inputComponent}
              </FormField>
            );
          })}
        </div>
      </SectionCard>
    );
  });
};

export default PatientFormFields;