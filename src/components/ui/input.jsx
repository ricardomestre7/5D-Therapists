import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // Custom styles for dark theme consistency
        "dark:bg-slate-800/80 dark:border-slate-700 dark:placeholder:text-slate-500 dark:focus-visible:ring-purple-500 dark:focus-visible:border-purple-500 text-slate-100",
        // Specific styles for a more 'glassy' input within auth cards
        "group-[.quantum-card]:bg-slate-700/50 group-[.quantum-card]:border-slate-600 group-[.quantum-card]:placeholder:text-slate-400 group-[.quantum-card]:focus:ring-purple-500 group-[.quantum-card]:focus:border-purple-500",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }