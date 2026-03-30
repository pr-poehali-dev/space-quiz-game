import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage = ({ onBack }: AboutPageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <div className={`relative z-10 min-h-screen px-4 py-6 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-exo text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </button>
          <div className="font-orbitron text-white font-bold text-lg">О ПРОЕКТЕ</div>
        </div>

        <div className="text-center mb-10">
          <div className="text-7xl mb-4">🚀</div>
          <h2
            className="font-orbitron text-3xl font-black text-white mb-2"
            style={{ textShadow: '0 0 20px rgba(0,255,255,0.5)' }}
          >
            КОСМИЧЕСКИЕ РЕБУСЫ
          </h2>
          <div className="font-exo text-sm text-cyan-400 tracking-widest uppercase mb-4">
            ко Дню Космонавтики · 12 апреля
          </div>
          <p className="font-exo text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            Интерактивная игра-ребусы, созданная в честь праздника покорения космоса.
            Проверь свои знания космической терминологии!
          </p>
        </div>

        <div className="space-y-3">
          {[
            { icon: '🌌', label: '30 уникальных слов', sub: 'Ракеты, планеты, физика и многое другое' },
            { icon: '🎯', label: '90 ребусов', sub: '3 уровня сложности для каждого слова' },
            { icon: '⏱️', label: 'Система таймеров', sub: 'От 30 секунд до 1.5 минут' },
            { icon: '🏆', label: 'Таблица лидеров', sub: 'Соревнуйся с другими игроками' },
            { icon: '✨', label: 'Партикулярные эффекты', sub: 'Звёздное небо и анимации' },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center gap-4 p-4 rounded-xl border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-exo font-semibold text-white text-sm">{item.label}</div>
                <div className="font-exo text-xs text-gray-600">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 p-5 rounded-xl border text-center"
          style={{ borderColor: '#00ffff20', background: '#00ffff05' }}
        >
          <div className="font-exo text-xs text-gray-600 mb-2">Создано с ❤️ к</div>
          <div
            className="font-orbitron font-bold text-lg"
            style={{ color: '#00ffff', textShadow: '0 0 15px #00ffff50' }}
          >
            12 апреля 1961
          </div>
          <div className="font-exo text-xs text-gray-600 mt-1">
            65 лет со дня первого полёта человека в космос
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
