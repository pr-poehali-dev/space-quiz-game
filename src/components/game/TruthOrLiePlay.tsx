import { useState, useEffect, useRef } from 'react';
import { truthOrLieData } from '@/data/rebusData';
import { getCustomTolStatement, getCustomTolImage, getCustomTolTime } from '@/components/game/AdminEditor';
import Icon from '@/components/ui/icon';

interface TruthOrLiePlayProps {
  itemId: number;
  onResult: (correct: boolean) => void;
  onBack: () => void;
}

const TruthOrLiePlay = ({ itemId, onResult, onBack }: TruthOrLiePlayProps) => {
  const base = truthOrLieData.find(t => t.id === itemId)!;
  const custom = getCustomTolStatement(itemId);
  const item = { ...base, ...custom };
  const customImage = getCustomTolImage(itemId);
  const customTime = getCustomTolTime();
  const TIME = customTime || 30;

  const [chosen, setChosen] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME);
  const [timeUp, setTimeUp] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
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
    if (timeUp && !revealed) {
      setTimeout(() => onResult(false), 1500);
    }
  }, [timeUp]);

  const handleChoice = (value: boolean) => {
    if (revealed || timeUp) return;
    setChosen(value);
    setRevealed(true);
    clearInterval(intervalRef.current!);
    setTimeout(() => onResult(value === item.isTrue), 2000);
  };

  const progress = timeLeft / TIME;
  const timerColor = progress > 0.5 ? '#ffaa00' : progress > 0.25 ? '#ff6600' : '#ff3366';
  const circumference = 2 * Math.PI * 54;

  const correct = chosen === item.isTrue;

  return (
    <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-exo text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </button>
          <div
            className="font-orbitron text-sm font-bold px-3 py-1 rounded-full border"
            style={{ color: '#ffaa00', borderColor: 'rgba(255,170,0,0.4)', background: 'rgba(255,170,0,0.1)' }}
          >
            ПРАВДА ИЛИ ЛОЖЬ
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28">
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
              <span className="font-orbitron text-2xl font-black" style={{ color: timerColor, textShadow: `0 0 15px ${timerColor}` }}>
                {timeLeft}
              </span>
              <span className="font-exo text-xs text-gray-500">сек</span>
            </div>
          </div>
        </div>

        {timeUp && !revealed ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⏰</div>
            <div className="font-orbitron text-2xl font-bold text-red-400 mb-2">ВРЕМЯ ВЫШЛО!</div>
            <div className="font-exo text-gray-500 text-sm">Попробуй ещё раз</div>
          </div>
        ) : (
          <>
            <div
              className="p-8 rounded-2xl border mb-6 text-center"
              style={{
                borderColor: revealed
                  ? correct ? 'rgba(0,255,136,0.4)' : 'rgba(255,51,102,0.4)'
                  : 'rgba(255,170,0,0.3)',
                background: revealed
                  ? correct ? 'rgba(0,255,136,0.06)' : 'rgba(255,51,102,0.06)'
                  : 'rgba(255,170,0,0.06)',
                boxShadow: revealed
                  ? correct ? '0 0 40px rgba(0,255,136,0.1)' : '0 0 40px rgba(255,51,102,0.1)'
                  : '0 0 40px rgba(255,170,0,0.1)',
                transition: 'all 0.4s ease',
              }}
            >
              {customImage && (
                <img src={customImage} alt="" className="mx-auto max-h-36 object-contain rounded-xl mb-4" />
              )}
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-4">Утверждение</div>
              <div
                className="font-exo text-xl md:text-2xl font-semibold text-white leading-snug"
                style={{ textShadow: '0 2px 20px rgba(255,255,255,0.1)' }}
              >
                {item.statement}
              </div>

              {revealed && (
                <div className="mt-6 transition-all duration-300">
                  <div className="text-4xl mb-3">
                    {correct ? '✅' : '❌'}
                  </div>
                  <div
                    className="font-orbitron text-lg font-black mb-3"
                    style={{ color: correct ? '#00ff88' : '#ff3366', textShadow: `0 0 20px ${correct ? '#00ff88' : '#ff3366'}` }}
                  >
                    {correct ? 'ВЕРНО!' : `НЕТ — ${item.isTrue ? 'ПРАВДА' : 'ЛОЖЬ'}`}
                  </div>
                  <div
                    className="font-exo text-sm text-gray-400 leading-relaxed p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {item.explanation}
                  </div>
                </div>
              )}
            </div>

            {!revealed && (
              <div className="flex gap-4">
                <button
                  onClick={() => handleChoice(true)}
                  className="flex-1 py-5 rounded-2xl font-orbitron font-black text-xl transition-all duration-200 hover:scale-105 active:scale-95 border-2"
                  style={{
                    borderColor: 'rgba(0,255,136,0.5)',
                    background: 'rgba(0,255,136,0.1)',
                    color: '#00ff88',
                    boxShadow: '0 0 20px rgba(0,255,136,0.2)',
                  }}
                >
                  ✓ ПРАВДА
                </button>
                <button
                  onClick={() => handleChoice(false)}
                  className="flex-1 py-5 rounded-2xl font-orbitron font-black text-xl transition-all duration-200 hover:scale-105 active:scale-95 border-2"
                  style={{
                    borderColor: 'rgba(255,51,102,0.5)',
                    background: 'rgba(255,51,102,0.1)',
                    color: '#ff3366',
                    boxShadow: '0 0 20px rgba(255,51,102,0.2)',
                  }}
                >
                  ✗ ЛОЖЬ
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TruthOrLiePlay;