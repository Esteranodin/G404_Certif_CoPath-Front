import { cn } from "../utils/utils";

export function combineLayoutStyles(variants, props) {
  const { base, layouts = {}, ...otherVariants } = variants;
  
  let classes = [base];
  
  const layout = props.layout || "default";
  if (layouts[layout]) {
    classes.push(layouts[layout]);
  }
  

  Object.entries(otherVariants).forEach(([variantName, variantOptions]) => {
    const propValue = String(props[variantName] !== undefined ? props[variantName] : false);
    if (variantOptions[propValue]) {
      classes.push(variantOptions[propValue]);
    }
  });
  

  if (props.className) {
    classes.push(props.className);
  }
  
  return cn(...classes);
}