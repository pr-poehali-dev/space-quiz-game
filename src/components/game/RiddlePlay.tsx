import { useState, useEffect, useRef } from 'react';
import { riddlesData } from '@/data/rebusData';
import { getCustomRiddle, getCustomRiddleImage, getCustomRiddleTime } from '@/components/game/AdminEditor';
import Icon from '@/components/ui/icon';

interface RiddlePlayProps {
  itemId: number;
  onResult: (correct: boolean) => void;
  onBack: () => void;
}

const RiddlePlay = ({ itemId, onResult, onBack }: RiddlePlayProps) => {
  const base = riddlesData.find(r => r.id === itemId)!;
  const custom = getCustomRiddle(itemId);
  const item = { ...base, ...custom };
  const customImage = getCustomRiddleImage(itemId);
  const customTime = getCustomRiddleTime();
  const TIME = customTime || 60;

  const [timeLeft, setTimeLeft] = useState(TIME);
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
      setTimeout(() => onResult(false), 1500);
    }
  }, [timeUp]);

  const progress = timeLeft / TIME;
  const timerColor = progress > 0.5 ? '#aa00ff' : progress > 0.25 ? '#ffaa00' : '#ff3366';
  const circumference = 2 * Math.PI * 54;

  const handleSubmit = () => {
    const normalized = answer.trim().toUpperCase();
    if (normalized === item.answer.toUpperCase()) {
      clearInterval(intervalRef.current!);
      onResult(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setAnswer('');
    }
  };

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
            style={{ color: '#aa00ff', borderColor: 'rgba(170,0,255,0.4)', background: 'rgba(170,0,255,0.1)' }}
          >
            ЗАГАДКИ
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
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease', filter: `drop-shadow(0 0 6px ${timerColor})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-orbitron text-3xl font-black" style={{ color: timerColor, textShadow: `0 0 15px ${timerColor}` }}>
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
            <div className="font-exo text-gray-500 text-sm">Попробуй ещё раз</div>
          </div>
        ) : (
          <>
            <div
              className="relative p-8 rounded-2xl border mb-6 text-center"
              style={{
                borderColor: 'rgba(170,0,255,0.3)',
                background: 'rgba(170,0,255,0.06)',
                boxShadow: '0 0 40px rgba(170,0,255,0.1)',
              }}
            >
              {customImage && (
                <img src={customImage} alt="" className="mx-auto max-h-36 object-contain rounded-xl mb-4" />
              )}
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-4">Загадка</div>
              <div
                className="font-exo text-xl md:text-2xl font-semibold text-white leading-snug"
                style={{ textShadow: '0 2px 20px rgba(255,255,255,0.1)' }}
              >
                {item.question}
              </div>

              {showHint && (
                <div
                  className="mt-4 p-3 rounded-xl text-sm font-exo"
                  style={{ background: 'rgba(170,0,255,0.1)', color: '#aa00ff', border: '1px solid rgba(170,0,255,0.2)' }}
                >
                  💡 {item.hint}
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
                className="w-full p-4 rounded-xl font-orbitron text-lg text-white text-center tracking-widest bg-transparent border outline-none transition-all duration-200 placeholder-gray-600 uppercase"
                style={{
                  borderColor: 'rgba(170,0,255,0.4)',
                  background: 'rgba(255,255,255,0.03)',
                  boxShadow: '0 0 20px rgba(170,0,255,0.15)',
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
                className="flex-1 py-3 px-6 rounded-xl font-orbitron font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #aa00ff, #7700cc)',
                  boxShadow: '0 0 20px rgba(170,0,255,0.4)',
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

export default RiddlePlay;