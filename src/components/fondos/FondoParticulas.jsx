import React from 'react';

const FondoParticulas = ({ className = '' }) => {
    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(163,230,53,0.08),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(132,204,22,0.06),transparent_55%)]"></div>
            <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/50"></div>
            <div className="absolute top-[60%] right-[20%] w-2 h-2 rounded-full bg-[#A3E635]/40"></div>
            <div className="absolute bottom-[25%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#84CC16]/50"></div>
        </div>
    );
};

export default FondoParticulas;
