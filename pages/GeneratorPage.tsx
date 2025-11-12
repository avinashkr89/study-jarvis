import React, { useState } from 'react';
import { SimpleGenerationType, SimpleGenerationResult, StudyPack, SourceRef } from '../types';
import { generateTopicStudyPack, generateSimpleContent } from '../services/geminiService';
import { extractTextFromUrl } from '../utils/youtube';

import FileUpload from '../components/FileUpload';
import UrlInput from '../components/UrlInput';
import Loader from '../components/Loader';
import ResultsDisplay from '../components/ResultsDisplay';
import SimpleResultsDisplay from '../components/SimpleResultsDisplay';

import SummaryIcon from '../components/icons/SummaryIcon';
import KeyTermsIcon from '../components/icons/KeyTermsIcon';
import QuizIcon from '../components/icons/QuizIcon';
import FlashcardIcon from '../components/icons/FlashcardIcon';
import MnemonicIcon from '../components/icons/MnemonicIcon';
import VideoIcon from '../components/icons/VideoIcon';

interface GeneratorPageProps {
  credits: number;
  setCredits: (updater: (current: number) => number) => void;
}

const exams = ["JEE", "NEET", "UPSC", "SSC", "Banking", "CUET", "Class 12", "Class 11", "Class 10"];
const initialSources: SourceRef[] = [
    { id: 1, kind: 'youtube', url: 'https://youtube.com/watch?v=...', title: 'Electrostatics - Physics Wallah', channel: 'Physics Wallah', reliability: 'High', selected: true },
    { id: 2, kind: 'web', url: 'https://www.learncbse.in/...', title: 'Gauss Law and Its Applications - LearnCBSE', selected: true },
    { id: 3, kind: 'youtube', url: 'https://youtube.com/watch?v=...', title: 'Gauss Law in 30 Minutes', channel: 'Khan Academy', reliability: 'High', selected: true },
    { id: 4, kind: 'web', url: 'https://byjus.com/...', title: 'Gauss Law - BYJUs', selected: false },
    { id: 5, kind: 'web', url: 'https://en.wikipedia.org/...', title: 'Gauss\'s Law - Wikipedia', selected: false },
];

