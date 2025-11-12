import React from 'react';
import { SimpleGenerationResult, SimpleQuizQuestion, SimpleFlashcard } from '../types';

interface SimpleResultsDisplayProps {
  results: SimpleGenerationResult[];
}

const SimpleResultsDisplay: React.FC<SimpleResultsDisplayProps> = ({ results }) => {

    const renderContent = (result: SimpleGenerationResult) => {
        switch (result.type) {
            case 'summary':
            case 'mnemonic':
            case 'video-script':
                return <p className="text-gray-300 whitespace-pre-wrap">{result.content.summary || result.content.mnemonic || result.content.script}</p>;
            case 'key-terms':
                return (
                    <ul className="space-y-3">
                        {result.content.terms.map((item: { term: string, definition: string }, index: number) => (
                            <li key={index}>
                                <strong className="text-cyan-300">{item.term}:</strong>
                                <span className="text-gray-300 ml-2">{item.definition}</span>
                            </li>
                        ))}
                    </ul>
                );
            case 'quiz':
                 return (
                    <div className="space-y-6">
                        {result.content.questions.map((q: SimpleQuizQuestion, index: number) => (
                            <div key={index}>
                                <p className="font-semibold text-white mb-2">{index + 1}. {q.question}</p>
                                <ul className="space-y-2 pl-4">
                                    {q.options.map((option, i) => (
                                         <li key={i} className={`text-gray-400 ${option === q.answer ? 'font-bold text-green-400' : ''}`}>
                                            {String.fromCharCode(97 + i)}. {option}
                                         </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                 );
             case 'flashcards':
                return (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {result.content.flashcards.map((card: SimpleFlashcard, index: number) => (
                             <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                 <p className="font-bold text-cyan-300 border-b border-slate-600 pb-2 mb-2">Front</p>
                                 <p className="text-gray-200 mb-4">{card.front}</p>
                                 <p className="font-bold text-cyan-300 border-b border-slate-600 pb-2 mb-2">Back</p>
                                 <p className="text-gray-300">{card.back}</p>
                             </div>
                         ))}
                     </div>
                );
            default:
                return <pre className="text-gray-300 whitespace-pre-wrap">{JSON.stringify(result.content, null, 2)}</pre>;
        }
    };

    return (
        <div className="mt-12 space-y-8">
            {results.map((result, index) => (
                 <div key={index} className="glass-card p-6 sm:p-8 rounded-2xl">
                     <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-3">{result.title}</h2>
                     {renderContent(result)}
                 </div>
            ))}
        </div>
    );
};

export default SimpleResultsDisplay;
