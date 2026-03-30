export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Rebus {
  puzzle: string;
  hint: string;
  answer: string;
}

export interface WordData {
  id: number;
  word: string;
  category: string;
  rebus: {
    easy: Rebus;
    medium: Rebus;
    hard: Rebus;
  };
}

export const DIFFICULTY_CONFIG = {
  easy: { label: 'ЛЕГКО', time: 30, color: '#00ff88', glow: '0 0 20px #00ff88' },
  medium: { label: 'СРЕДНЕ', time: 60, color: '#ffaa00', glow: '0 0 20px #ffaa00' },
  hard: { label: 'СЛОЖНО', time: 90, color: '#ff3366', glow: '0 0 20px #ff3366' },
};

// Формат ребусов:
// Лёгко: символ/эмодзи + очевидная операция (сложение/замена буквы)
// Средне: несколько символов, нужно додуматься что они означают
// Сложно: зашифровано хитро, без явных подсказок

export const wordsData: WordData[] = [
  {
    id: 1, word: 'РАКЕТА', category: 'Техника',
    rebus: {
      easy:   { puzzle: '🦀 − А + КЕ + ТА', hint: 'Название морского животного без первой буквы', answer: 'РАКЕТА' },
      medium: { puzzle: '🎸 − Г + КЕ + ТА', hint: 'Музыкальный инструмент, замени первую букву', answer: 'РАКЕТА' },
      hard:   { puzzle: '♈ − ♈[1] + КЕ + ТА', hint: 'Знак зодиака (март), убери первую букву', answer: 'РАКЕТА' },
    }
  },
  {
    id: 2, word: 'КОСМОС', category: 'Пространство',
    rebus: {
      easy:   { puzzle: '🐈 − Е + С + МОС', hint: 'Домашнее животное без последней буквы', answer: 'КОСМОС' },
      medium: { puzzle: '🪣 − О + С + МОС', hint: 'Ёмкость для воды, замени гласную', answer: 'КОСМОС' },
      hard:   { puzzle: '🌿 − РАВА + С + МОС', hint: 'Трава без 4 букв = КО', answer: 'КОСМОС' },
    }
  },
  {
    id: 3, word: 'ОРБИТА', category: 'Физика',
    rebus: {
      easy:   { puzzle: '🦅 − ЁЛ + Б + ИТА', hint: 'Птица без середины', answer: 'ОРБИТА' },
      medium: { puzzle: '🎺 − ЬБА + БИ + ТА', hint: 'Духовой инструмент → ОР', answer: 'ОРБИТА' },
      hard:   { puzzle: '🌊 − ОЛН + Б + ИТА', hint: 'Волны без 3 букв = ОР', answer: 'ОРБИТА' },
    }
  },
  {
    id: 4, word: 'ГАГАРИН', category: 'Личности',
    rebus: {
      easy:   { puzzle: '🐦 − ВОРОН + ГА + РИН', hint: 'Птица → замени на ГА', answer: 'ГАГАРИН' },
      medium: { puzzle: '🎸 − ИТА + А + РИН', hint: 'Инструмент без ИТА = ГАГ', answer: 'ГАГАРИН' },
      hard:   { puzzle: '🌿 − ЕРАНЬ + А + РИН', hint: 'Цветок без 5 букв = ГАГ', answer: 'ГАГАРИН' },
    }
  },
  {
    id: 5, word: 'ЛУНА', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🧅 − ОК + НА', hint: 'Овощ без последних букв', answer: 'ЛУНА' },
      medium: { puzzle: '🔦 − ЬКА + НА', hint: 'Источник света без суффикса', answer: 'ЛУНА' },
      hard:   { puzzle: '🫁 − ЁГКИЕ + НА', hint: 'Орган дыхания → первые 2 буквы = ЛУ', answer: 'ЛУНА' },
    }
  },
  {
    id: 6, word: 'ЗВЕЗДА', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🔔 − ОН + ЕЗД + А', hint: 'Предмет, который звенит', answer: 'ЗВЕЗДА' },
      medium: { puzzle: '🦒 − ИРАФ + ЕЗД + А', hint: 'Животное с длинной шеей → ЗВ', answer: 'ЗВЕЗДА' },
      hard:   { puzzle: '🌿 − АБОР + ЕЗД + А', hint: 'Место для посевов → ЗВ', answer: 'ЗВЕЗДА' },
    }
  },
  {
    id: 7, word: 'ПЛАНЕТА', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🏊 − ЫВА + НЕ + ТА', hint: 'Вид спорта в воде → ПЛА', answer: 'ПЛАНЕТА' },
      medium: { puzzle: '🪸 − ОСЫ + НЕ + ТА', hint: 'Морской организм → ПЛА', answer: 'ПЛАНЕТА' },
      hard:   { puzzle: '📐 − УГОЛЬНИК + НЕ + ТА', hint: 'Инструмент геометра → ПЛА', answer: 'ПЛАНЕТА' },
    }
  },
  {
    id: 8, word: 'ТЕЛЕСКОП', category: 'Техника',
    rebus: {
      easy:   { puzzle: '📺 − ВИЗОР + СКО + П', hint: 'Устройство для просмотра → ТЕЛ', answer: 'ТЕЛЕСКОП' },
      medium: { puzzle: '🐘 − ЕФАН + ЕС + КОП', hint: 'Животное → ТЕЛ', answer: 'ТЕЛЕСКОП' },
      hard:   { puzzle: '🧸 − ЕДИ + ЕС + КОП', hint: 'Мягкая игрушка → ТЕЛ', answer: 'ТЕЛЕСКОП' },
    }
  },
  {
    id: 9, word: 'АСТРОНАВТ', category: 'Профессии',
    rebus: {
      easy:   { puzzle: '⭐ − ЕРОЧКА + РО + НАВТ', hint: 'Форма звёздочки → АСТ', answer: 'АСТРОНАВТ' },
      medium: { puzzle: '🦪 − РИЦА + РО + НАВТ', hint: 'Морской моллюск → АСТ', answer: 'АСТРОНАВТ' },
      hard:   { puzzle: '🔭 − РОЛОГИЯ + РО + НАВТ', hint: 'Наука о звёздах → АСТ', answer: 'АСТРОНАВТ' },
    }
  },
  {
    id: 10, word: 'СОЛНЦЕ', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🧂 − ЬЮ + Л + НЦЕ', hint: 'Приправа на столе → СО', answer: 'СОЛНЦЕ' },
      medium: { puzzle: '🎻 − КИПКА + Л + НЦЕ', hint: 'Струнный инструмент → СО', answer: 'СОЛНЦЕ' },
      hard:   { puzzle: '🕊️ − ВА + Л + НЦЕ', hint: 'Птица мира → СО', answer: 'СОЛНЦЕ' },
    }
  },
  {
    id: 11, word: 'МЕТЕОР', category: 'Явления',
    rebus: {
      easy:   { puzzle: '🧹 − ЛА + ТЕО + Р', hint: 'Инструмент для уборки → МЕ', answer: 'МЕТЕОР' },
      medium: { puzzle: '🎖️ − АЛЬ + ТЕО + Р', hint: 'Воинская награда → МЕ', answer: 'МЕТЕОР' },
      hard:   { puzzle: '🗡️ − ЕЧ + ТЕО + Р', hint: 'Холодное оружие → МЕ', answer: 'МЕТЕОР' },
    }
  },
  {
    id: 12, word: 'ГАЛАКТИКА', category: 'Пространство',
    rebus: {
      easy:   { puzzle: '🎭 − ЕРЕЯ + АКТИКА', hint: 'Место с артистами → ГАЛ', answer: 'ГАЛАКТИКА' },
      medium: { puzzle: '🦅 − ЁЛ + АКТИКА', hint: 'Хищная птица → ГАЛ', answer: 'ГАЛАКТИКА' },
      hard:   { puzzle: '🪬 − ЮКА + АКТИКА', hint: 'Оберег от сглаза → ГАЛ', answer: 'ГАЛАКТИКА' },
    }
  },
  {
    id: 13, word: 'СПУТНИК', category: 'Техника',
    rebus: {
      easy:   { puzzle: '🕷️ − ОК + ТНИ + К', hint: 'Паук без слога → СП', answer: 'СПУТНИК' },
      medium: { puzzle: '🧲 − АГНИТ + ТНИ + К', hint: 'Притягивает металл → СП', answer: 'СПУТНИК' },
      hard:   { puzzle: '💤 − ОН + ТНИ + К', hint: 'Когда спишь → СП', answer: 'СПУТНИК' },
    }
  },
  {
    id: 14, word: 'КОМЕТА', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🐈 − АТ + МЕ + ТА', hint: 'Домашнее животное → КО', answer: 'КОМЕТА' },
      medium: { puzzle: '🏆 − УБОК + МЕ + ТА', hint: 'Награда победителям → КО', answer: 'КОМЕТА' },
      hard:   { puzzle: '🎶 − НЦЕРТ + МЕ + ТА', hint: 'Музыкальное выступление → КО', answer: 'КОМЕТА' },
    }
  },
  {
    id: 15, word: 'НЕВЕСОМОСТЬ', category: 'Физика',
    rebus: {
      easy:   { puzzle: '🌿 − БО + ВЕС + О + МОСТЬ', hint: 'Лесная растительность → НЕ', answer: 'НЕВЕСОМОСТЬ' },
      medium: { puzzle: '🎯 − УДАЧА + ВЕС + О + МОСТЬ', hint: 'Промах (антоним удачи) → НЕ', answer: 'НЕВЕСОМОСТЬ' },
      hard:   { puzzle: '🚫 + ВЕС + О + МОСТЬ', hint: 'Знак запрета = НЕ', answer: 'НЕВЕСОМОСТЬ' },
    }
  },
  {
    id: 16, word: 'МАРС', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🫙 − АРИНАД + РС', hint: 'Банка с соленьями → МА', answer: 'МАРС' },
      medium: { puzzle: '💄 − КА + РС', hint: 'Украшение для губ → МА', answer: 'МАРС' },
      hard:   { puzzle: '🎭 − КА + РС', hint: 'Личина, надевают на лицо → МА', answer: 'МАРС' },
    }
  },
  {
    id: 17, word: 'ЮПИТЕР', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🧥 − БКА + ПИ + ТЕР', hint: 'Верхняя одежда → ЮБ→ЮП', answer: 'ЮПИТЕР' },
      medium: { puzzle: '🌀 − ЛА + ПИ + ТЕР', hint: 'Закрученный вихрь → Ю', answer: 'ЮПИТЕР' },
      hard:   { puzzle: '🪘 − НКЕР + ПИ + ТЕР', hint: 'Ударный инструмент → ЮБ→ЮП', answer: 'ЮПИТЕР' },
    }
  },
  {
    id: 18, word: 'САТУРН', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🥗 − АЛА + ТУ + РН', hint: 'Овощное блюдо → СА', answer: 'САТУРН' },
      medium: { puzzle: '👢 − ПОЖОК + ТУ + РН', hint: 'Обувь → СА', answer: 'САТУРН' },
      hard:   { puzzle: '🎷 − КС + ТУ + РН', hint: 'Джазовый инструмент → СА', answer: 'САТУРН' },
    }
  },
  {
    id: 19, word: 'ВЕНЕРА', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🌿 − ТКА + НЕ + РА', hint: 'Вьющееся растение → ВЕ', answer: 'ВЕНЕРА' },
      medium: { puzzle: '🎭 − ЛОСТЬ + НЕ + РА', hint: 'Весёлость → ВЕ', answer: 'ВЕНЕРА' },
      hard:   { puzzle: '🌬️ − ЕР + НЕ + РА', hint: 'Движение воздуха → ВЕ', answer: 'ВЕНЕРА' },
    }
  },
  {
    id: 20, word: 'ЭКИПАЖ', category: 'Профессии',
    rebus: {
      easy:   { puzzle: '📱 − РАН + КИ + ПАЖ', hint: 'Гаджет → ЭК', answer: 'ЭКИПАЖ' },
      medium: { puzzle: '🔋 − УМУЛЯТОР + КИ + ПАЖ', hint: 'Источник питания → ЭК', answer: 'ЭКИПАЖ' },
      hard:   { puzzle: '🔭 − ВАТОР + КИ + ПАЖ', hint: 'Прибор астронома → ЭК', answer: 'ЭКИПАЖ' },
    }
  },
  {
    id: 21, word: 'КРАТЕР', category: 'Явления',
    rebus: {
      easy:   { puzzle: '🎨 − СОЧКА + ТЕ + Р', hint: 'Инструмент художника → КРА', answer: 'КРАТЕР' },
      medium: { puzzle: '🦀 − Б + ТЕ + Р', hint: 'Морское существо → КРА', answer: 'КРАТЕР' },
      hard:   { puzzle: '🔴 − СНЫЙ + ТЕ + Р', hint: 'Цвет → КРА', answer: 'КРАТЕР' },
    }
  },
  {
    id: 22, word: 'СКАФАНДР', category: 'Снаряжение',
    rebus: {
      easy:   { puzzle: '🛷 − НИ + А + ФАН + ДР', hint: 'Зимний транспорт → СКА', answer: 'СКАФАНДР' },
      medium: { puzzle: '🧗 − ЛОЛАЗ + А + ФАН + ДР', hint: 'Тот, кто лезет в гору → СКА', answer: 'СКАФАНДР' },
      hard:   { puzzle: '🎻 − РИПКА + А + ФАН + ДР', hint: 'Струнный инструмент → СКА', answer: 'СКАФАНДР' },
    }
  },
  {
    id: 23, word: 'АСТЕРОИД', category: 'Небесные тела',
    rebus: {
      easy:   { puzzle: '🃏 − АРТЫ + ЕРО + ИД', hint: 'Игральные карты → АСТ', answer: 'АСТЕРОИД' },
      medium: { puzzle: '🎭 − РИСОВКА + ЕРО + ИД', hint: 'Маскировка → АСТ', answer: 'АСТЕРОИД' },
      hard:   { puzzle: '🔭 − РОФИЗИКА + ЕРО + ИД', hint: 'Наука о звёздах → АСТ', answer: 'АСТЕРОИД' },
    }
  },
  {
    id: 24, word: 'МОДУЛЬ', category: 'Техника',
    rebus: {
      easy:   { puzzle: '🌊 − РЕ + ДУ + ЛЬ', hint: 'Волны → МО', answer: 'МОДУЛЬ' },
      medium: { puzzle: '🎬 − ЖЕТ + ДУ + ЛЬ', hint: 'Кино → МО', answer: 'МОДУЛЬ' },
      hard:   { puzzle: '🦋 − ТЫЛЁК + ДУ + ЛЬ', hint: 'Насекомое → МО', answer: 'МОДУЛЬ' },
    }
  },
  {
    id: 25, word: 'СТЫКОВКА', category: 'Техника',
    rebus: {
      easy:   { puzzle: '🥢 − АКАН + ЫКО + ВКА', hint: 'Для суши → СТ', answer: 'СТЫКОВКА' },
      medium: { puzzle: '📏 − ЛИНЕЙКА + ЫКО + ВКА', hint: 'Инструмент для измерений → СТ', answer: 'СТЫКОВКА' },
      hard:   { puzzle: '🏟️ − АДИОН + ЫКО + ВКА', hint: 'Спортивная арена → СТ', answer: 'СТЫКОВКА' },
    }
  },
  {
    id: 26, word: 'ГОРИЗОНТ', category: 'Явления',
    rebus: {
      easy:   { puzzle: '🏔️ − А + РИ + ЗОН + Т', hint: 'Вершина без буквы → ГО', answer: 'ГОРИЗОНТ' },
      medium: { puzzle: '🐠 − РБУЗ + РИ + ЗОН + Т', hint: 'Полосатая рыба → ГО', answer: 'ГОРИЗОНТ' },
      hard:   { puzzle: '🎯 − РОД + РИ + ЗОН + Т', hint: 'Мишень → ГО', answer: 'ГОРИЗОНТ' },
    }
  },
  {
    id: 27, word: 'ПРИТЯЖЕНИЕ', category: 'Физика',
    rebus: {
      easy:   { puzzle: '🙏 − АЗД + ТЯЖ + ЕНИЕ', hint: 'Жест руками → ПРИ', answer: 'ПРИТЯЖЕНИЕ' },
      medium: { puzzle: '🎁 − З + ТЯЖ + ЕНИЕ', hint: 'Подарок → ПРИ', answer: 'ПРИТЯЖЕНИЕ' },
      hard:   { puzzle: '🏁 − ФИНИШ + ТЯЖ + ЕНИЕ', hint: 'Финальный флаг → ПРИ', answer: 'ПРИТЯЖЕНИЕ' },
    }
  },
  {
    id: 28, word: 'ВАКУУМ', category: 'Физика',
    rebus: {
      easy:   { puzzle: '🚌 − ТОБУС + КУ + УМ', hint: 'Городской транспорт → ВА', answer: 'ВАКУУМ' },
      medium: { puzzle: '🌊 − ЛЬС + КУ + УМ', hint: 'Волны → ВА', answer: 'ВАКУУМ' },
      hard:   { puzzle: '🎻 − ЗА + КУ + УМ', hint: 'Инструмент → ВА', answer: 'ВАКУУМ' },
    }
  },
  {
    id: 29, word: 'ПРОТОН', category: 'Физика',
    rebus: {
      easy:   { puzzle: '🔮 − РОГНОЗ + ТО + Н', hint: 'Предсказание → ПРО', answer: 'ПРОТОН' },
      medium: { puzzle: '🧩 − БЛЕ + ТО + Н', hint: 'Головоломка → ПРО', answer: 'ПРОТОН' },
      hard:   { puzzle: '🌊 − ЛИСКА + ТО + Н', hint: 'Тропинка у воды → ПРО', answer: 'ПРОТОН' },
    }
  },
  {
    id: 30, word: 'ВСЕЛЕННАЯ', category: 'Пространство',
    rebus: {
      easy:   { puzzle: '🌾 − ГО + ЛЕН + НАЯ', hint: 'Поле пшеницы → ВСЕ', answer: 'ВСЕЛЕННАЯ' },
      medium: { puzzle: '🌐 − МИР + ЛЕН + НАЯ', hint: 'Весь мир → ВСЕ', answer: 'ВСЕЛЕННАЯ' },
      hard:   { puzzle: '🕯️ − ЧА + ЛЕН + НАЯ', hint: 'Источник огня → ВСЕ', answer: 'ВСЕЛЕННАЯ' },
    }
  },
];
