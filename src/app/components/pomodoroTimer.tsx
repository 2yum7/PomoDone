'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          if (audioRef.current) {
            audioRef.current.play();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-8">
      <audio ref={audioRef} src="/shupo.mp3" preload="auto" />

      <h2 className="text-4xl font-extrabold mb-8">Pomodoro Timer</h2>

        {/* Pomodoro Timer */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center">
          <div className="text-6xl font-bold mb-6 tracking-widest">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>

          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-white text-yellow-600 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(1500);
              }}
              className="bg-white text-yellow-600 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <RotateCcw size={24} />
            </button>
          </div>

          <div className="flex gap-4">
            <button className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium hover:bg-yellow-100 transition">Pomodoro</button>
            <button className="bg-white text-teal-500 px-4 py-2 rounded-lg font-medium hover:bg-teal-100 transition">Short Break</button>
            <button className="bg-white text-purple-500 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition">Long Break</button>
          </div>
        </div>
      </div>

  );
}
