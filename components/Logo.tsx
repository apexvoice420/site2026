
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-auto" }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
            >
                {/* Background Shield/Apex Shape */}
                <path
                    d="M50 5L10 25V55C10 75 50 95 50 95C50 95 90 75 90 55V25L50 5Z"
                    fill="#1479FF"
                    fillOpacity="0.1"
                    stroke="#1479FF"
                    strokeWidth="3"
                />

                {/* The 'A' Apex */}
                <path
                    d="M50 25L70 70H60L55 58H45L40 70H30L50 25Z"
                    fill="#1479FF"
                />

                {/* Sound Waves / Voice Detail */}
                <rect x="42" y="45" width="4" height="8" rx="2" fill="white" />
                <rect x="54" y="45" width="4" height="8" rx="2" fill="white" />
                <rect x="48" y="40" width="4" height="18" rx="2" fill="white" />

                {/* Accent Bar */}
                <path
                    d="M47 52H53"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
            <div className="flex flex-col leading-tight">
                <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                    Apex <span className="text-[#1479FF]">Voice</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                    Solutions
                </span>
            </div>
        </div>
    );
};

export default Logo;
