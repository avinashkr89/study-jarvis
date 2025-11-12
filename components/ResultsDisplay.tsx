
import React, { useState, useMemo } from 'react';
import { StudyPack, MCQ } from '../types.ts';

interface ResultsDisplayProps {
  results: StudyPack;
}

// A single interactive question component
const InteractiveQuestion: React.FC<{
  q: MCQ;
  qIndex: number;
  selectedAnswer: string | null;
  isChecked: boolean;
  onSelect: (option: string) => void;
  onCheck: () => void;
}> = ({ q, qIndex, selectedAnswer, isChecked, onSelect, onCheck }) => {

  const getOptionStyle = (option: string) => {
    const baseStyle = 'dark:bg-slate-800/50 bg-slate-100 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500';
    const selectedStyle = 'bg-blue-500/20 border-blue-500';
    
    if (!isChecked) {
      return selectedAnswer === option ? selectedStyle : baseStyle;
    }
    
    // If checked
    if (option === q.answer) {
      return 'bg-green-500/20 border-green-500';
    }
    if (selectedAnswer === option && selectedAnswer !== q.answer) {
      return 'bg-red-500/20 border-red-500';
    }
    return `${baseStyle} opacity-60`;
  };
  
  const isCorrect = selectedAnswer === q.answer;

  return (
    <div className="bg-white dark:bg-slate-900/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6">
      <div className="flex justify-between items-start mb-4">
        <p className="font-semibold text-slate-800 dark:text-white leading-relaxed text-[16px]">
            <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">{qIndex + 1}.</span>
            {q.question}
        </p>
        <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${q.difficulty === 'Hard' ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' : q.difficulty === 'Med' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300' : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'}`}>
            {q.difficulty}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option)}
            disabled={isChecked}
            className={`p-3 text-left rounded-lg border-2 text-slate-700 dark:text-gray-300 text-sm transition-all duration-200 ${getOptionStyle(option)} disabled:cursor-not-allowed`}
          >
           {String.fromCharCode(65 + idx)}. {option}
          </button>
        ))}
      </div>
      
       {!isChecked ? (
         <button onClick={onCheck} disabled={!selectedAnswer} className="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-gray-500 text-white font-bold py-2 px-5 rounded-lg transition-colors">
            Check Answer
         </button>
       ) : (
         <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-900/70 fade-in border border-slate-200 dark:border-slate-800">
            <p className="font-bold mb-2 flex items-center">
                {isCorrect ? <span className="text-green-600 dark:text-green-400 mr-2">✅ Correct!</span> : <span className="text-red-600 dark:text-red-400 mr-2">❌ Incorrect.</span>}
                <span className="text-slate-600 dark:text-gray-300 text-sm">(Correct Answer: {q.answer})</span>
            </p>
            <p className="text-slate-500 dark:text-gray-400 text-[15px] leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-gray-300">💡 Mentor's Explanation: </span>{q.explanation_hinglish}
            </p>
         </div>
       )}
    </div>
  );
};


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set());
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const score = useMemo(() => {
    let currentScore = 0;
    checkedQuestions.forEach(qIndex => {
        if(results.mcqQuiz[qIndex].answer === selectedAnswers[qIndex]){
            currentScore++;
        }
    });
    return currentScore;
  }, [checkedQuestions, selectedAnswers, results.mcqQuiz]);

  const handleSelectAnswer = (qIndex: number, option: string) => {
      setSelectedAnswers(prev => ({...prev, [qIndex]: option}));
  }

  const handleCheckAnswer = (qIndex: number) => {
      setCheckedQuestions(prev => new Set(prev).add(qIndex));
  }
  
  const handleFlipCard = (cardIndex: number) => {
      setFlippedCards(prev => {
          const newSet = new Set(prev);
          if(newSet.has(cardIndex)) {
              newSet.delete(cardIndex);
          } else {
              newSet.add(cardIndex);
          }
          return newSet;
      });
  }

  const renderContent = () => {
    const textBase = "text-slate-600 dark:text-slate-300 text-[16px] leading-relaxed";
    const headingBase = "text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4";

    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-8">
            <div>
              <h3 className={headingBase}>💡 Concept Primer: {results.conceptPrimer.title}</h3>
              <ul className={`space-y-3 pl-5 ${textBase}`}>
                {results.conceptPrimer.bullets.map((bullet, i) => <li key={i} className="relative before:content-['-'] before:absolute before:left-[-1.2em] before:text-blue-500">{bullet}</li>)}
              </ul>
            </div>
            <div className="p-5 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2">🧠 Mentor's Analogy:</h4>
              <p className={`italic text-slate-500 dark:text-gray-400 ${textBase}`}>"{results.conceptPrimer.analogy}"</p>
            </div>
            <details className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <summary className="cursor-pointer font-semibold text-lg text-blue-600 dark:text-blue-400 hover:text-slate-900 dark:hover:text-white transition-colors">Deeper Explanation 🔍</summary>
              <p className={`whitespace-pre-wrap mt-4 ${textBase}`}>{results.deepSummary}</p>
            </details>
          </div>
        );
      case 'formulas':
        return (
          <div className="space-y-5">
            {results.coreFormulas.map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-bold text-blue-700 dark:text-blue-400">⚙️ {f.name}</h4>
                <p className="font-mono text-lg text-slate-800 dark:text-white my-3 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">{f.formula}</p>
                <div className="text-[15px] leading-relaxed space-y-2">
                    <p><strong className="font-medium text-slate-700 dark:text-gray-300">Variables:</strong> <span className="text-slate-500 dark:text-gray-400">{f.variables}</span></p>
                    <p><strong className="font-medium text-slate-700 dark:text-gray-300">When to use:</strong> <span className="text-slate-500 dark:text-gray-400">{f.whenToUse}</span></p>
                    <p><strong className="font-medium text-slate-700 dark:text-gray-300">Units:</strong> <span className="text-slate-500 dark:text-gray-400">{f.units}</span></p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'examples':
        return (
           <div className="space-y-6">
            {results.workedExamples.map((ex, i) => (
              <div key={i} className="bg-white dark:bg-slate-900/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400">🔥 Solved Example {i + 1}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ex.difficulty === 'Hard' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300' : ex.difficulty === 'Standard' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' : 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'}`}>{ex.difficulty}</span>
                </div>
                <p className={`mb-4 ${textBase}`}>{ex.problem}</p>
                <div className={`space-y-3 mb-4 ${textBase}`}>
                  {ex.steps.map(step => <p key={step.step}><strong className="text-slate-800 dark:text-white font-medium">Step {step.step}:</strong> <span className="text-slate-500 dark:text-gray-400">{step.explanation}</span></p>)}
                </div>
                <p className="font-bold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">Answer: {ex.answer}</p>
                 <p className="text-sm mt-4 text-slate-500 dark:text-gray-400"><strong className="text-slate-700 dark:text-gray-300">Quick Check:</strong> {ex.quickCheck}</p>
              </div>
            ))}
          </div>
        );
      case 'mistakes':
         return (
          <ul className="space-y-4">
            {results.commonMistakes.map((m, i) => (
              <li key={i} className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className={`${textBase}`}><strong className="text-red-600 dark:text-red-400 font-medium">❗ Mistake:</strong> <span className="text-slate-700 dark:text-gray-300">{m.mistake}</span></p>
                <p className={`mt-2 ${textBase}`}><strong className="text-green-600 dark:text-green-400 font-medium">✅ Fix:</strong> <span className="text-slate-700 dark:text-gray-300">{m.fix}</span></p>
              </li>
            ))}
          </ul>
        );
      case 'quiz':
         return (
            <div>
                 <div className="mb-6 bg-slate-100 dark:bg-slate-900/70 p-4 rounded-lg flex justify-between items-center border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">🧠 Exam-Adaptive Quiz</h3>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">Score: {score} / {results.mcqQuiz.length}</div>
                 </div>
                {results.mcqQuiz.map((q, i) => (
                    <InteractiveQuestion 
                        key={i}
                        q={q} 
                        qIndex={i}
                        selectedAnswer={selectedAnswers[i] || null}
                        isChecked={checkedQuestions.has(i)}
                        onSelect={(option) => handleSelectAnswer(i, option)}
                        onCheck={() => handleCheckAnswer(i)}
                    />
                ))}
            </div>
        );
      case 'flashcards':
         return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {results.flashcards.map((card, i) => (
                     <div key={i} className={`flip-card h-56 rounded-2xl cursor-pointer ${flippedCards.has(i) ? 'flipped' : ''}`} onClick={() => handleFlipCard(i)}>
                         <div className="flip-card-inner">
                            <div className="flip-card-front w-full h-full bg-white dark:bg-slate-800 p-5 flex flex-col justify-center items-center text-center border border-slate-200 dark:border-slate-700">
                                <p className="text-blue-600 dark:text-blue-400 font-bold mb-2">📇 Front</p>
                                <p className="font-semibold text-slate-800 dark:text-white text-[16px] leading-relaxed" dangerouslySetInnerHTML={{ __html: card.front.replace(/{{c1::(.*?)}}/g, '<span class="text-purple-600 dark:text-purple-400">[...]</span>') }}></p>
                            </div>
                            <div className="flip-card-back w-full h-full bg-blue-600 dark:bg-blue-500 text-white p-5 flex flex-col justify-center items-center text-center border border-blue-400/50">
                                <p className="font-bold text-blue-200 mb-2">↩️ Back</p>
                                <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: card.back.replace(/{{c1::(.*?)}}/g, '<strong class="text-yellow-300">$1</strong>') }}></p>
                            </div>
                         </div>
                     </div>
                 ))}
             </div>
        );
       case 'revision':
         return (
            <div className="bg-white dark:bg-slate-900/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className={headingBase}>📘 Quick Revision Sheet</h3>
                <ul className={`space-y-3 pl-5 ${textBase}`}>
                    {results.quickRevisionSheet.map((item, i) => <li key={i} className="relative before:content-['⚡'] before:absolute before:left-[-1.5em]">{item}</li>)}
                </ul>
            </div>
        );
      default:
        return null;
    }
  };
  
  const tabs = [
      { id: 'summary', label: 'Summary' }, { id: 'formulas', label: 'Formulas' },
      { id: 'examples', label: 'Examples' }, { id: 'mistakes', label: 'Mistakes' },
      { id: 'quiz', label: 'Quiz' }, { id: 'flashcards', label: 'Flashcards' },
      { id: 'revision', label: 'Revision Sheet' }
  ];

  return (
    <div className="mt-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-4 sm:p-6 rounded-2xl fade-in shadow-xl dark:shadow-2xl dark:shadow-blue-900/20 border border-slate-200 dark:border-slate-800">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white text-center mb-6">Your Study Pack is Ready!</h2>
        <div className="border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
            <nav className="flex space-x-2 sm:space-x-4" aria-label="Tabs">
                 {tabs.map(tab => (
                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-3 px-3 font-semibold text-sm rounded-t-lg transition-all ${activeTab === tab.id ? 'bg-slate-100 dark:bg-slate-800/50 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/30'}`}>
                        {tab.label}
                     </button>
                 ))}
            </nav>
        </div>
        <div className="p-1 md:p-2">{renderContent()}</div>
    </div>
  );
};

export default ResultsDisplay;