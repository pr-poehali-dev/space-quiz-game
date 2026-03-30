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

export const wordsData: WordData[] = [
  {
    id: 1, word: 'РАКЕТА', category: 'Техника',
    rebus: {
      easy: { puzzle: '🦀 + КЕ + ТА', hint: 'Морское животное + слоги', answer: 'РАКЕТА' },
      medium: { puzzle: 'РА + 🔑 + ТА', hint: 'Слог + предмет + слог', answer: 'РАКЕТА' },
      hard: { puzzle: '♈ + КЕ + Т + А', hint: 'Знак зодиака + буквы', answer: 'РАКЕТА' },
    }
  },
  {
    id: 2, word: 'КОСМОС', category: 'Пространство',
    rebus: {
      easy: { puzzle: '🐱 + ОС + МОС', hint: 'Животное + окончание', answer: 'КОСМОС' },
      medium: { puzzle: 'КОС + 🌙 + С', hint: 'Слог + луна + буква', answer: 'КОСМОС' },
      hard: { puzzle: 'К + О + С + 🌑 + С', hint: 'Буквы + планета', answer: 'КОСМОС' },
    }
  },
  {
    id: 3, word: 'ОРБИТА', category: 'Физика',
    rebus: {
      easy: { puzzle: '🦅 + ИТА', hint: 'Птица + слог', answer: 'ОРБИТА' },
      medium: { puzzle: 'ОР + 🐝 + ТА', hint: 'Слог + насекомое + слог', answer: 'ОРБИТА' },
      hard: { puzzle: 'О + Р + Б + ИТ + А', hint: 'Буквы и слоги', answer: 'ОРБИТА' },
    }
  },
  {
    id: 4, word: 'ГАГАРИН', category: 'Личности',
    rebus: {
      easy: { puzzle: '🐍 + ГАРИН', hint: 'Змея + часть слова', answer: 'ГАГАРИН' },
      medium: { puzzle: 'ГА + 🎸 + ИН', hint: 'Слог + инструмент + слог', answer: 'ГАГАРИН' },
      hard: { puzzle: 'ГАГ + А + Р + ИН', hint: 'Слово + буквы + слог', answer: 'ГАГАРИН' },
    }
  },
  {
    id: 5, word: 'ЛУНА', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '🌙 + НА', hint: 'Символ + слог', answer: 'ЛУНА' },
      medium: { puzzle: 'ЛУ + 🐟', hint: 'Слог + рыба (окунь→НА)', answer: 'ЛУНА' },
      hard: { puzzle: 'Л + У + Н + А', hint: '4 буквы — спутник Земли', answer: 'ЛУНА' },
    }
  },
  {
    id: 6, word: 'ЗВЕЗДА', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '⭐ + ДА', hint: 'Символ + слог', answer: 'ЗВЕЗДА' },
      medium: { puzzle: 'ЗВЕ + ✨ + А', hint: 'Слог + блёстки + буква', answer: 'ЗВЕЗДА' },
      hard: { puzzle: 'З + В + ЕЗД + А', hint: 'Буквы + слог + буква', answer: 'ЗВЕЗДА' },
    }
  },
  {
    id: 7, word: 'ПЛАНЕТА', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '🌍 + ТА', hint: 'Земной шар + слог', answer: 'ПЛАНЕТА' },
      medium: { puzzle: 'ПЛА + 🕸 + ТА', hint: 'Слог + нет + слог', answer: 'ПЛАНЕТА' },
      hard: { puzzle: 'П + ЛА + НЕ + ТА', hint: 'Буква + слоги', answer: 'ПЛАНЕТА' },
    }
  },
  {
    id: 8, word: 'ТЕЛЕСКОП', category: 'Техника',
    rebus: {
      easy: { puzzle: '📺 + СКОП', hint: 'Экран + окончание', answer: 'ТЕЛЕСКОП' },
      medium: { puzzle: 'ТЕ + 🦁 + КОП', hint: 'Слог + лев + слог', answer: 'ТЕЛЕСКОП' },
      hard: { puzzle: 'ТЕЛ + ЕС + КОП', hint: '3 слога без подсказок', answer: 'ТЕЛЕСКОП' },
    }
  },
  {
    id: 9, word: 'АСТРОНАВТ', category: 'Профессии',
    rebus: {
      easy: { puzzle: '⭐ + НАВТ', hint: 'Звезда + окончание', answer: 'АСТРОНАВТ' },
      medium: { puzzle: 'АСТ + РО + 🚢', hint: 'Слог + слог + корабль', answer: 'АСТРОНАВТ' },
      hard: { puzzle: 'А + С + ТРО + НАВТ', hint: 'Буквы + слоги', answer: 'АСТРОНАВТ' },
    }
  },
  {
    id: 10, word: 'СОЛНЦЕ', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '☀️ + ЦЕ', hint: 'Символ + слог', answer: 'СОЛНЦЕ' },
      medium: { puzzle: 'СОЛ + 🌐 + Е', hint: 'Слог + планета + буква', answer: 'СОЛНЦЕ' },
      hard: { puzzle: 'С + ОЛН + ЦЕ', hint: 'Буква + слог + слог', answer: 'СОЛНЦЕ' },
    }
  },
  {
    id: 11, word: 'МЕТЕОР', category: 'Явления',
    rebus: {
      easy: { puzzle: '☄️ + ОР', hint: 'Метеорит + слог', answer: 'МЕТЕОР' },
      medium: { puzzle: 'МЕ + ТЕ + 🦅', hint: 'Слоги + орёл', answer: 'МЕТЕОР' },
      hard: { puzzle: 'М + ЕТЕ + ОР', hint: 'Буква + слог + слог', answer: 'МЕТЕОР' },
    }
  },
  {
    id: 12, word: 'ГАЛАКТИКА', category: 'Пространство',
    rebus: {
      easy: { puzzle: '🌌 + КА', hint: 'Галактика + слог', answer: 'ГАЛАКТИКА' },
      medium: { puzzle: 'ГАЛ + АКТ + ИКА', hint: '3 слога', answer: 'ГАЛАКТИКА' },
      hard: { puzzle: 'Г + АЛА + КТ + ИКА', hint: 'Буква + слоги', answer: 'ГАЛАКТИКА' },
    }
  },
  {
    id: 13, word: 'СПУТНИК', category: 'Техника',
    rebus: {
      easy: { puzzle: '🛰 + НИК', hint: 'Спутник + окончание', answer: 'СПУТНИК' },
      medium: { puzzle: 'С + ПУТ + НИК', hint: 'Буква + дорога + суффикс', answer: 'СПУТНИК' },
      hard: { puzzle: 'СП + У + Т + НИК', hint: 'Слог + буквы + слог', answer: 'СПУТНИК' },
    }
  },
  {
    id: 14, word: 'КОМЕТА', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '☄️ + ТА', hint: 'Хвостатая звезда + слог', answer: 'КОМЕТА' },
      medium: { puzzle: 'КО + 🐱 + ТА', hint: 'Слог + кот + слог', answer: 'КОМЕТА' },
      hard: { puzzle: 'К + О + МЕ + ТА', hint: 'Буквы + слоги', answer: 'КОМЕТА' },
    }
  },
  {
    id: 15, word: 'НЕВЕСОМОСТЬ', category: 'Физика',
    rebus: {
      easy: { puzzle: '🚀 + ВЕСОМОСТЬ', hint: 'Ракета — приставка НЕ', answer: 'НЕВЕСОМОСТЬ' },
      medium: { puzzle: 'НЕ + ВЕС + 🌍 + ТЬ', hint: 'Слоги + земля + окончание', answer: 'НЕВЕСОМОСТЬ' },
      hard: { puzzle: 'НЕ + ВЕСО + МО + СТЬ', hint: '4 слога', answer: 'НЕВЕСОМОСТЬ' },
    }
  },
  {
    id: 16, word: 'МАРС', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '🔴 + РС', hint: 'Красная планета + буквы', answer: 'МАРС' },
      medium: { puzzle: 'М + АРС', hint: 'Буква + слог', answer: 'МАРС' },
      hard: { puzzle: 'М + А + Р + С', hint: '4 буквы — красная планета', answer: 'МАРС' },
    }
  },
  {
    id: 17, word: 'ЮПИТЕР', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '🪐 + ТЕР', hint: 'Газовый гигант + слог', answer: 'ЮПИТЕР' },
      medium: { puzzle: 'ЮП + ИТ + ЕР', hint: '3 слога', answer: 'ЮПИТЕР' },
      hard: { puzzle: 'Ю + П + ИТЕ + Р', hint: 'Буквы + слог + буква', answer: 'ЮПИТЕР' },
    }
  },
  {
    id: 18, word: 'САТУРН', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '💍 + УРН', hint: 'Кольца планеты + слог', answer: 'САТУРН' },
      medium: { puzzle: 'СА + ТУ + РН', hint: '3 слога', answer: 'САТУРН' },
      hard: { puzzle: 'С + АТУ + РН', hint: 'Буква + слог + слог', answer: 'САТУРН' },
    }
  },
  {
    id: 19, word: 'ВЕНЕРА', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '♀ + НЕ + РА', hint: 'Символ Венеры + слоги', answer: 'ВЕНЕРА' },
      medium: { puzzle: 'ВЕ + 🌐 + РА', hint: 'Слог + планета + слог', answer: 'ВЕНЕРА' },
      hard: { puzzle: 'В + ЕНЕ + РА', hint: 'Буква + слог + слог', answer: 'ВЕНЕРА' },
    }
  },
  {
    id: 20, word: 'ЭКИПАЖ', category: 'Профессии',
    rebus: {
      easy: { puzzle: '👨‍🚀 + ПАЖ', hint: 'Космонавт + паж', answer: 'ЭКИПАЖ' },
      medium: { puzzle: 'ЭКИ + 🐦 + Ж', hint: 'Слог + птица + буква', answer: 'ЭКИПАЖ' },
      hard: { puzzle: 'Э + КИ + ПА + Ж', hint: 'Буква + слоги + буква', answer: 'ЭКИПАЖ' },
    }
  },
  {
    id: 21, word: 'КРАТЕР', category: 'Явления',
    rebus: {
      easy: { puzzle: '🌋 + ТЕР', hint: 'Вулкан + слог', answer: 'КРАТЕР' },
      medium: { puzzle: 'КРА + 🐯 + Р', hint: 'Слог + тигр + буква', answer: 'КРАТЕР' },
      hard: { puzzle: 'К + РА + ТЕР', hint: 'Буква + слоги', answer: 'КРАТЕР' },
    }
  },
  {
    id: 22, word: 'СКАФАНДР', category: 'Снаряжение',
    rebus: {
      easy: { puzzle: '👨‍🚀 + ФАН + ДР', hint: 'Костюм + слоги', answer: 'СКАФАНДР' },
      medium: { puzzle: 'СКА + 🎭 + ДР', hint: 'Слог + фан + слог', answer: 'СКАФАНДР' },
      hard: { puzzle: 'СКА + ФАН + ДР', hint: '3 слога без подсказок', answer: 'СКАФАНДР' },
    }
  },
  {
    id: 23, word: 'АСТЕРОИД', category: 'Небесные тела',
    rebus: {
      easy: { puzzle: '🪨 + ОИД', hint: 'Камень в космосе + суффикс', answer: 'АСТЕРОИД' },
      medium: { puzzle: 'АСТ + ЕР + 🔵 + Д', hint: 'Слоги + круг + буква', answer: 'АСТЕРОИД' },
      hard: { puzzle: 'А + СТЕ + РО + ИД', hint: 'Буква + слоги', answer: 'АСТЕРОИД' },
    }
  },
  {
    id: 24, word: 'МОДУЛЬ', category: 'Техника',
    rebus: {
      easy: { puzzle: '🧩 + УЛЬ', hint: 'Деталь + слог', answer: 'МОДУЛЬ' },
      medium: { puzzle: 'МО + ДУ + ЛЬ', hint: '3 слога', answer: 'МОДУЛЬ' },
      hard: { puzzle: 'М + О + Д + УЛЬ', hint: 'Буквы + слог', answer: 'МОДУЛЬ' },
    }
  },
  {
    id: 25, word: 'СТЫКОВКА', category: 'Техника',
    rebus: {
      easy: { puzzle: '🔗 + ОВКА', hint: 'Соединение + окончание', answer: 'СТЫКОВКА' },
      medium: { puzzle: 'СТЫ + КОВ + КА', hint: '3 слога', answer: 'СТЫКОВКА' },
      hard: { puzzle: 'С + ТЫ + КОВ + КА', hint: 'Буква + слоги', answer: 'СТЫКОВКА' },
    }
  },
  {
    id: 26, word: 'ГОРИЗОНТ', category: 'Явления',
    rebus: {
      easy: { puzzle: '🌅 + ОНТ', hint: 'Закат + слог', answer: 'ГОРИЗОНТ' },
      medium: { puzzle: 'ГО + РИ + 🔔 + Т', hint: 'Слоги + звон + буква', answer: 'ГОРИЗОНТ' },
      hard: { puzzle: 'ГО + РИ + ЗОН + Т', hint: '3 слога + буква', answer: 'ГОРИЗОНТ' },
    }
  },
  {
    id: 27, word: 'ПРИТЯЖЕНИЕ', category: 'Физика',
    rebus: {
      easy: { puzzle: '🧲 + ЯЖЕНИЕ', hint: 'Магнит + окончание', answer: 'ПРИТЯЖЕНИЕ' },
      medium: { puzzle: 'ПРИ + ТЯЖ + ЕНИ + Е', hint: '4 слога', answer: 'ПРИТЯЖЕНИЕ' },
      hard: { puzzle: 'П + РИ + ТЯ + ЖЕ + НИЕ', hint: 'Буква + слоги', answer: 'ПРИТЯЖЕНИЕ' },
    }
  },
  {
    id: 28, word: 'ВАКУУМ', category: 'Физика',
    rebus: {
      easy: { puzzle: '⬛ + УМ', hint: 'Пустота + слог', answer: 'ВАКУУМ' },
      medium: { puzzle: 'ВА + КУ + УМ', hint: '3 слога', answer: 'ВАКУУМ' },
      hard: { puzzle: 'В + А + К + УУМ', hint: 'Буквы + слог', answer: 'ВАКУУМ' },
    }
  },
  {
    id: 29, word: 'ПРОТОН', category: 'Физика',
    rebus: {
      easy: { puzzle: '⚛️ + ОН', hint: 'Атом + слог', answer: 'ПРОТОН' },
      medium: { puzzle: 'ПРО + ТО + Н', hint: '2 слога + буква', answer: 'ПРОТОН' },
      hard: { puzzle: 'П + РО + ТОН', hint: 'Буква + слоги', answer: 'ПРОТОН' },
    }
  },
  {
    id: 30, word: 'ВСЕЛЕННАЯ', category: 'Пространство',
    rebus: {
      easy: { puzzle: '🌌 + НАЯ', hint: 'Галактики + окончание', answer: 'ВСЕЛЕННАЯ' },
      medium: { puzzle: 'ВСЕ + ЛЕН + НАЯ', hint: '3 слога', answer: 'ВСЕЛЕННАЯ' },
      hard: { puzzle: 'В + СЕ + ЛЕН + НА + Я', hint: 'Буква + слоги + буква', answer: 'ВСЕЛЕННАЯ' },
    }
  },
];
