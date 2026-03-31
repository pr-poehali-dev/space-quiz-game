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
const wordKey = (wordId: number) => `rebus_word_${wordId}`;
const tolKey = (id: number) => `tol_${id}`;
const tolImgKey = (id: number) => `tol_img_${id}`;
const tolTimeKey = () => `tol_time`;
const riddleKey = (id: number, field: 'question' | 'hint' | 'answer') => `riddle_${field}_${id}`;
const riddleImgKey = (id: number) => `riddle_img_${id}`;
const riddleTimeKey = () => `riddle_time`;
const r1TimeKey = (diff: Difficulty) => `r1_time_${diff}`;

export const getCustomImage = (wordId: number, diff: Difficulty): string | null => {
  return localStorage.getItem(storageKey(wordId, diff));
};

export const getCustomHint = (wordId: number, diff: Difficulty): string | null => {
  return localStorage.getItem(hintKey(wordId, diff));
};

export const getCustomWord = (wordId: number): string | null => {
  return localStorage.getItem(wordKey(wordId));
};

export const getCustomTolStatement = (id: number): Partial<TruthOrLieItem> | null => {
  const raw = localStorage.getItem(tolKey(id));
  return raw ? JSON.parse(raw) : null;
};

export const getCustomTolImage = (id: number): string | null => {
  return localStorage.getItem(tolImgKey(id));
};

export const getCustomTolTime = (): number | null => {
  const v = localStorage.getItem(tolTimeKey());
  return v ? parseInt(v) : null;
};

export const getCustomRiddle = (id: number): Partial<RiddleItem> | null => {
  const raw = localStorage.getItem(riddleKey(id, 'question'));
  const hint = localStorage.getItem(riddleKey(id, 'hint'));
  const answer = localStorage.getItem(riddleKey(id, 'answer'));
  if (!raw && !hint && !answer) return null;
  return { question: raw || undefined, hint: hint || undefined, answer: answer || undefined };
};

export const getCustomRiddleImage = (id: number): string | null => {
  return localStorage.getItem(riddleImgKey(id));
};

export const getCustomRiddleTime = (): number | null => {
  const v = localStorage.getItem(riddleTimeKey());
  return v ? parseInt(v) : null;
};

