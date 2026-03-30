import { useEffect, useState } from 'react';
import { DIFFICULTY_CONFIG, Difficulty } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface ResultScreenProps {
  wordName: string;
  difficulty: Difficulty;
  correct: boolean;
  timeLeft: number;
  score: number;
  onContinue: () => void;
  onRetry: () => void;
}

const ResultScreen = ({ wordName, difficulty, correct, timeLeft, score, onContinue, onRetry }: ResultScreenProps) => {
  const config = DIFFICULTY_CONFIG[difficulty];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const earnedScore = correct ? Math.round((timeLeft / config.time) * 100 * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)) : 0;

  return (
    <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      <div className="w-full max-w-sm text-center">
        <div className="text-8xl mb-6 animate-bounce">
          {correct ? '🎉' : '💫'}
        </div>

        <h2
          className="font-orbitron text-4xl font-black mb-2"
          style={{
            color: correct ? '#00ff88' : '#ff3366',
            textShadow: `0 0 30px ${correct ? '#00ff88' : '#ff3366'}`,
          }}
        >
          {correct ? 'ВЕРНО!' : 'НЕ ВЕРНО'}
        </h2>

        <div className="font-exo text-gray-400 text-lg mb-8">
          {wordName} · {config.label}
        </div>

        {correct && (
          <div
            className="p-6 rounded-2xl border mb-8"
            style={{
              borderColor: `${config.color}30`,
              background: `${config.color}08`,
            }}
          >
            <div className="font-exo text-sm text-gray-500 mb-1">Заработано очков</div>
            <div
              className="font-orbitron text-5xl font-black"
              style={{ color: config.color, textShadow: `0 0 20px ${config.color}` }}
            >
              +{earnedScore}
            </div>
            <div className="font-exo text-sm text-gray-500 mt-2">
              Осталось времени: {timeLeft} сек
            </div>
          </div>
        )}

        <div
          className="p-4 rounded-xl border mb-8"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="font-exo text-xs text-gray-600 mb-1">Общий счёт</div>
          <div className="font-orbitron text-3xl font-bold text-white">{score + earnedScore}</div>
        </div>

        <div className="flex gap-3">
          {!correct && (
            <button
              onClick={onRetry}
              className="flex-1 py-3 px-4 rounded-xl font-exo font-semibold text-sm border transition-all duration-200 hover:bg-white/5"
              style={{ borderColor: `${config.color}40`, color: config.color }}
            >
              Попробовать снова
            </button>
          )}
          <button
            onClick={onContinue}
            className="flex-1 py-3 px-6 rounded-xl font-orbitron font-bold text-sm text-black transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #00ffff, #00ff88)',
              boxShadow: '0 0 20px #00ffff40',
            }}
          >
            ПРОДОЛЖИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
