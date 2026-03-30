import { useState, useEffect } from 'react';
import { wordsData } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface WordGridProps {
  solvedWords: Record<string, string[]>;
  onWordSelect: (wordId: number) => void;
  onBack: () => void;
}

const WordGrid = ({ solvedWords, onWordSelect, onBack }: WordGridProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const getSolvedCount = (wordId: number) => {
    return (solvedWords[wordId] || []).length;
  };

  const isFullySolved = (wordId: number) => getSolvedCount(wordId) === 3;

  const categoryColors: Record<string, string> = {
    'Техника': '#00ffff',
    'Пространство': '#aa00ff',
    'Физика': '#00ff88',
    'Личности': '#ffaa00',
    'Небесные тела': '#ff6688',
    'Явления': '#ff9900',
    'Профессии': '#00ccff',
    'Снаряжение': '#ffcc00',
  };

  const totalSolved = Object.values(solvedWords).flat().length;
  const totalPossible = wordsData.length * 3;

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
            <div className="text-white text-lg font-bold">ВЫБЕРИ СЛОВО</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Решено: <span style={{ color: '#00ff88' }}>{totalSolved}</span> / {totalPossible}
            </div>
          </div>
          <div className="w-20" />
        </div>

        <div className="w-full bg-gray-800/30 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(totalSolved / totalPossible) * 100}%`,
              background: 'linear-gradient(90deg, #00ffff, #00ff88)',
              boxShadow: '0 0 10px #00ffff',
            }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {wordsData.map((word, idx) => {
            const solved = getSolvedCount(word.id);
            const full = isFullySolved(word.id);
            const color = categoryColors[word.category] || '#00ffff';

            return (
              <button
                key={word.id}
                onClick={() => onWordSelect(word.id)}
                className="relative p-3 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                style={{
                  borderColor: full ? color : solved > 0 ? `${color}60` : 'rgba(255,255,255,0.08)',
                  background: full
                    ? `${color}15`
                    : solved > 0
                    ? `${color}08`
                    : 'rgba(255,255,255,0.03)',
                  boxShadow: full ? `0 0 15px ${color}30` : 'none',
                  animationDelay: `${idx * 20}ms`,
                }}
              >
                <div
                  className="font-orbitron text-xs font-bold mb-1.5 leading-tight"
                  style={{ color: solved > 0 ? color : '#666' }}
                >
                  {solved > 0 ? word.word : `${idx + 1} слово`}
                </div>
                <div className="flex justify-center gap-0.5">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: (solvedWords[word.id] || []).length > i ? color : 'rgba(255,255,255,0.1)',
                        boxShadow: (solvedWords[word.id] || []).length > i ? `0 0 6px ${color}` : 'none',
                      }}
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

export default WordGrid;