import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';

import defaultProfileImage from '../../public/profile.svg';

const ImageUploadComponent = () => {
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
    } else {
      setImage(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg max-w-xs mx-auto my-8"> {/* Diminuído p-5 para p-4, max-w-sm para max-w-xs, my-12 para my-8 */}
      {/* Wrapper do Avatar */}
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden border-black bg-black flex justify-center items-center cursor-pointer" // Diminuído w-36 h-36 para w-24 h-24, border-2 para border
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleUploadClick}
      >
        {/* Imagem do Avatar */}
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

        {/* Overlay semi-transparente e Ícone da câmera */}
        <div
          className={`
            absolute inset-0
            flex flex-col items-center justify-center
            bg-black bg-opacity-40
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <FaCamera className="w-6 h-6 text-white" /> {/* Diminuído w-8 h-8 para w-6 h-6 */}
          <span className="text-white text-xs mt-0.5">Alterar Foto</span> {/* Diminuído text-sm para text-xs, mt-1 para mt-0.5 */}
        </div>
      </div>

      {/* Input de arquivo (escondido) */}
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