'use client';

import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  // --- Logic from original component ---
  useEffect(() => {
    // Increment progress until 100, then hold
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Non-linear progression feels smoother (faster at start, slower at end)
        const remaining = 100 - prev;
        const increment = Math.max(0.5, remaining * 0.05); 
        return prev + increment;
      });
    }, 30);

    // animated dots
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  // Calculations for SVG circular progress bar
  const radius = 80; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  // Calculate how much of the stroke should be visible based on progress percent
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030503] overflow-hidden">
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] opacity-40 animate-pulse-slow"></div>
        {/* Moving subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain"></div>
      </div>


      {/* --- Main Loading Apparatus --- */}
      <div className="relative flex flex-col items-center">
        
        {/* 1. The Container for the central visual */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          
          {/* 2. The Organic Core (Breathing Blobs) */}
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Blob 1 (Slow rotate & breathe) */}
            <div className="absolute w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-400 rounded-[40%_60%_70%_30%/50%_60%_30%_60%] blur-xl opacity-60 animate-blob mix-blend-screen"></div>
             {/* Blob 2 (Faster reverse rotate) */}
            <div className="absolute w-28 h-28 bg-gradient-to-br from-lime-400 to-accent rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-lg opacity-50 animate-blob animation-delay-2000 animation-reverse mix-blend-screen"></div>
             {/* Core sharp glow */}
            <div className="absolute w-20 h-20 bg-accent rounded-full blur-md opacity-80 animate-pulse-fast"></div>
          </div>

          {/* 3. SVG Circular Progress Bar */}
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg] drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            {/* Background Track Circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="2"
              className="opacity-10"
            />
            {/* Active Progress Circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-accent transition-all duration-300 ease-out"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset
              }}
            />
          </svg>

           {/* 4. Percentage Display */}
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-2xl font-bold text-white font-mono tracking-wider drop-shadow-lg">
               {Math.round(progress)}<span className="text-accent text-lg">%</span>
             </span>
          </div>

        </div>

        {/* --- Typography --- */}
        <div className="mt-8 text-center relative z-10">
          <h2 className="text-lg text-white/80 font-light tracking-[0.2em] uppercase">
            System Loading
            <span className="absolute inline-block w-4 text-accent text-left ml-1">{dots}</span>
          </h2>
          <p className="text-xs text-accent/60 mt-2 tracking-wider uppercase animate-pulse">
            Initializing core processes
          </p>
        </div>
      </div>


      <style jsx>{`
        /* Utility classes for animations */
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-fast {
           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-blob {
          animation: blob 10s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-reverse {
          animation-direction: reverse;
        }

        .animate-grain {
           animation: grain 8s steps(10) infinite;
        }


        /* Keyframes */
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(10px, -15px) scale(1.1) rotate(120deg);
          }
          66% {
            transform: translate(-15px, 10px) scale(0.9) rotate(240deg);
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(360deg);
          }
        }

        @keyframes grain {
          0%, 100% { transform:translate(0, 0) }
          10% { transform:translate(-5%, -10%) }
          20% { transform:translate(-15%, 5%) }
          30% { transform:translate(7%, -25%) }
          40% { transform:translate(-5%, 25%) }
          50% { transform:translate(-15%, 10%) }
          60% { transform:translate(15%, 0%) }
          70% { transform:translate(0%, 15%) }
          80% { transform:translate(3%, 25%) }
          90% { transform:translate(-10%, 10%) }
        }
      `}</style>
    </div>
  );
};

export default Loading;