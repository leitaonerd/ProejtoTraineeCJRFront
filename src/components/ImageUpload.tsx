import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';

import defaultProfileImage from '../../public/profile.svg';

interface ImageUploadComponentProps {
  onImageSelected: (file: File | null) => void; // A nova prop
}

const ImageUploadComponent : React.FC<ImageUploadComponentProps> = ({ onImageSelected }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem (JPEG, PNG, GIF, etc.).');
        setImage(null);
        return;
      }
      setImage(file);
      onImageSelected(file);
    } else {
      setImage(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg max-w-xs mx-auto my-8">
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden border-black bg-black flex justify-center items-center cursor-pointer" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleUploadClick}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Pré-visualização do Avatar"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <Image
            src={defaultProfileImage}
            alt="Avatar Padrão"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        )}

        <div
          className={`
            absolute inset-0
            flex flex-col items-center justify-center
            bg-black bg-opacity-40
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <FaCamera className="w-6 h-6 text-white" /> 
          <span className="text-white text-xs mt-0.5">Alterar Foto</span> 
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default ImageUploadComponent;