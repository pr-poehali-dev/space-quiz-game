import { useState } from 'react';
import StarField from '@/components/StarField';
import HomePage from '@/components/game/HomePage';
import WordGrid from '@/components/game/WordGrid';
import DifficultySelect from '@/components/game/DifficultySelect';
import GamePlay from '@/components/game/GamePlay';
import ResultScreen from '@/components/game/ResultScreen';
import LeaderboardPage from '@/components/game/LeaderboardPage';
import RulesPage from '@/components/game/RulesPage';
import AboutPage from '@/components/game/AboutPage';
import AdminEditor from '@/components/game/AdminEditor';
import { wordsData, Difficulty } from '@/data/rebusData';

type Screen =
  | 'home'
  | 'wordgrid'
  | 'difficulty'
  | 'gameplay'
  | 'result'
  | 'leaderboard'
  | 'rules'
  | 'about'
  | 'editor';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [solvedWords, setSolvedWords] = useState<Record<string, string[]>>({});
  const [score, setScore] = useState(0);
  const [lastResult, setLastResult] = useState<{ correct: boolean; timeLeft: number } | null>(null);
  const [key, setKey] = useState(0);

  const navigate = (to: Screen) => {
    setKey(k => k + 1);
    setScreen(to);
  };

  const handleWordSelect = (wordId: number) => {
    setSelectedWordId(wordId);
    navigate('difficulty');
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    navigate('gameplay');
  };

  const handleSolve = (correct: boolean, timeLeft: number) => {
    if (correct && selectedWordId && selectedDifficulty) {
      const multMap = { easy: 1, medium: 2, hard: 3 };
      const timeMap = { easy: 30, medium: 60, hard: 90 };
      const earned = Math.round((timeLeft / timeMap[selectedDifficulty]) * 100 * multMap[selectedDifficulty]);
      setScore(s => s + earned);
      setSolvedWords(prev => {
        const current = prev[selectedWordId] || [];
        if (!current.includes(selectedDifficulty)) {
          return { ...prev, [selectedWordId]: [...current, selectedDifficulty] };
        }
        return prev;
      });
    }
    setLastResult({ correct, timeLeft });
    navigate('result');
  };

  const handleRetry = () => {
    navigate('gameplay');
  };

  const selectedWord = wordsData.find(w => w.id === selectedWordId);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#020414' }}>
      <StarField />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,100,255,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(100,0,255,0.05) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      <div key={key} className="relative" style={{ zIndex: 2 }}>
        {screen === 'home' && (
          <HomePage
            onStart={() => navigate('wordgrid')}
            onRules={() => navigate('rules')}
            onLeaderboard={() => navigate('leaderboard')}
            onAbout={() => navigate('about')}
            onEditor={() => navigate('editor')}
          />
        )}

        {screen === 'wordgrid' && (
          <WordGrid
            solvedWords={solvedWords}
            onWordSelect={handleWordSelect}
            onBack={() => navigate('home')}
          />
        )}

        {screen === 'difficulty' && selectedWordId !== null && (
          <DifficultySelect
            wordId={selectedWordId}
            solvedDifficulties={solvedWords[selectedWordId] || []}
            onSelect={handleDifficultySelect}
            onBack={() => navigate('wordgrid')}
          />
        )}

        {screen === 'gameplay' && selectedWordId !== null && selectedDifficulty !== null && (
          <GamePlay
            wordId={selectedWordId}
            difficulty={selectedDifficulty}
            onSolve={handleSolve}
            onBack={() => navigate('difficulty')}
          />
        )}

        {screen === 'result' && selectedWordId !== null && selectedDifficulty !== null && lastResult && (
          <ResultScreen
            wordName={selectedWord?.word || ''}
            difficulty={selectedDifficulty}
            correct={lastResult.correct}
            timeLeft={lastResult.timeLeft}
            score={score}
            onContinue={() => navigate('wordgrid')}
            onRetry={handleRetry}
          />
        )}

        {screen === 'leaderboard' && (
          <LeaderboardPage
            currentScore={score}
            onBack={() => navigate('home')}
          />
        )}

        {screen === 'rules' && (
          <RulesPage onBack={() => navigate('home')} />
        )}

        {screen === 'about' && (
          <AboutPage onBack={() => navigate('home')} />
        )}

        {screen === 'editor' && (
          <AdminEditor onBack={() => navigate('home')} />
        )}
      </div>
    </div>
  );
};

export default Index;