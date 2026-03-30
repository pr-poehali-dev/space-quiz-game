import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  solved: number;
  badge: string;
}

const mockData: LeaderboardEntry[] = [
  { rank: 1, name: 'КосмоПилот', score: 4850, solved: 28, badge: '🥇' },
  { rank: 2, name: 'Звёздный Путник', score: 4200, solved: 24, badge: '🥈' },
  { rank: 3, name: 'Гагарин12', score: 3780, solved: 21, badge: '🥉' },
  { rank: 4, name: 'Астро_Катя', score: 3100, solved: 18, badge: '🚀' },
  { rank: 5, name: 'МарсОлег', score: 2890, solved: 17, badge: '⭐' },
  { rank: 6, name: 'НеонВселенная', score: 2450, solved: 15, badge: '💫' },
  { rank: 7, name: 'ЛунаТик', score: 2100, solved: 13, badge: '🌙' },
  { rank: 8, name: 'CometaRider', score: 1800, solved: 11, badge: '☄️' },
  { rank: 9, name: 'Орбита42', score: 1500, solved: 9, badge: '🌌' },
  { rank: 10, name: 'ПротонX', score: 1200, solved: 8, badge: '⚡' },
];

interface LeaderboardPageProps {
  currentScore: number;
  onBack: () => void;
}

const LeaderboardPage = ({ currentScore, onBack }: LeaderboardPageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const rankColors: Record<number, string> = { 1: '#ffaa00', 2: '#aaaaaa', 3: '#cd7f32' };

  return (
    <div className={`relative z-10 min-h-screen px-4 py-6 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-exo text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </button>
          <div className="font-orbitron text-white font-bold text-lg text-center">
            🏆 ЛИДЕРБОРД
          </div>
          <div className="w-16" />
        </div>

        {currentScore > 0 && (
          <div
            className="p-4 rounded-xl border mb-6 flex items-center justify-between"
            style={{ borderColor: '#00ffff30', background: '#00ffff08' }}
          >
            <div>
              <div className="font-exo text-xs text-gray-500">Твой счёт</div>
              <div className="font-orbitron text-2xl font-bold" style={{ color: '#00ffff' }}>
                {currentScore}
              </div>
            </div>
            <Icon name="User" size={24} className="text-cyan-500" />
          </div>
        )}

        <div className="space-y-2">
          {mockData.map((entry, idx) => (
            <div
              key={entry.rank}
              className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-101"
              style={{
                borderColor: entry.rank <= 3 ? `${rankColors[entry.rank]}30` : 'rgba(255,255,255,0.05)',
                background: entry.rank <= 3 ? `${rankColors[entry.rank]}08` : 'rgba(255,255,255,0.02)',
                animationDelay: `${idx * 50}ms`,
              }}
            >
              <div className="w-8 text-center">
                {entry.rank <= 3 ? (
                  <span className="text-xl">{entry.badge}</span>
                ) : (
                  <span className="font-orbitron text-sm text-gray-600">#{entry.rank}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-exo font-semibold text-white text-sm">{entry.name}</div>
                <div className="font-exo text-xs text-gray-600">{entry.solved} слов решено</div>
              </div>
              <div
                className="font-orbitron font-bold text-lg"
                style={{ color: rankColors[entry.rank] || '#888' }}
              >
                {entry.score.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl border text-center" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="font-exo text-xs text-gray-600">Таблица обновляется по итогам игры</div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