const GeneratorPage: React.FC<GeneratorPageProps> = ({ credits, setCredits }) => {
    const [mainTab, setMainTab] = useState<'tutor' | 'analyzer'>('tutor');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // --- Topic Tutor State ---
    const [step, setStep] = useState(1);
    const [topic, setTopic] = useState('');
    const [exam, setExam] = useState('JEE');
    const [sources, setSources] = useState<SourceRef[]>(initialSources);
    const [studyPack, setStudyPack] = useState<StudyPack | null>(null);

    // --- Video/Text Analyzer State ---
    const [analyzerInputType, setAnalyzerInputType] = useState<'text' | 'url' | 'file'>('text');
    const [analyzerText, setAnalyzerText] = useState('');
    const [analyzerUrl, setAnalyzerUrl] = useState('');
    const [selectedSimpleTypes, setSelectedSimpleTypes] = useState<SimpleGenerationType[]>(['summary']);
    const [simpleResults, setSimpleResults] = useState<SimpleGenerationResult[]>([]);

    const handleSearchSources = () => {
        if (!topic || !exam) {
            setError('Please enter a topic and select an exam.');
            return;
        }
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            setStep(2);
            setIsLoading(false);
        }, 1000);
    };

    const toggleSource = (id: number) => {
        setSources(sources.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
    };

    const handleGenerateTopicPack = async () => {
        const selectedSources = sources.filter(s => s.selected);
        if (selectedSources.length === 0) {
            setError('Please select at least one source.');
            return;
        }
        const cost = 10 + selectedSources.length;
        if (credits < cost) {
            setError(`You need ${cost} credits, but you only have ${credits}.`);
            return;
        }

        setIsLoading(true);
        setError('');
        setStudyPack(null);

        try {
            const pack = await generateTopicStudyPack(topic, exam, selectedSources);
            setStudyPack(pack);
            setCredits(c => c - cost);
            setStep(3);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const analyzerGenerationOptions: { type: SimpleGenerationType, label: string, icon: React.FC<{className?: string}> }[] = [
        { type: 'summary', label: 'Summary', icon: SummaryIcon }, { type: 'key-terms', label: 'Key Terms', icon: KeyTermsIcon },
        { type: 'quiz', label: 'Quiz', icon: QuizIcon }, { type: 'flashcards', label: 'Flashcards', icon: FlashcardIcon },
        { type: 'mnemonic', label: 'Mnemonic', icon: MnemonicIcon }, { type: 'video-script', label: 'Video Script', icon: VideoIcon },
    ];

    const toggleSimpleSelection = (type: SimpleGenerationType) => {
        setSelectedSimpleTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };

    const handleFileText = (fileText: string) => {
        setAnalyzerText(fileText);
        setAnalyzerInputType('text');
    };
    
    const handleGenerateSimple = async () => {
        let sourceText = analyzerText;
        if (analyzerInputType === 'url') {
            if (!analyzerUrl) { setError('Please enter a URL.'); return; }
            setIsLoading(true); setError(''); setSimpleResults([]);
            try {
                sourceText = await extractTextFromUrl(analyzerUrl);
                setAnalyzerText(sourceText);
            } catch (err: any) { setError(err.message); setIsLoading(false); return; }
        }
        if (!sourceText) { setError('Please provide text.'); setIsLoading(false); return; }
        const cost = 2; 
        if (credits < cost) { setError(`You need ${cost} credits, but you only have ${credits}.`); return; }
        
        setIsLoading(true); setError(''); setSimpleResults([]);

        try {
            const promises = selectedSimpleTypes.map(type => generateSimpleContent(type, sourceText));
            const generatedResults = await Promise.all(promises);
            const newResults: SimpleGenerationResult[] = generatedResults.map((data, index) => ({
                type: selectedSimpleTypes[index],
                title: analyzerGenerationOptions.find(opt => opt.type === selectedSimpleTypes[index])?.label || 'Result',
                content: data,
            }));
            setSimpleResults(newResults);
            setCredits(c => c - cost);
        } catch (err: any) { setError(err.message || 'An unexpected error occurred.'); } 
        finally { setIsLoading(false); }
    };
    
    const resetTutor = () => {
        setStep(1);
        setStudyPack(null);
        setTopic('');
        setError('');
    };

    const inputBaseStyle = "w-full bg-slate-100 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700 rounded-lg py-3 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
    const buttonBaseStyle = "w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:bg-slate-400 dark:disabled:bg-slate-600 glow-effect";

    return (
        <div className="w-full max-w-5xl mx-auto p-4 fade-in">
            <div className="flex justify-center mb-8 border-b border-slate-200 dark:border-slate-800">
                <button onClick={() => setMainTab('tutor')} className={`px-4 py-2 font-semibold ${mainTab === 'tutor' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 dark:text-gray-400'}`}>Topic Tutor</button>
                <button onClick={() => setMainTab('analyzer')} className={`px-4 py-2 font-semibold ${mainTab === 'analyzer' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 dark:text-gray-400'}`}>Video/Text Analyzer</button>
            </div>

            {mainTab === 'tutor' && (
                <div>
                     <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white text-center mb-2">AI Topic Tutor</h1>
                     <p className="text-slate-500 dark:text-gray-400 text-center mb-10">Enter a topic, select your exam, and get a mentor-level study pack.</p>
                     
                     {step !== 3 && (
                         <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-blue-900/20 border border-slate-200 dark:border-slate-800">
                            {step === 1 && (
                                <>
                                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter Topic (e.g., Gauss's Law)" className={inputBaseStyle}/>
                                        <select value={exam} onChange={e => setExam(e.target.value)} className={inputBaseStyle}>
                                            {exams.map(e => <option key={e} value={e}>{e}</option>)}
                                        </select>
                                    </div>
                                    <button onClick={handleSearchSources} disabled={isLoading} className={buttonBaseStyle}>
                                       {isLoading ? 'Searching...' : 'Search for Sources'}
                                    </button>
                                </>
                            )}
                             {step === 2 && (
                                 <>
                                     <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Select Your Sources</h2>
                                     <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
                                         {sources.map(s => (
                                             <div key={s.id} onClick={() => toggleSource(s.id)} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${s.selected ? 'bg-blue-500/10 border-blue-500' : 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'}`}>
                                                 <input type="checkbox" checked={s.selected} readOnly className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-500 text-blue-600 focus:ring-blue-500" />
                                                 <div className="ml-3">
                                                     <p className="font-semibold text-slate-800 dark:text-white">{s.title}</p>
                                                     <p className="text-xs text-slate-500 dark:text-gray-400">{s.kind === 'youtube' ? `YouTube - ${s.channel}` : 'Web Article'}</p>
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                      <button onClick={handleGenerateTopicPack} disabled={isLoading} className={buttonBaseStyle}>
                                        {isLoading ? 'Generating...' : `Generate Study Pack (${10 + sources.filter(s=>s.selected).length} Credits)`}
                                      </button>
                                      <button onClick={() => setStep(1)} className="w-full text-center text-slate-500 dark:text-gray-400 text-sm mt-3 hover:text-slate-800 dark:hover:text-white">Back to topic</button>
                                 </>
                             )}
                         </div>
                     )}
                     
                     {isLoading && <Loader message="Jarvis is preparing your study pack..." />}
                     {error && <p className="mt-4 text-center text-sm text-red-500 dark:text-red-400">{error}</p>}
                     
                     {step === 3 && studyPack && (
                        <>
                            <ResultsDisplay results={studyPack} />
                             <button onClick={resetTutor} className="w-full mt-8 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-all">
                                Generate Another Topic
                             </button>
                        </>
                    )}
                </div>
            )}

            {mainTab === 'analyzer' && (
                 <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white text-center mb-2">Video/Text Analyzer</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-center mb-10">Generate simple study aids from existing text, files, or video URLs.</p>
                     <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-blue-900/20 border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-center mb-6 border-b border-slate-200 dark:border-slate-700">
                            <button onClick={() => setAnalyzerInputType('text')} className={`px-4 py-2 font-semibold ${analyzerInputType === 'text' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 dark:text-gray-400'}`}>Text</button>
                            <button onClick={() => setAnalyzerInputType('url')} className={`px-4 py-2 font-semibold ${analyzerInputType === 'url' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 dark:text-gray-400'}`}>URL</button>
                            <button onClick={() => setAnalyzerInputType('file')} className={`px-4 py-2 font-semibold ${analyzerInputType === 'file' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 dark:text-gray-400'}`}>File</button>
                        </div>
                        <div className="mb-6 min-h-[150px]">
                            {analyzerInputType === 'text' && <textarea value={analyzerText} onChange={(e) => setAnalyzerText(e.target.value)} placeholder="Paste your text here..." className={`min-h-[150px] ${inputBaseStyle}`}></textarea>}
                            {analyzerInputType === 'url' && <UrlInput url={analyzerUrl} setUrl={setAnalyzerUrl} />}
                            {analyzerInputType === 'file' && <FileUpload onFileRead={handleFileText} />}
                        </div>
                         <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Select outputs (2 credits total)</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                            {analyzerGenerationOptions.map(({type, label, icon: Icon}) => (
                                <button key={type} onClick={() => toggleSimpleSelection(type)} className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${selectedSimpleTypes.includes(type) ? 'bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-600 dark:text-gray-300'}`}>
                                    <Icon className="w-7 h-7 mb-1.5"/>
                                    <span className="text-xs font-semibold text-center">{label}</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={handleGenerateSimple} disabled={isLoading} className={buttonBaseStyle}>
                           {isLoading ? 'Generating...' : `Generate (2 Credits)`}
                        </button>
                     </div>
                     {isLoading && <Loader message="Jarvis is processing..." />}
                     {error && <p className="mt-4 text-center text-sm text-red-500 dark:text-red-400">{error}</p>}
                     {!isLoading && simpleResults.length > 0 && <SimpleResultsDisplay results={simpleResults} />}
                 </div>
            )}
        </div>
    );
};

export default GeneratorPage;