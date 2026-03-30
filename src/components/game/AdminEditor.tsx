import { useState, useRef } from 'react';
import { wordsData, DIFFICULTY_CONFIG, Difficulty } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface AdminEditorProps {
  onBack: () => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

const storageKey = (wordId: number, diff: Difficulty) => `rebus_img_${wordId}_${diff}`;

export const getCustomImage = (wordId: number, diff: Difficulty): string | null => {
  return localStorage.getItem(storageKey(wordId, diff));
};

const AdminEditor = ({ onBack }: AdminEditorProps) => {
  const [selectedWord, setSelectedWord] = useState(wordsData[0]);
  const [selectedDiff, setSelectedDiff] = useState<Difficulty>('easy');
  const [images, setImages] = useState<Record<string, string>>(() => {
    const result: Record<string, string> = {};
    wordsData.forEach(w => {
      DIFFICULTIES.forEach(d => {
        const img = localStorage.getItem(storageKey(w.id, d));
        if (img) result[storageKey(w.id, d)] = img;
      });
    });
    return result;
  });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentKey = storageKey(selectedWord.id, selectedDiff);
  const currentImage = images[currentKey] || null;
  const config = DIFFICULTY_CONFIG[selectedDiff];

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      localStorage.setItem(currentKey, data);
      setImages(prev => ({ ...prev, [currentKey]: data }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    localStorage.removeItem(currentKey);
    setImages(prev => {
      const next = { ...prev };
      delete next[currentKey];
      return next;
    });
  };

  const wordIndex = wordsData.findIndex(w => w.id === selectedWord.id);

  const countFilled = () => {
    let n = 0;
    wordsData.forEach(w => DIFFICULTIES.forEach(d => {
      if (images[storageKey(w.id, d)]) n++;
    }));
    return n;
  };

  return (
    <div className="relative z-10 min-h-screen px-4 py-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-exo text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </button>
          <div className="text-center">
            <div className="font-orbitron text-white font-bold">РЕДАКТОР РЕБУСОВ</div>
            <div className="font-exo text-xs text-gray-600 mt-0.5">
              Загружено картинок: <span style={{ color: '#00ff88' }}>{countFilled()}</span> / 90
            </div>
          </div>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Левая колонка — список слов */}
          <div>
            <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">Выбери слово</div>
            <div className="grid grid-cols-3 gap-2 max-h-[420px] overflow-y-auto pr-1">
              {wordsData.map((w, idx) => {
                const filledCount = DIFFICULTIES.filter(d => images[storageKey(w.id, d)]).length;
                const isSelected = w.id === selectedWord.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWord(w)}
                    className="p-2 rounded-xl border text-center transition-all duration-150 hover:scale-105"
                    style={{
                      borderColor: isSelected ? '#00ffff' : filledCount > 0 ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.07)',
                      background: isSelected ? 'rgba(0,255,255,0.1)' : filledCount > 0 ? 'rgba(0,255,136,0.05)' : 'rgba(255,255,255,0.02)',
                      boxShadow: isSelected ? '0 0 12px rgba(0,255,255,0.3)' : 'none',
                    }}
                  >
                    <div className="font-orbitron text-xs font-bold" style={{ color: isSelected ? '#00ffff' : '#666' }}>
                      {idx + 1} сл.
                    </div>
                    <div className="flex justify-center gap-0.5 mt-1">
                      {DIFFICULTIES.map(d => (
                        <div
                          key={d}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: images[storageKey(w.id, d)] ? DIFFICULTY_CONFIG[d].color : 'rgba(255,255,255,0.1)',
                          }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Правая колонка — загрузчик */}
          <div>
            <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">
              {wordIndex + 1} слово · Выбери уровень
            </div>

            {/* Выбор сложности */}
            <div className="flex gap-2 mb-4">
              {DIFFICULTIES.map(d => {
                const cfg = DIFFICULTY_CONFIG[d];
                const hasImg = !!images[storageKey(selectedWord.id, d)];
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDiff(d)}
                    className="flex-1 py-2 rounded-xl border font-orbitron text-xs font-bold transition-all"
                    style={{
                      borderColor: selectedDiff === d ? cfg.color : `${cfg.color}30`,
                      background: selectedDiff === d ? `${cfg.color}15` : 'transparent',
                      color: selectedDiff === d ? cfg.color : `${cfg.color}80`,
                    }}
                  >
                    {cfg.label}
                    {hasImg && <span className="ml-1">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Зона загрузки */}
            <div
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => !currentImage && fileInputRef.current?.click()}
              className="relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden"
              style={{
                borderColor: dragOver ? config.color : currentImage ? `${config.color}50` : 'rgba(255,255,255,0.1)',
                background: dragOver ? `${config.color}08` : 'rgba(255,255,255,0.02)',
                minHeight: '220px',
                cursor: currentImage ? 'default' : 'pointer',
              }}
            >
              {currentImage ? (
                <div className="relative">
                  <img
                    src={currentImage}
                    alt="ребус"
                    className="w-full rounded-2xl object-contain max-h-56"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="px-4 py-2 rounded-xl font-exo text-sm font-semibold text-black"
                      style={{ background: config.color }}
                    >
                      Заменить
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                      className="px-4 py-2 rounded-xl font-exo text-sm font-semibold border"
                      style={{ borderColor: '#ff3366', color: '#ff3366' }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 gap-3">
                  <Icon name="Upload" size={32} style={{ color: dragOver ? config.color : '#444' }} />
                  <div className="font-exo text-sm text-center" style={{ color: dragOver ? config.color : '#555' }}>
                    {dragOver ? 'Отпусти для загрузки' : 'Перетащи картинку или нажми'}
                  </div>
                  <div className="font-exo text-xs text-gray-700">PNG, JPG, GIF, WebP</div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
            />

            {/* Текущий текстовый ребус */}
            <div className="mt-4 p-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="font-exo text-xs text-gray-600 mb-1">Текущий текстовый ребус (резерв):</div>
              <div className="font-exo text-sm text-gray-400">{selectedWord.rebus[selectedDiff].puzzle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
