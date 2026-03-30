import { useState, useEffect, useRef } from 'react';
import { wordsData, DIFFICULTY_CONFIG, Difficulty } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface GamePlayProps {
  wordId: number;
  difficulty: Difficulty;
  onSolve: (correct: boolean, timeLeft: number) => void;
  onBack: () => void;
}

const GamePlay = ({ wordId, difficulty, onSolve, onBack }: GamePlayProps) => {
  const word = wordsData.find(w => w.id === wordId);
  const config = DIFFICULTY_CONFIG[difficulty];
  const rebus = word?.rebus[difficulty];

  const [timeLeft, setTimeLeft] = useState(config.time);
  const [answer, setAnswer] = useState('');
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setTimeUp(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (timeUp) {
      setTimeout(() => onSolve(false, 0), 1500);
    }
  }, [timeUp]);

  if (!word || !rebus) return null;

  const progress = timeLeft / config.time;
  const timerColor = progress > 0.5 ? config.color : progress > 0.25 ? '#ffaa00' : '#ff3366';

  const handleSubmit = () => {
    const normalized = answer.trim().toUpperCase();
    if (normalized === word.word) {
      clearInterval(intervalRef.current!);
      onSolve(true, timeLeft);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setAnswer('');
    }
  };

  const circumference = 2 * Math.PI * 54;

  return (
    <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-exo text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </button>
          <div
            className="font-orbitron text-sm font-bold px-3 py-1 rounded-full border"
            style={{ color: config.color, borderColor: `${config.color}40`, background: `${config.color}10` }}
          >
            {config.label}
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke={timerColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                style={{
                  transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease',
                  filter: `drop-shadow(0 0 6px ${timerColor})`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-orbitron text-3xl font-black"
                style={{ color: timerColor, textShadow: `0 0 15px ${timerColor}` }}
              >
                {timeLeft}
              </span>
              <span className="font-exo text-xs text-gray-500">сек</span>
            </div>
          </div>
        </div>

        {timeUp ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⏰</div>
            <div className="font-orbitron text-2xl font-bold text-red-400 mb-2">ВРЕМЯ ВЫШЛО!</div>
            <div className="font-exo text-gray-400">Ответ: <span style={{ color: '#00ffff' }}>{word.word}</span></div>
          </div>
        ) : (
          <>
            <div
              className="relative p-8 rounded-2xl border mb-6 text-center"
              style={{
                borderColor: `${config.color}30`,
                background: `${config.color}06`,
                boxShadow: `0 0 40px ${config.color}10`,
              }}
            >
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-4">Разгадай ребус</div>
              <div
                className="font-exo text-4xl md:text-5xl font-bold text-white leading-tight"
                style={{ textShadow: '0 2px 20px rgba(255,255,255,0.2)' }}
              >
                {rebus.puzzle}
              </div>

              {showHint && (
                <div
                  className="mt-4 p-3 rounded-xl text-sm font-exo"
                  style={{ background: `${config.color}10`, color: config.color, border: `1px solid ${config.color}20` }}
                >
                  💡 {rebus.hint}
                </div>
              )}
            </div>

            <div className={`mb-4 ${shake ? 'animate-bounce' : ''}`}>
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Введи ответ..."
                className="w-full p-4 rounded-xl font-orbitron text-lg text-white text-center tracking-widest bg-transparent border outline-none transition-all duration-200 focus:border-opacity-100 placeholder-gray-600 uppercase"
                style={{
                  borderColor: `${config.color}40`,
                  background: 'rgba(255,255,255,0.03)',
                  boxShadow: `0 0 20px ${config.color}15`,
                }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex-1 py-3 px-4 rounded-xl font-exo font-semibold text-sm border transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}
              >
                {showHint ? 'Скрыть подсказку' : '💡 Подсказка'}
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 px-6 rounded-xl font-orbitron font-bold text-sm text-black transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                  boxShadow: `0 0 20px ${config.color}40`,
                }}
              >
                ПРОВЕРИТЬ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GamePlay;
