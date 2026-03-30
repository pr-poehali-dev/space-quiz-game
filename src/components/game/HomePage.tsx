import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onStartRound1: () => void;
  onStartRound2: () => void;
  onStartRound3: () => void;
  onRules: () => void;
  onLeaderboard: () => void;
  onAbout: () => void;
  onEditor: () => void;
}

const HomePage = ({ onStartRound1, onStartRound2, onStartRound3, onRules, onLeaderboard, onAbout, onEditor }: HomePageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const rounds = [
    {
      label: 'РАУНД 1',
      title: 'РЕБУСЫ',
      desc: '30 слов · 3 уровня сложности',
      color: '#00ffff',
      icon: 'Puzzle',
      onClick: onStartRound1,
    },
    {
      label: 'РАУНД 2',
      title: 'ПРАВДА ИЛИ ЛОЖЬ',
      desc: '30 утверждений о космосе',
      color: '#ffaa00',
      icon: 'CheckCircle',
      onClick: onStartRound2,
    },
    {
      label: 'РАУНД 3',
      title: 'ЗАГАДКИ',
      desc: '30 космических загадок',
      color: '#aa00ff',
      icon: 'HelpCircle',
      onClick: onStartRound3,
    },
  ];

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-center mb-10">
        <div className="text-7xl mb-4 animate-pulse">🚀</div>
        <div className="font-orbitron text-xs tracking-[0.5em] text-cyan-400 mb-3 uppercase">
          12 апреля — День Космонавтики
        </div>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
          КОСМИЧЕСКИЕ
          <span className="block" style={{ color: '#00ffff', textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff50' }}>
            ВИКТОРИНА
          </span>
        </h1>
        <p className="font-exo text-gray-400 text-lg max-w-md mx-auto">
          3 раунда · 90 вопросов · Соревнуйся с друзьями
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3 mb-6">
        {rounds.map((round) => (
          <button
            key={round.label}
            onClick={round.onClick}
            className="w-full py-4 px-6 rounded-xl border-2 font-orbitron font-bold transition-all duration-200 hover:scale-105 active:scale-95 text-left flex items-center justify-between group"
            style={{
              borderColor: `${round.color}50`,
              background: `${round.color}08`,
              boxShadow: `0 0 20px ${round.color}15`,
            }}
          >
            <div>
              <div className="font-exo text-xs font-semibold mb-0.5" style={{ color: `${round.color}80` }}>
                {round.label}
              </div>
              <div className="text-base font-black" style={{ color: round.color, textShadow: `0 0 15px ${round.color}60` }}>
                {round.title}
              </div>
              <div className="font-exo text-xs text-gray-500 mt-0.5">{round.desc}</div>
            </div>
            <Icon name={round.icon as Parameters<typeof Icon>[0]['name']} size={28} style={{ color: `${round.color}60` }} />
          </button>
        ))}
      </div>

      <div className="flex gap-3 w-full max-w-sm mb-4">
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

      <button
        onClick={onEditor}
        className="w-full max-w-sm py-2.5 px-4 font-exo font-semibold text-xs rounded-xl border border-dashed transition-all duration-200 hover:bg-white/5 flex items-center justify-center gap-2"
        style={{ borderColor: 'rgba(255,255,255,0.12)', color: '#555' }}
      >
        <Icon name="Pencil" size={13} />
        Редактор (для организаторов)
      </button>
    </div>
  );
};

export default HomePage;
