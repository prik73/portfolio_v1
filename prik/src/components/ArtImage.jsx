import React from 'react';
import Micz from '../assets/sis.jpg';

const ArtImage = () => {
  return (
    <div className="mb-12 w-full max-w-4xl mx-auto px-4">
      <img
        src={Micz}
        alt="Michelangelo's The Creation of Adam"
        className="w-full h-auto rounded-lg shadow-md object-cover"
      />
      <p className="mt-4 text-center text-gray-400 italic text-sm">
        “And God created the programmer in his own image...” — not Dostoevsky, probably
      </p>
    </div>
  );
};

export default ArtImage;
