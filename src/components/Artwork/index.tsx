import React from 'react';

interface IArtwork{
    image: string;
    title: string;
    optionalImage?: string;
    size: number;
};

function Artwork({ image, title, optionalImage, size }:IArtwork) {
  return <img src={image || optionalImage} alt={title} height={size} width={size} />;
}

export default Artwork;