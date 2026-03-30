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
import TruthOrLieGrid from '@/components/game/TruthOrLieGrid';
import TruthOrLiePlay from '@/components/game/TruthOrLiePlay';
import RiddleGrid from '@/components/game/RiddleGrid';
import RiddlePlay from '@/components/game/RiddlePlay';
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
  | 'editor'
  | 'tol_grid'
  | 'tol_play'
  | 'riddle_grid'
  | 'riddle_play';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [key, setKey] = useState(0);

  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [solvedWords, setSolvedWords] = useState<Record<string, string[]>>({});
  const [score, setScore] = useState(0);
  const [lastResult, setLastResult] = useState<{ correct: boolean; timeLeft: number } | null>(null);

  const [selectedTolId, setSelectedTolId] = useState<number | null>(null);
  const [solvedTol, setSolvedTol] = useState<Record<number, boolean>>({});

  const [selectedRiddleId, setSelectedRiddleId] = useState<number | null>(null);
  const [solvedRiddles, setSolvedRiddles] = useState<Record<number, boolean>>({});

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

  const handleTolSelect = (id: number) => {
    setSelectedTolId(id);
    navigate('tol_play');
  };

  const handleTolResult = (correct: boolean) => {
    if (selectedTolId !== null) {
      setSolvedTol(prev => ({ ...prev, [selectedTolId]: correct }));
      if (correct) setScore(s => s + 50);
    }
    navigate('tol_grid');
  };

  const handleRiddleSelect = (id: number) => {
    setSelectedRiddleId(id);
    navigate('riddle_play');
  };

  const handleRiddleResult = (correct: boolean) => {
    if (selectedRiddleId !== null) {
      setSolvedRiddles(prev => ({ ...prev, [selectedRiddleId]: correct }));
      if (correct) setScore(s => s + 75);
    }
    navigate('riddle_grid');
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
            onStartRound1={() => navigate('wordgrid')}
            onStartRound2={() => navigate('tol_grid')}
            onStartRound3={() => navigate('riddle_grid')}
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

        {screen === 'tol_grid' && (
          <TruthOrLieGrid
            solvedItems={solvedTol}
            onSelect={handleTolSelect}
            onBack={() => navigate('home')}
            score={score}
          />
        )}

        {screen === 'tol_play' && selectedTolId !== null && (
          <TruthOrLiePlay
            itemId={selectedTolId}
            onResult={handleTolResult}
            onBack={() => navigate('tol_grid')}
          />
        )}

        {screen === 'riddle_grid' && (
          <RiddleGrid
            solvedItems={solvedRiddles}
            onSelect={handleRiddleSelect}
            onBack={() => navigate('home')}
            score={score}
          />
        )}

        {screen === 'riddle_play' && selectedRiddleId !== null && (
          <RiddlePlay
            itemId={selectedRiddleId}
            onResult={handleRiddleResult}
            onBack={() => navigate('riddle_grid')}
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
