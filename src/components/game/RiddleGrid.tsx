import { useState, useEffect } from 'react';
import { riddlesData, DIFFICULTY_CONFIG, Difficulty } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

interface RiddleGridProps {
  solvedItems: Record<string, string[]>;
  onSelect: (id: number) => void;
  onBack: () => void;
  score: number;
}

const RiddleGrid = ({ solvedItems, onSelect, onBack, score }: RiddleGridProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const totalSolved = Object.values(solvedItems).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className={`relative z-10 min-h-screen px-4 py-6 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-exo text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
            Главная
          </button>
          <div className="font-orbitron text-center">
            <div className="text-white text-lg font-bold">ЗАГАДКИ</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Пройдено: <span style={{ color: '#aa00ff' }}>{totalSolved}</span> / {riddlesData.length * 3}
            </div>
          </div>
          <div className="font-orbitron text-right">
            <div className="text-xs text-gray-500">Очки</div>
            <div className="font-bold" style={{ color: '#aa00ff' }}>{score}</div>
          </div>
        </div>

        <div className="w-full bg-gray-800/30 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(totalSolved / (riddlesData.length * 3)) * 100}%`,
              background: 'linear-gradient(90deg, #aa00ff, #6600cc)',
              boxShadow: '0 0 10px #aa00ff',
            }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {riddlesData.map((item, idx) => {
            const solvedDiffs = solvedItems[item.id] || [];
            const hasSolved = solvedDiffs.length > 0;

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="relative p-3 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                style={{
                  borderColor: hasSolved
                    ? solvedDiffs.length === 3 ? 'rgba(0,255,136,0.5)' : 'rgba(170,0,255,0.4)'
                    : 'rgba(170,0,255,0.2)',
                  background: hasSolved
                    ? solvedDiffs.length === 3 ? 'rgba(0,255,136,0.08)' : 'rgba(170,0,255,0.06)'
                    : 'rgba(170,0,255,0.04)',
                  boxShadow: solvedDiffs.length === 3
                    ? '0 0 12px rgba(0,255,136,0.2)'
                    : 'none',
                }}
              >
                <div
                  className="font-orbitron text-xs font-bold mb-1"
                  style={{ color: hasSolved ? (solvedDiffs.length === 3 ? '#00ff88' : '#aa00ff') : 'rgba(170,0,255,0.6)' }}
                >
                  #{idx + 1}
                </div>
                <div className="flex justify-center gap-0.5 mt-0.5">
                  {DIFFICULTIES.map(d => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: solvedDiffs.includes(d) ? DIFFICULTY_CONFIG[d].color : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
                {!hasSolved && (
                  <div className="text-lg mt-0.5">🔮</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RiddleGrid;
