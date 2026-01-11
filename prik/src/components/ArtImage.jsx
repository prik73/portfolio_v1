import React from 'react';
import Micz from '../assets/sis.jpg';

const ArtImage = () => {
  return (
    <div className="w-full px-4 mb-12 flex justify-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl">
        <img
          src={Micz}
          alt="Michelangelo's The Creation of Adam"
          className="w-full h-auto rounded-lg shadow-md object-cover"
        />
        <p className="mt-4 text-center text-gray-400 italic text-sm">
          “And God created the programmer in his own image...” — not Dostoevsky, probably
        </p>
      </div>
    </div>
  );
};

export default ArtImage;
