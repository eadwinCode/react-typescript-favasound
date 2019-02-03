import React from 'react';

function Permalink({ link, text }:IPermalink) {
  return (
    <a href={link}>
      {text}
    </a>
  );
}

interface IPermalink{
  link: string;
  text: string;
};

export default Permalink;