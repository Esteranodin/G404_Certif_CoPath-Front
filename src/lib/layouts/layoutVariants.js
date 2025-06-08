export const cardVariants = {
  base: "card",
  layouts: {
    default: "",
    tablet: `md:w-[70%] lg:w-[60%] md:mx-auto md:flex md:flex-col 
             md:h-[80vh] md:max-h-[80vh]`, 
    horizontal: "lg:flex lg:flex-row lg:h-64",
    desktop: `xl:w-[90%] xl:h-auto xl:min-h-[400px] xl:max-h-[80vh] 
              xl:mx-auto xl:flex xl:flex-col`, 
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
    horizontal: "lg:w-1/3 lg:h-full lg:rounded-l-xl lg:rounded-tr-none",
    desktop: "xl:w-full xl:h-[180px] xl:object-cover xl:rounded-t-xl xl:mb-2"
  }
};

export const cardTitleVariants = {
  base: "font-playfair text-xl font-semibold",
  layouts: {
    default: "",
    tablet: "md:text-2xl",
    desktop: "xl:text-xl"
  }
};

export const cardDescriptionVariants = {
  base: "px-6 overflow-y-auto",
  layouts: {
    default: "py-2 max-h-[120px] overflow-y-auto", 
    tablet: `clear-both mt-4 pt-2 border-t border-gray-200 
             md:max-h-[calc(75vh-350px)] md:overflow-y-auto`, 
    desktop: `px-4 py-1 text-sm 
              xl:overflow-visible xl:max-h-none
              xl:[&:has(p[length>300])]:overflow-y-auto 
              xl:[&:has(p[length>300])]:max-h-[calc(60vh-350px)]` 
  }
};

export const cardTabletContentVariants = {
  base: "md:w-[55%] md:flex md:flex-col md:justify-between",
  layouts: {
    default: "",
    tablet: "md:h-[300px]",
    desktop: "xl:h-auto xl:min-h-[280px]" 
  }
};

export const cardRatingVariants = {
  base: "flex items-center space-x-1",
  layouts: {
    default: "justify-between",
    tablet: "md:justify-start md:gap-4"
  }
};

export const ratingAreaVariants = {
  base: "px-6 pb-4",
  layouts: {
    default: "",
    tablet: "md:px-2"
  }
};

export const cardTagsVariants = {
  base: "flex flex-wrap gap-2 px-4 mb-1",
  layouts: {
    default: "px-6 my-2",
    tablet: "md:mt-auto"
  }
};

