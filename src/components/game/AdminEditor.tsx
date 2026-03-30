import { useState, useRef } from 'react';
import { wordsData, DIFFICULTY_CONFIG, Difficulty, truthOrLieData, riddlesData, TruthOrLieItem, RiddleItem } from '@/data/rebusData';
import Icon from '@/components/ui/icon';

interface AdminEditorProps {
  onBack: () => void;
}

type Tab = 'round1' | 'round2' | 'round3';
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

const storageKey = (wordId: number, diff: Difficulty) => `rebus_img_${wordId}_${diff}`;
const hintKey = (wordId: number, diff: Difficulty) => `rebus_hint_${wordId}_${diff}`;
const tolKey = (id: number) => `tol_${id}`;
const riddleKey = (id: number, field: 'question' | 'hint') => `riddle_${field}_${id}`;

export const getCustomImage = (wordId: number, diff: Difficulty): string | null => {
  return localStorage.getItem(storageKey(wordId, diff));
};

export const getCustomHint = (wordId: number, diff: Difficulty): string | null => {
  return localStorage.getItem(hintKey(wordId, diff));
};

export const getCustomTolStatement = (id: number): Partial<TruthOrLieItem> | null => {
  const raw = localStorage.getItem(tolKey(id));
  return raw ? JSON.parse(raw) : null;
};

export const getCustomRiddle = (id: number): Partial<RiddleItem> | null => {
  const raw = localStorage.getItem(riddleKey(id, 'question'));
  const hint = localStorage.getItem(riddleKey(id, 'hint'));
  if (!raw && !hint) return null;
  return { question: raw || undefined, hint: hint || undefined };
};

