import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { DIFFICULTY_CONFIG } from '@/data/rebusData';

interface RulesPageProps {
  onBack: () => void;
}

const RulesPage = ({ onBack }: RulesPageProps) => {
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
          <div className="font-orbitron text-white font-bold text-lg">ПРАВИЛА ИГРЫ</div>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: '🎯',
              title: 'Цель игры',
              text: 'Разгадай как можно больше ребусов. Каждое слово — отдельный ребус на 3 уровнях сложности. Всего 30 слов × 3 уровня = 90 ребусов!',
            },
            {
              icon: '🖱️',
              title: 'Как играть',
              text: 'Выбери слово из сетки → выбери сложность → разгадай ребус до истечения времени → введи ответ и нажми "Проверить".',
            },
            {
              icon: '⏱️',
              title: 'Время',
              text: 'Каждый уровень имеет своё время. Чем быстрее угадаешь — тем больше очков получишь!',
            },
            {
              icon: '💡',
              title: 'Подсказки',
              text: 'Если не можешь разгадать — используй кнопку "Подсказка". Но помни: за подсказку очки не снижаются, выгоднее угадать самостоятельно.',
            },
          ].map(item => (
            <div
              key={item.title}
              className="p-5 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white mb-1">{item.title}</div>
                  <div className="font-exo text-sm text-gray-400 leading-relaxed">{item.text}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="p-5 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="font-orbitron text-sm font-bold text-white mb-3">⚡ УРОВНИ СЛОЖНОСТИ</div>
            <div className="space-y-3">
              {(['easy', 'medium', 'hard'] as const).map(diff => {
                const config = DIFFICULTY_CONFIG[diff];
                const mult = diff === 'easy' ? 'x1' : diff === 'medium' ? 'x2' : 'x3';
                return (
                  <div key={diff} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: config.color, boxShadow: `0 0 8px ${config.color}` }} />
                      <span className="font-exo text-sm" style={{ color: config.color }}>{config.label}</span>
                    </div>
                    <div className="flex gap-4 font-exo text-xs text-gray-500">
                      <span>⏱ {config.time} сек</span>
                      <span>💎 {mult} очки</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
