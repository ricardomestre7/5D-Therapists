import React from 'react';
import { Label } from '@/components/ui/label.jsx';

const FormField = ({ label, htmlFor, className, children, required }) => {
  return (
    <div className={`space-y-2 mb-4 ${className || ''}`}>
      <Label htmlFor={htmlFor} className="text-slate-300 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
};

export default FormField;