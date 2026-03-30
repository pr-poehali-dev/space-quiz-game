import { useState, useEffect } from 'react';
import { riddlesData } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface RiddleGridProps {
  solvedItems: Record<number, boolean>;
  onSelect: (id: number) => void;
  onBack: () => void;
  score: number;
}

const RiddleGrid = ({ solvedItems, onSelect, onBack, score }: RiddleGridProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const solvedCount = Object.keys(solvedItems).length;

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
              Отгадано: <span style={{ color: '#aa00ff' }}>{solvedCount}</span> / {riddlesData.length}
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
              width: `${(solvedCount / riddlesData.length) * 100}%`,
              background: 'linear-gradient(90deg, #aa00ff, #6600cc)',
              boxShadow: '0 0 10px #aa00ff',
            }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {riddlesData.map((item, idx) => {
            const solved = item.id in solvedItems;
            const wasCorrect = solvedItems[item.id];

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="relative p-3 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                style={{
                  borderColor: solved
                    ? wasCorrect ? 'rgba(0,255,136,0.5)' : 'rgba(255,51,102,0.5)'
                    : 'rgba(170,0,255,0.2)',
                  background: solved
                    ? wasCorrect ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,102,0.1)'
                    : 'rgba(170,0,255,0.04)',
                  boxShadow: solved
                    ? wasCorrect ? '0 0 12px rgba(0,255,136,0.2)' : '0 0 12px rgba(255,51,102,0.2)'
                    : 'none',
                }}
              >
                <div
                  className="font-orbitron text-xs font-bold mb-1"
                  style={{ color: solved ? (wasCorrect ? '#00ff88' : '#ff3366') : 'rgba(170,0,255,0.6)' }}
                >
                  #{idx + 1}
                </div>
                {solved ? (
                  <div className="text-lg">{wasCorrect ? '✅' : '❌'}</div>
                ) : (
                  <div className="text-lg">🔮</div>
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
