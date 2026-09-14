import React from 'react';

export const textRenderer = (text) => {
  const parts = [];
  const regex = /(\[.*?\]\(.*?\)|\*\*(.*?)\*\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    if (match[0].startsWith('[')) {
      const linkMatch = match[0].match(/\[(.*?)\]\((.*?)\)/);
      parts.push(
        <a key={match.index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="font-bold underline text-white bg-[#25d366] hover:bg-[#128c7e] px-3 py-1.5 rounded-lg inline-block mt-2 shadow-sm transition-colors">
          {linkMatch[1]}
        </a>
      );
    } else {
      parts.push(<strong key={match.index} className="font-extrabold text-slate-900">{match[2]}</strong>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};
