"use client"

import Image from "next/image"

const MenuBurger = ({ 
  isOpen, 
  onToggle, 
  menuIcon, 
  closeIcon,
  label = "Menu principal",
  closeLabel = "Fermer le menu",
  menuId = "mobile-menu"
}) => {
  
  return (
    <button 
      aria-label={label} 
      aria-expanded={isOpen}
      aria-controls={menuId}
      onClick={onToggle}
      className="focus:outline-none focus:ring-2 focus:ring-primary-green"
    >
      <Image
        src={isOpen ? closeIcon : menuIcon}
        alt={isOpen ? closeLabel : label}
        className="w-8 cursor-pointer"
      />
    </button>
  )
}

export default MenuBurger