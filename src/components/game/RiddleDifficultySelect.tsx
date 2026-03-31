import { useState, useEffect } from 'react';
import { riddlesData, RIDDLE_DIFFICULTY_CONFIG, Difficulty } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface RiddleDifficultySelectProps {
  itemId: number;
  solvedDifficulties: string[];
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const RiddleDifficultySelect = ({ itemId, solvedDifficulties, onSelect, onBack }: RiddleDifficultySelectProps) => {
  const [visible, setVisible] = useState(false);
  const itemIndex = riddlesData.findIndex(r => r.id === itemId);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-exo text-gray-400 hover:text-white transition-colors mb-8"
        >
          <Icon name="ChevronLeft" size={20} />
          Назад к списку
        </button>

        <div className="text-center mb-10">
          <div className="font-exo text-xs tracking-widest text-gray-500 uppercase mb-2">
            Загадка #{itemIndex + 1}
          </div>
          <h2
            className="font-orbitron text-2xl md:text-3xl font-black text-white"
            style={{ textShadow: '0 0 30px rgba(170,0,255,0.5)' }}
          >
            ЗАГАДКИ
          </h2>
          <div className="mt-3 flex justify-center gap-2">
            {difficulties.map(d => (
              <div
                key={d}
                className="w-2 h-2 rounded-full"
                style={{
                  background: solvedDifficulties.includes(d) ? RIDDLE_DIFFICULTY_CONFIG[d].color : 'rgba(255,255,255,0.15)',
                  boxShadow: solvedDifficulties.includes(d) ? `0 0 8px ${RIDDLE_DIFFICULTY_CONFIG[d].color}` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {difficulties.map((diff, idx) => {
            const config = RIDDLE_DIFFICULTY_CONFIG[diff];
            const solved = solvedDifficulties.includes(diff);

            return (
              <button
                key={diff}
                onClick={() => onSelect(diff)}
                className="relative p-5 rounded-2xl border transition-all duration-200 hover:scale-102 active:scale-98 text-left overflow-hidden group"
                style={{
                  borderColor: solved ? config.color : `${config.color}30`,
                  background: solved ? `${config.color}10` : 'rgba(255,255,255,0.02)',
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: `${config.color}08` }}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-orbitron font-bold text-lg"
                      style={{ color: config.color, textShadow: `0 0 15px ${config.color}60` }}
                    >
                      {config.label}
                    </div>
                    <div className="font-exo text-gray-400 text-sm mt-0.5">
                      {config.time} секунд · {config.points} очков
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {solved && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: config.color }}
                      >
                        <Icon name="Check" size={14} className="text-black" />
                      </div>
                    )}
                    <Icon
                      name="ChevronRight"
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                      style={{ color: config.color }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {Array.from({ length: diff === 'easy' ? 1 : diff === 'medium' ? 2 : 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-1.5 rounded-full"
                      style={{ background: config.color, boxShadow: `0 0 6px ${config.color}` }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RiddleDifficultySelect;