export const getCustomR1Time = (diff: Difficulty): number | null => {
  const v = localStorage.getItem(r1TimeKey(diff));
  return v ? parseInt(v) : null;
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
  const [customWords, setCustomWords] = useState<Record<number, string>>(() => {
    const result: Record<number, string> = {};
    wordsData.forEach(w => {
      const cw = localStorage.getItem(wordKey(w.id));
      if (cw) result[w.id] = cw;
    });
    return result;
  });
  const [editingHint, setEditingHint] = useState(false);
  const [hintDraft, setHintDraft] = useState('');
  const [editingWord, setEditingWord] = useState(false);
  const [wordDraft, setWordDraft] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [r1Times, setR1Times] = useState<Record<string, number>>(() => {
    const result: Record<string, number> = {};
    DIFFICULTIES.forEach(d => {
      const t = localStorage.getItem(r1TimeKey(d));
      if (t) result[d] = parseInt(t);
    });
    return result;
  });
  const [editingR1Time, setEditingR1Time] = useState(false);
  const [r1TimeDraft, setR1TimeDraft] = useState(0);

  const [tolItems, setTolItems] = useState<Record<number, Partial<TruthOrLieItem>>>(() => {
    const result: Record<number, Partial<TruthOrLieItem>> = {};
    truthOrLieData.forEach(item => {
      const raw = localStorage.getItem(tolKey(item.id));
      if (raw) result[item.id] = JSON.parse(raw);
    });
    return result;
  });
  const [tolImages, setTolImages] = useState<Record<number, string>>(() => {
    const result: Record<number, string> = {};
    truthOrLieData.forEach(item => {
      const img = localStorage.getItem(tolImgKey(item.id));
      if (img) result[item.id] = img;
    });
    return result;
  });
  const [selectedTolId, setSelectedTolId] = useState(truthOrLieData[0].id);
  const [tolDraft, setTolDraft] = useState<Partial<TruthOrLieItem>>({});
  const [tolEditing, setTolEditing] = useState(false);
  const tolFileRef = useRef<HTMLInputElement>(null);
  const [tolDragOver, setTolDragOver] = useState(false);

  const [tolTime, setTolTime] = useState<number>(() => {
    const v = localStorage.getItem(tolTimeKey());
    return v ? parseInt(v) : 30;
  });
  const [editingTolTime, setEditingTolTime] = useState(false);
  const [tolTimeDraft, setTolTimeDraft] = useState(30);

  const [riddleItems, setRiddleItems] = useState<Record<number, Partial<RiddleItem>>>(() => {
    const result: Record<number, Partial<RiddleItem>> = {};
    riddlesData.forEach(item => {
      const q = localStorage.getItem(riddleKey(item.id, 'question'));
      const h = localStorage.getItem(riddleKey(item.id, 'hint'));
      const a = localStorage.getItem(riddleKey(item.id, 'answer'));
      if (q || h || a) result[item.id] = { question: q || undefined, hint: h || undefined, answer: a || undefined };
    });
    return result;
  });
  const [riddleImages, setRiddleImages] = useState<Record<number, string>>(() => {
    const result: Record<number, string> = {};
    riddlesData.forEach(item => {
      const img = localStorage.getItem(riddleImgKey(item.id));
      if (img) result[item.id] = img;
    });
    return result;
  });
  const [selectedRiddleId, setSelectedRiddleId] = useState(riddlesData[0].id);
  const [riddleDraft, setRiddleDraft] = useState<Partial<RiddleItem>>({});
  const [riddleEditing, setRiddleEditing] = useState(false);
  const riddleFileRef = useRef<HTMLInputElement>(null);
  const [riddleDragOver, setRiddleDragOver] = useState(false);

  const [riddleTime, setRiddleTime] = useState<number>(() => {
    const v = localStorage.getItem(riddleTimeKey());
    return v ? parseInt(v) : 60;
  });
  const [editingRiddleTime, setEditingRiddleTime] = useState(false);
  const [riddleTimeDraft, setRiddleTimeDraft] = useState(60);

  const selectedWord = wordsData.find(w => w.id === selectedWordId)!;
  const wordIndex = wordsData.findIndex(w => w.id === selectedWordId);
  const currentImgKey = storageKey(selectedWordId, selectedDiff);
  const currentHintKey = hintKey(selectedWordId, selectedDiff);
  const currentImage = images[currentImgKey] || null;
  const currentHintValue = hints[currentHintKey] || selectedWord.rebus[selectedDiff].hint;
  const config = DIFFICULTY_CONFIG[selectedDiff];
  const displayWord = customWords[selectedWordId] || selectedWord.word;
  const currentR1Time = r1Times[selectedDiff] || config.time;

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

  const saveWord = () => {
    const val = wordDraft.trim().toUpperCase();
    if (val) {
      localStorage.setItem(wordKey(selectedWordId), val);
      setCustomWords(prev => ({ ...prev, [selectedWordId]: val }));
    }
    setEditingWord(false);
  };

  const resetWord = () => {
    localStorage.removeItem(wordKey(selectedWordId));
    setCustomWords(prev => { const next = { ...prev }; delete next[selectedWordId]; return next; });
    setEditingWord(false);
  };

  const saveR1Time = () => {
    localStorage.setItem(r1TimeKey(selectedDiff), String(r1TimeDraft));
    setR1Times(prev => ({ ...prev, [selectedDiff]: r1TimeDraft }));
    setEditingR1Time(false);
  };

  const resetR1Time = () => {
    localStorage.removeItem(r1TimeKey(selectedDiff));
    setR1Times(prev => { const next = { ...prev }; delete next[selectedDiff]; return next; });
    setEditingR1Time(false);
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

  const handleTolFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      localStorage.setItem(tolImgKey(selectedTolId), data);
      setTolImages(prev => ({ ...prev, [selectedTolId]: data }));
    };
    reader.readAsDataURL(file);
  };

  const removeTolImg = () => {
    localStorage.removeItem(tolImgKey(selectedTolId));
    setTolImages(prev => { const next = { ...prev }; delete next[selectedTolId]; return next; });
  };

  const saveTolTime = () => {
    localStorage.setItem(tolTimeKey(), String(tolTimeDraft));
    setTolTime(tolTimeDraft);
    setEditingTolTime(false);
  };

  const selectedRiddle = riddlesData.find(r => r.id === selectedRiddleId)!;
  const mergedRiddle = { ...selectedRiddle, ...riddleItems[selectedRiddleId] };

  const openRiddleEdit = () => {
    setRiddleDraft({ question: mergedRiddle.question, hint: mergedRiddle.hint, answer: mergedRiddle.answer });
    setRiddleEditing(true);
  };

  const saveRiddle = () => {
    if (riddleDraft.question !== undefined) localStorage.setItem(riddleKey(selectedRiddleId, 'question'), riddleDraft.question);
    if (riddleDraft.hint !== undefined) localStorage.setItem(riddleKey(selectedRiddleId, 'hint'), riddleDraft.hint);
    if (riddleDraft.answer !== undefined) localStorage.setItem(riddleKey(selectedRiddleId, 'answer'), riddleDraft.answer);
    setRiddleItems(prev => ({ ...prev, [selectedRiddleId]: { ...prev[selectedRiddleId], ...riddleDraft } }));
    setRiddleEditing(false);
  };

  const resetRiddle = () => {
    localStorage.removeItem(riddleKey(selectedRiddleId, 'question'));
    localStorage.removeItem(riddleKey(selectedRiddleId, 'hint'));
    localStorage.removeItem(riddleKey(selectedRiddleId, 'answer'));
    setRiddleItems(prev => { const next = { ...prev }; delete next[selectedRiddleId]; return next; });
    setRiddleEditing(false);
  };

  const handleRiddleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      localStorage.setItem(riddleImgKey(selectedRiddleId), data);
      setRiddleImages(prev => ({ ...prev, [selectedRiddleId]: data }));
    };
    reader.readAsDataURL(file);
  };

  const removeRiddleImg = () => {
    localStorage.removeItem(riddleImgKey(selectedRiddleId));
    setRiddleImages(prev => { const next = { ...prev }; delete next[selectedRiddleId]; return next; });
  };

  const saveRiddleTime = () => {
    localStorage.setItem(riddleTimeKey(), String(riddleTimeDraft));
    setRiddleTime(riddleTimeDraft);
    setEditingRiddleTime(false);
  };

  const TABS = [
    { id: 'round1' as Tab, label: 'Раунд 1 · Ребусы', color: '#00ffff' },
    { id: 'round2' as Tab, label: 'Раунд 2 · Правда/Ложь', color: '#ffaa00' },
    { id: 'round3' as Tab, label: 'Раунд 3 · Загадки', color: '#aa00ff' },
  ];

  const ImageUpload = ({ image, onFile, onRemove, color, dragOverState, setDragOverState, inputRefProp }: {
    image: string | null; onFile: (f: File) => void; onRemove: () => void; color: string;
    dragOverState: boolean; setDragOverState: (v: boolean) => void; inputRefProp: React.RefObject<HTMLInputElement>;
  }) => (
    <div
      onDrop={e => { e.preventDefault(); setDragOverState(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }}
      onDragOver={e => { e.preventDefault(); setDragOverState(true); }}
      onDragLeave={() => setDragOverState(false)}
      onClick={() => !image && inputRefProp.current?.click()}
      className="relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden"
      style={{
        borderColor: dragOverState ? color : image ? `${color}50` : 'rgba(255,255,255,0.1)',
        background: dragOverState ? `${color}08` : 'rgba(255,255,255,0.02)',
        minHeight: '120px',
        cursor: image ? 'default' : 'pointer',
      }}
    >
      {image ? (
        <div className="relative">
          <img src={image} alt="" className="w-full rounded-2xl object-contain max-h-32" />
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            <button onClick={e => { e.stopPropagation(); inputRefProp.current?.click(); }}
              className="px-3 py-1.5 rounded-xl font-exo text-xs font-semibold text-black"
              style={{ background: color }}>Заменить</button>
            <button onClick={e => { e.stopPropagation(); onRemove(); }}
              className="px-3 py-1.5 rounded-xl font-exo text-xs font-semibold border"
              style={{ borderColor: '#ff3366', color: '#ff3366' }}>Удалить</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-6 gap-2">
          <Icon name="Upload" size={24} style={{ color: dragOverState ? color : '#444' }} />
          <div className="font-exo text-xs text-gray-500 text-center">Перетащи картинку или нажми</div>
        </div>
      )}
      <input ref={inputRefProp as React.RefObject<HTMLInputElement>} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
    </div>
  );

  const TimeEditor = ({ label, currentTime, defaultTime, editing, setEditing, draft, setDraft, onSave, onReset, color }: {
    label: string; currentTime: number; defaultTime: number; editing: boolean;
    setEditing: (v: boolean) => void; draft: number; setDraft: (v: number) => void;
    onSave: () => void; onReset: () => void; color: string;
  }) => (
    <div className="p-3 rounded-xl border mb-3" style={{ borderColor: `${color}30`, background: `${color}05` }}>
      <div className="flex items-center justify-between mb-1">
        <div className="font-exo text-xs text-gray-500">{label}</div>
        {!editing && (
          <button onClick={() => { setDraft(currentTime); setEditing(true); }}
            className="font-exo text-xs px-2 py-0.5 rounded-lg border transition-all hover:bg-white/5"
            style={{ borderColor: `${color}40`, color }}>
            Изменить
          </button>
        )}
      </div>
      {editing ? (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <input type="range" min={10} max={180} value={draft}
              onChange={e => setDraft(parseInt(e.target.value))}
              className="flex-1 accent-current" style={{ accentColor: color }} />
            <div className="font-orbitron text-lg font-bold w-14 text-right" style={{ color }}>{draft} с</div>
          </div>
          <div className="flex gap-2">
            <button onClick={onSave}
              className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold text-black"
              style={{ background: color }}>Сохранить</button>
            {currentTime !== defaultTime && (
              <button onClick={onReset}
                className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
                style={{ borderColor: '#ff336640', color: '#ff3366' }}>Сбросить</button>
            )}
            <button onClick={() => setEditing(false)}
              className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="font-orbitron text-lg font-bold" style={{ color }}>
          {currentTime} секунд
          {currentTime !== defaultTime && <span className="ml-2 text-xs text-gray-600 font-exo">(изменено)</span>}
        </div>
      )}
    </div>
  );

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
                  const hasCustomWord = !!customWords[w.id];
                  return (
                    <button
                      key={w.id}
                      onClick={() => { setSelectedWordId(w.id); setEditingHint(false); setEditingWord(false); setEditingR1Time(false); }}
                      className="p-2 rounded-xl border text-center transition-all duration-150 hover:scale-105"
                      style={{
                        borderColor: isSelected ? '#00ffff' : filledCount > 0 || hasCustomWord ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.07)',
                        background: isSelected ? 'rgba(0,255,255,0.1)' : filledCount > 0 || hasCustomWord ? 'rgba(0,255,136,0.05)' : 'rgba(255,255,255,0.02)',
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
                {wordIndex + 1}. {displayWord} · Уровень
              </div>

              <div className="mb-3 p-3 rounded-xl border" style={{ borderColor: 'rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)' }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-exo text-xs text-gray-500">Слово (ответ)</div>
                  {!editingWord && (
                    <button onClick={() => { setWordDraft(displayWord); setEditingWord(true); }}
                      className="font-exo text-xs px-2 py-0.5 rounded-lg border transition-all hover:bg-white/5"
                      style={{ borderColor: 'rgba(0,255,255,0.4)', color: '#00ffff' }}>
                      Изменить
                    </button>
                  )}
                </div>
                {editingWord ? (
                  <div>
                    <input
                      value={wordDraft}
                      onChange={e => setWordDraft(e.target.value.toUpperCase())}
                      className="w-full bg-transparent border rounded-lg p-2 font-orbitron text-sm text-white outline-none uppercase"
                      style={{ borderColor: 'rgba(0,255,255,0.4)' }}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={saveWord}
                        className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold text-black"
                        style={{ background: '#00ffff' }}>Сохранить</button>
                      {customWords[selectedWordId] && (
                        <button onClick={resetWord}
                          className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
                          style={{ borderColor: '#ff336640', color: '#ff3366' }}>Сбросить</button>
                      )}
                      <button onClick={() => setEditingWord(false)}
                        className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}>Отмена</button>
                    </div>
                  </div>
                ) : (
                  <div className="font-orbitron text-lg font-bold text-white">
                    {displayWord}
                    {customWords[selectedWordId] && <span className="ml-2 text-xs text-gray-600 font-exo">(изменено)</span>}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                {DIFFICULTIES.map(d => {
                  const cfg = DIFFICULTY_CONFIG[d];
                  const hasImg = !!images[storageKey(selectedWordId, d)];
                  return (
                    <button
                      key={d}
                      onClick={() => { setSelectedDiff(d); setEditingHint(false); setEditingR1Time(false); }}
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

              <TimeEditor
                label={`Время · ${config.label}`}
                currentTime={currentR1Time}
                defaultTime={config.time}
                editing={editingR1Time}
                setEditing={setEditingR1Time}
                draft={r1TimeDraft}
                setDraft={setR1TimeDraft}
                onSave={saveR1Time}
                onReset={resetR1Time}
                color={config.color}
              />

              <div className="mb-3 p-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="font-exo text-xs text-gray-500 mb-1">Ребус</div>
                <div className="font-exo text-white text-sm">{selectedWord.rebus[selectedDiff].puzzle}</div>
              </div>

              <div className="mb-3 p-3 rounded-xl border" style={{ borderColor: `${config.color}30`, background: `${config.color}05` }}>
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
                        style={{ background: config.color }}>Сохранить</button>
                      <button onClick={resetHint}
                        className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
                        style={{ borderColor: '#ff336640', color: '#ff3366' }}>Сбросить</button>
                      <button onClick={() => setEditingHint(false)}
                        className="flex-1 py-1.5 rounded-lg font-exo text-xs font-semibold border"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}>Отмена</button>
                    </div>
                  </div>
                ) : (
                  <div className="font-exo text-sm" style={{ color: config.color }}>
                    {currentHintValue}
                    {hints[currentHintKey] && <span className="ml-2 text-xs text-gray-600">(изменено)</span>}
                  </div>
                )}
              </div>

              <ImageUpload
                image={currentImage}
                onFile={handleFile}
                onRemove={handleRemoveImg}
                color={config.color}
                dragOverState={dragOver}
                setDragOverState={setDragOver}
                inputRefProp={fileInputRef}
              />
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
                  const isEdited = !!tolItems[item.id] || !!tolImages[item.id];
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
                      {tolImages[item.id] && <div className="text-xs mt-0.5">🖼</div>}
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

              <TimeEditor
                label="Время на ответ (все утверждения)"
                currentTime={tolTime}
                defaultTime={30}
                editing={editingTolTime}
                setEditing={setEditingTolTime}
                draft={tolTimeDraft}
                setDraft={setTolTimeDraft}
                onSave={saveTolTime}
                onReset={() => { localStorage.removeItem(tolTimeKey()); setTolTime(30); setEditingTolTime(false); }}
                color="#ffaa00"
              />

              {!tolEditing ? (
                <div>
                  <div className="p-4 rounded-xl border mb-3" style={{ borderColor: 'rgba(255,170,0,0.2)', background: 'rgba(255,170,0,0.05)' }}>
                    <div className="font-exo text-sm text-white mb-2">{mergedTol.statement}</div>
                    <div className="inline-block px-2 py-0.5 rounded-lg font-orbitron text-xs font-bold"
                      style={{ background: mergedTol.isTrue ? 'rgba(0,255,136,0.15)' : 'rgba(255,51,102,0.15)', color: mergedTol.isTrue ? '#00ff88' : '#ff3366' }}>
                      {mergedTol.isTrue ? 'ПРАВДА' : 'ЛОЖЬ'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border mb-3" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="font-exo text-xs text-gray-500 mb-1">Объяснение</div>
                    <div className="font-exo text-sm text-gray-300">{mergedTol.explanation}</div>
                  </div>

                  <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-2">Картинка</div>
                  <div className="mb-3">
                    <ImageUpload
                      image={tolImages[selectedTolId] || null}
                      onFile={handleTolFile}
                      onRemove={removeTolImg}
                      color="#ffaa00"
                      dragOverState={tolDragOver}
                      setDragOverState={setTolDragOver}
                      inputRefProp={tolFileRef}
                    />
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
                  const isEdited = !!riddleItems[item.id] || !!riddleImages[item.id];
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
                      {riddleImages[item.id] && <div className="text-xs mt-0.5">🖼</div>}
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

              <TimeEditor
                label="Время на ответ (все загадки)"
                currentTime={riddleTime}
                defaultTime={60}
                editing={editingRiddleTime}
                setEditing={setEditingRiddleTime}
                draft={riddleTimeDraft}
                setDraft={setRiddleTimeDraft}
                onSave={saveRiddleTime}
                onReset={() => { localStorage.removeItem(riddleTimeKey()); setRiddleTime(60); setEditingRiddleTime(false); }}
                color="#aa00ff"
              />

              {!riddleEditing ? (
                <div>
                  <div className="p-4 rounded-xl border mb-3" style={{ borderColor: 'rgba(170,0,255,0.2)', background: 'rgba(170,0,255,0.05)' }}>
                    <div className="font-exo text-sm text-white mb-3">{mergedRiddle.question}</div>
                    <div className="font-exo text-xs text-gray-500 mb-1">Подсказка</div>
                    <div className="font-exo text-sm" style={{ color: '#aa00ff' }}>{mergedRiddle.hint}</div>
                  </div>
                  <div className="p-3 rounded-xl border mb-3" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="font-exo text-xs text-gray-500 mb-1">Ответ</div>
                    <div className="font-orbitron text-sm font-bold text-white">{mergedRiddle.answer}</div>
                  </div>

                  <div className="font-exo text-xs text-gray-500 uppercase tracking-widest mb-2">Картинка</div>
                  <div className="mb-3">
                    <ImageUpload
                      image={riddleImages[selectedRiddleId] || null}
                      onFile={handleRiddleFile}
                      onRemove={removeRiddleImg}
                      color="#aa00ff"
                      dragOverState={riddleDragOver}
                      setDragOverState={setRiddleDragOver}
                      inputRefProp={riddleFileRef}
                    />
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
                  <div className="mb-3">
                    <div className="font-exo text-xs text-gray-500 mb-1">Ответ</div>
                    <input
                      value={riddleDraft.answer || ''}
                      onChange={e => setRiddleDraft(p => ({ ...p, answer: e.target.value.toUpperCase() }))}
                      className="w-full bg-transparent border rounded-xl p-3 font-orbitron text-sm text-white outline-none uppercase"
                      style={{ borderColor: 'rgba(170,0,255,0.4)' }}
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
