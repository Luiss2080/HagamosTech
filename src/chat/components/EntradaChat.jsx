import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ value, onChange, onSubmit, disabled, placeholder }) => (
  <form onSubmit={onSubmit} className="bg-white p-3 border-t border-[#FF4D00]/10 flex items-center gap-2.5 relative z-20 shadow-[0_-5px_15px_-10px_rgba(255,77,0,0.1)]">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-[#FFF9F5] border border-[#FF4D00]/20 text-[#5C2B0B] text-[13px] rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#FF4D00]/30 focus:border-[#FF4D00]/50 transition-all font-medium placeholder-[#8B3A13]/40"
    />
    <button
      type="submit"
      disabled={disabled}
      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all flex-shrink-0 bg-[#FF4D00] text-white shadow-[0_4px_15px_rgba(255,77,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,77,0,0.5)] ${
        !disabled ? 'hover:scale-105 cursor-pointer' : 'cursor-default opacity-80'
      }`}
    >
      <Send size={18} className="ml-0.5" />
    </button>
  </form>
);

export default ChatInput;