const AdminEditor = ({ onBack }: AdminEditorProps) => {
  const [tab, setTab] = useState<Tab>('round1');

  const [selectedWordId, setSelectedWordId] = useState(wordsData[0].id);
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
  const [hints, setHints] = useState<Record<string, string>>(() => {
    const result: Record<string, string> = {};
    wordsData.forEach(w => {
      DIFFICULTIES.forEach(d => {
        const h = localStorage.getItem(hintKey(w.id, d));
        if (h) result[hintKey(w.id, d)] = h;
      });
    });
    return result;
  });
  const [editingHint, setEditingHint] = useState(false);
  const [hintDraft, setHintDraft] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tolItems, setTolItems] = useState<Record<number, Partial<TruthOrLieItem>>>(() => {
    const result: Record<number, Partial<TruthOrLieItem>> = {};
    truthOrLieData.forEach(item => {
      const raw = localStorage.getItem(tolKey(item.id));
      if (raw) result[item.id] = JSON.parse(raw);
    });
    return result;
  });
  const [selectedTolId, setSelectedTolId] = useState(truthOrLieData[0].id);
  const [tolDraft, setTolDraft] = useState<Partial<TruthOrLieItem>>({});
  const [tolEditing, setTolEditing] = useState(false);

  const [riddleItems, setRiddleItems] = useState<Record<number, Partial<RiddleItem>>>(() => {
    const result: Record<number, Partial<RiddleItem>> = {};
    riddlesData.forEach(item => {
      const q = localStorage.getItem(riddleKey(item.id, 'question'));
      const h = localStorage.getItem(riddleKey(item.id, 'hint'));
      if (q || h) result[item.id] = { question: q || undefined, hint: h || undefined };
    });
    return result;
  });
  const [selectedRiddleId, setSelectedRiddleId] = useState(riddlesData[0].id);
  const [riddleDraft, setRiddleDraft] = useState<Partial<RiddleItem>>({});
  const [riddleEditing, setRiddleEditing] = useState(false);

  const selectedWord = wordsData.find(w => w.id === selectedWordId)!;
  const wordIndex = wordsData.findIndex(w => w.id === selectedWordId);
  const currentImgKey = storageKey(selectedWordId, selectedDiff);
  const currentHintKey = hintKey(selectedWordId, selectedDiff);
  const currentImage = images[currentImgKey] || null;
  const currentHintValue = hints[currentHintKey] || selectedWord.rebus[selectedDiff].hint;
  const config = DIFFICULTY_CONFIG[selectedDiff];

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      localStorage.setItem(currentImgKey, data);
      setImages(prev => ({ ...prev, [currentImgKey]: data }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemoveImg = () => {
    localStorage.removeItem(currentImgKey);
    setImages(prev => { const next = { ...prev }; delete next[currentImgKey]; return next; });
  };

  const saveHint = () => {
    localStorage.setItem(currentHintKey, hintDraft);
    setHints(prev => ({ ...prev, [currentHintKey]: hintDraft }));
    setEditingHint(false);
  };

  const resetHint = () => {
    localStorage.removeItem(currentHintKey);
    setHints(prev => { const next = { ...prev }; delete next[currentHintKey]; return next; });
    setEditingHint(false);
  };

  const countFilledImgs = () => {
    let n = 0;
    wordsData.forEach(w => DIFFICULTIES.forEach(d => { if (images[storageKey(w.id, d)]) n++; }));
    return n;
  };

  const selectedTol = truthOrLieData.find(t => t.id === selectedTolId)!;
  const mergedTol = { ...selectedTol, ...tolItems[selectedTolId] };

  const openTolEdit = () => {
    setTolDraft({ statement: mergedTol.statement, isTrue: mergedTol.isTrue, explanation: mergedTol.explanation });
    setTolEditing(true);
  };

  const saveTol = () => {
    const merged = { ...tolItems[selectedTolId], ...tolDraft };
    localStorage.setItem(tolKey(selectedTolId), JSON.stringify(merged));
    setTolItems(prev => ({ ...prev, [selectedTolId]: merged }));
    setTolEditing(false);
  };

  const resetTol = () => {
    localStorage.removeItem(tolKey(selectedTolId));
    setTolItems(prev => { const next = { ...prev }; delete next[selectedTolId]; return next; });
    setTolEditing(false);
  };

  const selectedRiddle = riddlesData.find(r => r.id === selectedRiddleId)!;
  const mergedRiddle = { ...selectedRiddle, ...riddleItems[selectedRiddleId] };

  const openRiddleEdit = () => {
    setRiddleDraft({ question: mergedRiddle.question, hint: mergedRiddle.hint });
    setRiddleEditing(true);
  };

  const saveRiddle = () => {
    if (riddleDraft.question !== undefined) localStorage.setItem(riddleKey(selectedRiddleId, 'question'), riddleDraft.question);
    if (riddleDraft.hint !== undefined) localStorage.setItem(riddleKey(selectedRiddleId, 'hint'), riddleDraft.hint);
    setRiddleItems(prev => ({ ...prev, [selectedRiddleId]: { ...prev[selectedRiddleId], ...riddleDraft } }));
    setRiddleEditing(false);
  };

  const resetRiddle = () => {
    localStorage.removeItem(riddleKey(selectedRiddleId, 'question'));
    localStorage.removeItem(riddleKey(selectedRiddleId, 'hint'));
    setRiddleItems(prev => { const next = { ...prev }; delete next[selectedRiddleId]; return next; });
    setRiddleEditing(false);
  };

  const TABS = [
    { id: 'round1' as Tab, label: 'Раунд 1 · Ребусы', color: '#00ffff' },
    { id: 'round2' as Tab, label: 'Раунд 2 · Правда/Ложь', color: '#ffaa00' },
    { id: 'round3' as Tab, label: 'Раунд 3 · Загадки', color: '#aa00ff' },
  ];

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
            <div className="font-orbitron text-white font-bold">РЕДАКТОР</div>
          </div>
          <div className="w-20" />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-shrink-0 px-4 py-2 rounded-xl font-exo text-sm font-semibold border transition-all"
              style={{
                borderColor: tab === t.id ? t.color : `${t.color}30`,
                background: tab === t.id ? `${t.color}15` : 'transparent',
                color: tab === t.id ? t.color : `${t.color}60`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'round1' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">
                Выбери слово · картинок: <span style={{ color: '#00ff88' }}>{countFilledImgs()}</span>/90
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-[420px] overflow-y-auto pr-1">
                {wordsData.map((w, idx) => {
                  const filledCount = DIFFICULTIES.filter(d => images[storageKey(w.id, d)]).length;
                  const isSelected = w.id === selectedWordId;
                  return (
                    <button
                      key={w.id}
                      onClick={() => { setSelectedWordId(w.id); setEditingHint(false); }}
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
                          <div key={d} className="w-1.5 h-1.5 rounded-full"
                            style={{ background: images[storageKey(w.id, d)] ? DIFFICULTY_CONFIG[d].color : 'rgba(255,255,255,0.1)' }} />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">
                {wordIndex + 1}. {selectedWord.word} · Уровень
              </div>

              <div className="flex gap-2 mb-4">
                {DIFFICULTIES.map(d => {
                  const cfg = DIFFICULTY_CONFIG[d];
                  const hasImg = !!images[storageKey(selectedWordId, d)];
                  return (
                    <button
                      key={d}
                      onClick={() => { setSelectedDiff(d); setEditingHint(false); }}
                      className="flex-1 py-2 rounded-xl border font-orbitron text-xs font-bold transition-all"
                      style={{
                        borderColor: selectedDiff === d ? cfg.color : `${cfg.color}30`,
                        background: selectedDiff === d ? `${cfg.color}15` : 'transparent',
                        color: selectedDiff === d ? cfg.color : `${cfg.color}80`,
                      }}
                    >
                      {cfg.label}{hasImg && <span className="ml-1">✓</span>}
                    </button>
                  );
                })}
              </div>

              <div className="mb-4 p-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="font-exo text-xs text-gray-500 mb-1">Ребус</div>
                <div className="font-exo text-white text-sm">{selectedWord.rebus[selectedDiff].puzzle}</div>
              </div>

              <div className="mb-4 p-3 rounded-xl border" style={{ borderColor: `${config.color}30`, background: `${config.color}05` }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-exo text-xs text-gray-500">Подсказка</div>
                  {!editingHint && (
                    <button onClick={() => { setHintDraft(currentHintValue); setEditingHint(true); }}
                      className="font-exo text-xs px-2 py-0.5 rounded-lg border transition-all hover:bg-white/5"
                      style={{ borderColor: `${config.color}40`, color: config.color }}>
                      Изменить
                    </button>
                  )}
                </div>
                {editingHint ? (
                  <div>
                    <textarea
                      value={hintDraft}
                      onChange={e => setHintDraft(e.target.value)}
                      className="w-full bg-transparent border rounded-lg p-2 font-exo text-sm text-white resize-none outline-none"
                      style={{ borderColor: `${config.color}40` }}
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={saveHint}
                        className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold text-black"
                        style={{ background: config.color }}>
                        Сохранить
                      </button>
                      <button onClick={resetHint}
                        className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
                        style={{ borderColor: '#ff336640', color: '#ff3366' }}>
                        Сбросить
                      </button>
                      <button onClick={() => setEditingHint(false)}
                        className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}>
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="font-exo text-sm" style={{ color: config.color }}>
                    💡 {currentHintValue}
                    {hints[currentHintKey] && <span className="ml-2 text-xs text-gray-600">(изменено)</span>}
                  </div>
                )}
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => !currentImage && fileInputRef.current?.click()}
                className="relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden"
                style={{
                  borderColor: dragOver ? config.color : currentImage ? `${config.color}50` : 'rgba(255,255,255,0.1)',
                  background: dragOver ? `${config.color}08` : 'rgba(255,255,255,0.02)',
                  minHeight: '160px',
                  cursor: currentImage ? 'default' : 'pointer',
                }}
              >
                {currentImage ? (
                  <div className="relative">
                    <img src={currentImage} alt="ребус" className="w-full rounded-2xl object-contain max-h-40" />
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(0,0,0,0.6)' }}>
                      <button onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="px-4 py-2 rounded-xl font-exo text-sm font-semibold text-black"
                        style={{ background: config.color }}>Заменить</button>
                      <button onClick={e => { e.stopPropagation(); handleRemoveImg(); }}
                        className="px-4 py-2 rounded-xl font-exo text-sm font-semibold border"
                        style={{ borderColor: '#ff3366', color: '#ff3366' }}>Удалить</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8 gap-3">
                    <Icon name="Upload" size={28} style={{ color: dragOver ? config.color : '#444' }} />
                    <div className="font-exo text-sm text-gray-500 text-center">
                      Перетащи картинку или нажми
                    </div>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>
          </div>
        )}

        {tab === 'round2' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">Выбери утверждение</div>
              <div className="grid grid-cols-3 gap-2 max-h-[480px] overflow-y-auto pr-1">
                {truthOrLieData.map((item, idx) => {
                  const isSelected = item.id === selectedTolId;
                  const isEdited = !!tolItems[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setSelectedTolId(item.id); setTolEditing(false); }}
                      className="p-2 rounded-xl border text-center transition-all duration-150 hover:scale-105"
                      style={{
                        borderColor: isSelected ? '#ffaa00' : isEdited ? 'rgba(255,170,0,0.3)' : 'rgba(255,255,255,0.07)',
                        background: isSelected ? 'rgba(255,170,0,0.1)' : isEdited ? 'rgba(255,170,0,0.05)' : 'rgba(255,255,255,0.02)',
                        boxShadow: isSelected ? '0 0 12px rgba(255,170,0,0.3)' : 'none',
                      }}
                    >
                      <div className="font-orbitron text-xs font-bold" style={{ color: isSelected ? '#ffaa00' : '#666' }}>
                        #{idx + 1}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: (tolItems[item.id]?.isTrue ?? item.isTrue) ? '#00ff88' : '#ff3366' }}>
                        {(tolItems[item.id]?.isTrue ?? item.isTrue) ? 'ПРАВДА' : 'ЛОЖЬ'}
                      </div>
                      {isEdited && <div className="text-xs text-yellow-500 mt-0.5">✎</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">
                Утверждение #{truthOrLieData.findIndex(t => t.id === selectedTolId) + 1}
              </div>

              {!tolEditing ? (
                <div>
                  <div className="p-4 rounded-xl border mb-3" style={{ borderColor: 'rgba(255,170,0,0.2)', background: 'rgba(255,170,0,0.05)' }}>
                    <div className="font-exo text-sm text-white mb-2">{mergedTol.statement}</div>
                    <div className="inline-block px-2 py-0.5 rounded-lg font-orbitron text-xs font-bold"
                      style={{ background: mergedTol.isTrue ? 'rgba(0,255,136,0.15)' : 'rgba(255,51,102,0.15)', color: mergedTol.isTrue ? '#00ff88' : '#ff3366' }}>
                      {mergedTol.isTrue ? 'ПРАВДА' : 'ЛОЖЬ'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="font-exo text-xs text-gray-500 mb-1">Объяснение</div>
                    <div className="font-exo text-sm text-gray-300">{mergedTol.explanation}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={openTolEdit}
                      className="flex-1 py-2.5 rounded-xl font-exo text-sm font-semibold border transition-all hover:bg-white/5"
                      style={{ borderColor: '#ffaa0040', color: '#ffaa00' }}>
                      <Icon name="Pencil" size={14} className="inline mr-1" />Изменить
                    </button>
                    {tolItems[selectedTolId] && (
                      <button onClick={resetTol}
                        className="py-2.5 px-4 rounded-xl font-exo text-sm font-semibold border transition-all hover:bg-white/5"
                        style={{ borderColor: '#ff336640', color: '#ff3366' }}>
                        Сбросить
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <div className="font-exo text-xs text-gray-500 mb-1">Текст утверждения</div>
                    <textarea
                      value={tolDraft.statement || ''}
                      onChange={e => setTolDraft(p => ({ ...p, statement: e.target.value }))}
                      className="w-full bg-transparent border rounded-xl p-3 font-exo text-sm text-white resize-none outline-none"
                      style={{ borderColor: 'rgba(255,170,0,0.4)' }}
                      rows={3}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="font-exo text-xs text-gray-500 mb-2">Ответ</div>
                    <div className="flex gap-2">
                      {[true, false].map(val => (
                        <button key={String(val)}
                          onClick={() => setTolDraft(p => ({ ...p, isTrue: val }))}
                          className="flex-1 py-2 rounded-xl font-orbitron text-xs font-bold border transition-all"
                          style={{
                            borderColor: tolDraft.isTrue === val ? (val ? '#00ff88' : '#ff3366') : 'rgba(255,255,255,0.1)',
                            background: tolDraft.isTrue === val ? (val ? 'rgba(0,255,136,0.15)' : 'rgba(255,51,102,0.15)') : 'transparent',
                            color: tolDraft.isTrue === val ? (val ? '#00ff88' : '#ff3366') : '#666',
                          }}>
                          {val ? 'ПРАВДА' : 'ЛОЖЬ'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="font-exo text-xs text-gray-500 mb-1">Объяснение</div>
                    <textarea
                      value={tolDraft.explanation || ''}
                      onChange={e => setTolDraft(p => ({ ...p, explanation: e.target.value }))}
                      className="w-full bg-transparent border rounded-xl p-3 font-exo text-sm text-white resize-none outline-none"
                      style={{ borderColor: 'rgba(255,170,0,0.4)' }}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveTol}
                      className="flex-1 py-2.5 rounded-xl font-exo text-sm font-semibold text-black"
                      style={{ background: '#ffaa00' }}>Сохранить</button>
                    <button onClick={() => setTolEditing(false)}
                      className="flex-1 py-2.5 rounded-xl font-exo text-sm font-semibold border"
                      style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}>Отмена</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'round3' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">Выбери загадку</div>
              <div className="grid grid-cols-3 gap-2 max-h-[480px] overflow-y-auto pr-1">
                {riddlesData.map((item, idx) => {
                  const isSelected = item.id === selectedRiddleId;
                  const isEdited = !!riddleItems[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setSelectedRiddleId(item.id); setRiddleEditing(false); }}
                      className="p-2 rounded-xl border text-center transition-all duration-150 hover:scale-105"
                      style={{
                        borderColor: isSelected ? '#aa00ff' : isEdited ? 'rgba(170,0,255,0.3)' : 'rgba(255,255,255,0.07)',
                        background: isSelected ? 'rgba(170,0,255,0.1)' : isEdited ? 'rgba(170,0,255,0.05)' : 'rgba(255,255,255,0.02)',
                        boxShadow: isSelected ? '0 0 12px rgba(170,0,255,0.3)' : 'none',
                      }}
                    >
                      <div className="font-orbitron text-xs font-bold" style={{ color: isSelected ? '#aa00ff' : '#666' }}>
                        #{idx + 1}
                      </div>
                      <div className="font-exo text-xs mt-0.5 truncate" style={{ color: '#555' }}>
                        {(riddleItems[item.id]?.question || item.question).slice(0, 12)}...
                      </div>
                      {isEdited && <div className="text-xs text-purple-400 mt-0.5">✎</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-3">
                Загадка #{riddlesData.findIndex(r => r.id === selectedRiddleId) + 1}
              </div>

              {!riddleEditing ? (
                <div>
                  <div className="p-4 rounded-xl border mb-3" style={{ borderColor: 'rgba(170,0,255,0.2)', background: 'rgba(170,0,255,0.05)' }}>
                    <div className="font-exo text-sm text-white mb-3">{mergedRiddle.question}</div>
                    <div className="font-exo text-xs text-gray-500 mb-1">Подсказка</div>
                    <div className="font-exo text-sm" style={{ color: '#aa00ff' }}>💡 {mergedRiddle.hint}</div>
                  </div>
                  <div className="p-3 rounded-xl border mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="font-exo text-xs text-gray-500 mb-1">Ответ</div>
                    <div className="font-orbitron text-sm font-bold text-white">{mergedRiddle.answer}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={openRiddleEdit}
                      className="flex-1 py-2.5 rounded-xl font-exo text-sm font-semibold border transition-all hover:bg-white/5"
                      style={{ borderColor: '#aa00ff40', color: '#aa00ff' }}>
                      <Icon name="Pencil" size={14} className="inline mr-1" />Изменить
                    </button>
                    {riddleItems[selectedRiddleId] && (
                      <button onClick={resetRiddle}
                        className="py-2.5 px-4 rounded-xl font-exo text-sm font-semibold border transition-all hover:bg-white/5"
                        style={{ borderColor: '#ff336640', color: '#ff3366' }}>
                        Сбросить
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <div className="font-exo text-xs text-gray-500 mb-1">Текст загадки</div>
                    <textarea
                      value={riddleDraft.question || ''}
                      onChange={e => setRiddleDraft(p => ({ ...p, question: e.target.value }))}
                      className="w-full bg-transparent border rounded-xl p-3 font-exo text-sm text-white resize-none outline-none"
                      style={{ borderColor: 'rgba(170,0,255,0.4)' }}
                      rows={4}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="font-exo text-xs text-gray-500 mb-1">Подсказка</div>
                    <input
                      value={riddleDraft.hint || ''}
                      onChange={e => setRiddleDraft(p => ({ ...p, hint: e.target.value }))}
                      className="w-full bg-transparent border rounded-xl p-3 font-exo text-sm text-white outline-none"
                      style={{ borderColor: 'rgba(170,0,255,0.4)' }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveRiddle}
                      className="flex-1 py-2.5 rounded-xl font-exo text-sm font-semibold text-white"
                      style={{ background: '#aa00ff' }}>Сохранить</button>
                    <button onClick={() => setRiddleEditing(false)}
                      className="flex-1 py-2.5 rounded-xl font-exo text-sm font-semibold border"
                      style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}>Отмена</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminEditor;
