import React from 'react';
import { X, MoreVertical } from 'lucide-react';

const ChatHeader = ({ botName, botRole, onToggle, onToggleMenu }) => (
  <div className="bg-[#FFD1B3] p-3.5 flex items-center justify-between relative z-20 shadow-[0_2px_10px_-4px_rgba(255,209,179,0.5)] mt-0.5">
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-11 h-11 bg-transparent flex items-center justify-center">
          <img src="/img/02_Logos/NikoAvatar.jpg" alt="Niko Castor" className="w-full h-full object-cover mix-blend-multiply" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4ADE80] rounded-full border-2 border-[#FFD1B3] shadow-sm"></div>
      </div>
      <div>
        <h3 className="font-bold text-[#8B3A13] text-[16px] leading-tight drop-shadow-sm">{botName}</h3>
        <div className="text-[11.5px] text-[#8B3A13]/80 font-medium">{botRole}</div>
      </div>
    </div>
    <div className="flex items-center gap-1.5 relative z-10">
      <button
        onClick={onToggleMenu}
        className="w-8 h-8 flex items-center justify-center bg-white/40 text-[#8B3A13] hover:bg-white/60 rounded-full transition-all cursor-pointer"
      >
        <MoreVertical size={18} />
      </button>
      <button
        onClick={onToggle}
        className="w-8 h-8 flex items-center justify-center bg-white/40 text-[#8B3A13] hover:bg-white/60 rounded-full transition-all cursor-pointer transform hover:scale-110"
      >
        <X size={18} />
      </button>
    </div>
  </div>
);

export default ChatHeader;
