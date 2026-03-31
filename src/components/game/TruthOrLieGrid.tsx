import { useState, useEffect } from 'react';
import { truthOrLieData } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface TruthOrLieGridProps {
  solvedItems: Record<number, boolean>;
  onSelect: (id: number) => void;
  onBack: () => void;
  score: number;
}

const TruthOrLieGrid = ({ solvedItems, onSelect, onBack, score }: TruthOrLieGridProps) => {
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
            <div className="text-white text-lg font-bold">ПРАВДА ИЛИ ЛОЖЬ</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Отвечено: <span style={{ color: '#ffaa00' }}>{solvedCount}</span> / {truthOrLieData.length}
            </div>
          </div>
          <div className="font-orbitron text-right">
            <div className="text-xs text-gray-500">Очки</div>
            <div className="font-bold" style={{ color: '#ffaa00' }}>{score}</div>
          </div>
        </div>

        <div className="w-full bg-gray-800/30 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(solvedCount / truthOrLieData.length) * 100}%`,
              background: 'linear-gradient(90deg, #ffaa00, #ff6600)',
              boxShadow: '0 0 10px #ffaa00',
            }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {truthOrLieData.map((item, idx) => {
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
                    : 'rgba(255,170,0,0.2)',
                  background: solved
                    ? wasCorrect ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,102,0.1)'
                    : 'rgba(255,170,0,0.04)',
                  boxShadow: solved
                    ? wasCorrect ? '0 0 12px rgba(0,255,136,0.2)' : '0 0 12px rgba(255,51,102,0.2)'
                    : 'none',
                }}
              >
                <div
                  className="font-orbitron text-xs font-bold mb-1"
                  style={{ color: solved ? (wasCorrect ? '#00ff88' : '#ff3366') : '#ffaa0080' }}
                >
                  #{idx + 1}
                </div>
                {solved ? (
                  <div className="text-lg">{wasCorrect ? '✅' : '❌'}</div>
                ) : (
                  <div
                    className="font-orbitron text-sm font-bold"
                    style={{ color: 'rgba(255,170,0,0.3)' }}
                  >
                    ?
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TruthOrLieGrid;