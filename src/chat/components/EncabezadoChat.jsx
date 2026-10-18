import React from 'react';
import { X, MoreVertical } from 'lucide-react';

const ChatHeader = ({ botName, botRole, onToggle, onToggleMenu }) => (
  <div className="bg-[#111827] p-3.5 flex items-center justify-between relative z-20 border-b border-[#A3E635]/20 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.6)] mt-0.5">
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-11 h-11 rounded-full bg-[#A3E635] flex items-center justify-center shadow-lg">
          <i className="fas fa-robot text-[#0A0A0A] text-lg"></i>
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4ADE80] rounded-full border-2 border-[#111827] shadow-sm"></div>
      </div>
      <div>
        <h3 className="font-bold text-white text-[16px] leading-tight drop-shadow-sm">{botName}</h3>
        <div className="text-[11.5px] text-slate-400 font-medium">{botRole}</div>
      </div>
    </div>
    <div className="flex items-center gap-1.5 relative z-10">
      <button
        onClick={onToggleMenu}
        className="w-8 h-8 flex items-center justify-center bg-white/10 text-[#0A0A0A] hover:bg-[#A3E635]/20 hover:text-[#A3E635] rounded-full transition-all cursor-pointer"
      >
        <MoreVertical size={18} />
      </button>
      <button
        onClick={onToggle}
        className="w-8 h-8 flex items-center justify-center bg-white/10 text-[#0A0A0A] hover:bg-[#A3E635]/20 hover:text-[#A3E635] rounded-full transition-all cursor-pointer transform hover:scale-110"
      >
        <X size={18} />
      </button>
    </div>
  </div>
);

export default ChatHeader;
