export const cardVariants = {
    base: "card",
    layouts: {
      default: "",
      tablet: "md:w-[70%] lg:w-[60%] md:mx-auto md:flex md:flex-col md:h-[80vh] md:max-h-[80vh]",
      horizontal: "lg:flex lg:flex-row lg:h-64"
    },
    hover: {
      true: "hover:shadow-lg transition-shadow duration-300",
      false: ""
    }
  };
  
  export const cardImageVariants = {
    base: "card-image",
    layouts: {
      default: "",
      tablet: "md:w-[45%] md:h-[300px] md:float-left md:mr-4 md:rounded-t-sm",
      horizontal: "lg:w-1/3 lg:h-full lg:rounded-l-xl lg:rounded-tr-none"
    }
  };
  
  export const cardTitleVariants = {
    base: "font-playfair text-xl font-semibold",
    layouts: {
      default: "",
      tablet: "md:text-2xl"
    }
  };
  
  export const cardDescriptionVariants = {
    base: "px-6",
    layouts: {
      default: "",
      tablet: "clear-both mt-4 pt-2 border-t border-gray-200 md:max-h-[calc(75vh-350px)] md:overflow-y-auto"
    }
  };
  
  export const cardRatingVariants = {
    base: "flex items-center space-x-1",
    layouts: {
      default: "",
      tablet: "md:mt-2"
    }
  };
  
  export const cardTagsVariants = {
    base: "flex flex-wrap gap-2",
    layouts: {
      default: "",
      tablet: "md:mt-auto"
    }
  };
  
