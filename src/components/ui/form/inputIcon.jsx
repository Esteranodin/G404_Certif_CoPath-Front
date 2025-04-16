// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "./input";

export function InputWithIcon({ form, name, label, icon: Icon, disabled, placeholder, type = "text" }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                {...field} 
                disabled={disabled} 
                placeholder={placeholder}
                type={type}
                className="pl-10"
              />
              {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}