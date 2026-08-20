import React, { useMemo } from 'react';

const CircleParticles = React.memo(({ count = 22, colorScheme = 'default' }) => {
    const particles = useMemo(() => {
        const targetCount = count;
        const cols = 5;
        const rows = 5;
        const totalSlots = cols * rows;

        // Create grid slots and shuffle
        const slots = Array.from({ length: totalSlots }, (_, i) => i);
        for (let i = slots.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [slots[i], slots[j]] = [slots[j], slots[i]];
        }

        const selectedSlots = slots.slice(0, targetCount);

        return selectedSlots.map((slotIndex, i) => {
            const col = slotIndex % cols;
            const row = Math.floor(slotIndex / cols);

            const colSize = 100 / cols;
            const rowSize = 100 / rows;

            const randomLeft = Math.random() * colSize;
            const randomTop = Math.random() * rowSize;

            // Pick color based on colorScheme and index
            let color = '#ffffff';
            let boxShadow = 'none';

            if (colorScheme === 'light') {
                // For white or light backgrounds
                color = i % 3 === 0 ? '#FF4D00' : i % 3 === 1 ? '#5D3A1F' : '#111827';
            } else if (colorScheme === 'dark' || colorScheme === 'red') {
                // For dark or red backgrounds
                color = i % 3 === 0 ? '#111827' : i % 3 === 1 ? '#FF4D00' : '#ffffff';
                if (i % 3 === 2) {
                    boxShadow = '0 0 15px rgba(255,255,255,0.4)';
                } else if (i % 3 === 1) {
                    boxShadow = '0 0 15px rgba(255,77,0,0.4)';
                } else {
                    boxShadow = '0 0 15px rgba(17,24,39,0.4)';
                }
            } else {
                // Default mixed scheme
                color = i % 3 === 0 ? '#FF4D00' : i % 3 === 1 ? '#5D3A1F' : '#ffffff';
                if (i % 3 === 2) {
                    boxShadow = '0 0 15px rgba(255,255,255,0.3)';
                }
            }

            return {
                id: i,
                animationDuration: i % 3 === 0 ? 'slow' : i % 2 === 0 ? 'medium' : 'fast',
                top: `${(row * rowSize) + randomTop}%`,
                left: `${(col * colSize) + randomLeft}%`,
                width: `${Math.random() * 45 + 15}px`,
                height: `${Math.random() * 45 + 15}px`,
                color,
                delay: `${i * 0.2}s`,
                boxShadow
            };
        });
    }, [count, colorScheme]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
            {particles.map((particle) => (
                <div key={particle.id}
                    className={`absolute rounded-full opacity-25 animate-float-${particle.animationDuration}`}
                    style={{
                        top: particle.top,
                        left: particle.left,
                        width: particle.width,
                        height: particle.height,
                        backgroundColor: particle.color,
                        animationDelay: particle.delay,
                        boxShadow: particle.boxShadow
                    }}
                ></div>
            ))}
        </div>
    );
});

CircleParticles.displayName = 'CircleParticles';

export default CircleParticles;
