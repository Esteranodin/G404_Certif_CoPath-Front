import { Button } from "@/components/ui/button";

export default function Form({ 
  title, 
  onSubmit, 
  isSubmitting = false, 
  submitLabel = "Soumettre", 
  loadingLabel = "Traitement en cours...", 
  children, 
  footer,
  cancelAction,
  className = "",
  buttonFullWidth = true
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="font-medium text-lg mb-4">{title}</h3>}
      
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        
        <div className="flex gap-2">
          {cancelAction && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={cancelAction.onClick}
            >
              {cancelAction.label || "Annuler"}
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="form"
            className={cancelAction ? "flex-1" : buttonFullWidth ? "w-full" : ""}
          >
            {isSubmitting ? loadingLabel : submitLabel}
          </Button>
        </div>
      </form>
      
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}