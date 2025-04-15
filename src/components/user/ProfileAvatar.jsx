import { useState } from "react";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import defaultAvatar from "@/../public/img/placeholder-avatar.png";

export function ProfileAvatar({ user, isEditing, onAvatarChange }) {
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || defaultAvatar);
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        if (onAvatarChange) onAvatarChange(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md relative">
        <Image 
          src={avatarPreview} 
          alt={`Avatar de ${user.username}`}
          fill
          sizes="128px"
          className="object-cover"
          priority
        />
      </div>
      
      {isEditing && (
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full cursor-pointer group-hover:opacity-100 transition-opacity">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleChange} 
          />
          <FiEdit2 className="text-white text-xl" />
        </label>
      )}
    </div>
  );
}