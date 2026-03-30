import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onStart: () => void;
  onRules: () => void;
  onLeaderboard: () => void;
  onAbout: () => void;
}

const HomePage = ({ onStart, onRules, onLeaderboard, onAbout }: HomePageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-center mb-12">
        <div className="text-7xl mb-4 animate-pulse">🚀</div>
        <div className="font-orbitron text-xs tracking-[0.5em] text-cyan-400 mb-3 uppercase">
          12 апреля — День Космонавтики
        </div>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
          КОСМИЧЕСКИЕ
          <span className="block" style={{ color: '#00ffff', textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff50' }}>
            РЕБУСЫ
          </span>
        </h1>
        <p className="font-exo text-gray-400 text-lg max-w-md mx-auto">
          30 космических слов · 3 уровня сложности · Соревнуйся с друзьями
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <button
          onClick={onStart}
          className="w-full py-4 px-8 font-orbitron font-bold text-lg text-black rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #00ffff, #00ff88)',
            boxShadow: '0 0 30px #00ffff60, 0 4px 20px rgba(0,255,255,0.3)',
          }}
        >
          НАЧАТЬ ИГРУ
        </button>

        <div className="flex gap-3 w-full">
          <button
            onClick={onRules}
            className="flex-1 py-3 px-4 font-exo font-semibold text-sm text-cyan-400 rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-2">
              <Icon name="BookOpen" size={16} />
              Правила
            </div>
          </button>
          <button
            onClick={onLeaderboard}
            className="flex-1 py-3 px-4 font-exo font-semibold text-sm text-yellow-400 rounded-xl border border-yellow-400/30 hover:border-yellow-400/60 hover:bg-yellow-400/10 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-2">
              <Icon name="Trophy" size={16} />
              Рейтинг
            </div>
          </button>
          <button
            onClick={onAbout}
            className="flex-1 py-3 px-4 font-exo font-semibold text-sm text-purple-400 rounded-xl border border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-400/10 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-2">
              <Icon name="Info" size={16} />
              О нас
            </div>
          </button>
        </div>
      </div>

      <div className="mt-16 flex gap-8 text-center">
        {[
          { label: 'Слов', value: '30', color: '#00ffff' },
          { label: 'Ребусов', value: '90', color: '#00ff88' },
          { label: 'Уровней', value: '3', color: '#ffaa00' },
        ].map(stat => (
          <div key={stat.label}>
            <div className="font-orbitron text-3xl font-black" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}` }}>
              {stat.value}
            </div>
            <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
