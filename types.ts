export type Page = 'landing' | 'dashboard' | 'generator' | 'pricing' | 'contact' | 'auth' | 'admin';

export interface User {
  name: string;
  email: string;
  password?: string; // Storing password client-side is for demo only.
  role: 'user' | 'admin';
  credits: number;
}

export interface PaymentRequest {
    id: string;
    userId: string;
    plan: string;
    credits: number;
    amount: number;
    utrCode: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
}

// For Topic Tutor (StudyPack)
export interface ConceptPrimer {
    title: string;
    bullets: string[];
    analogy: string;
}

export interface CoreFormula {
    name: string;
    formula: string;
    variables: string;
    whenToUse: string;
    units: string;
}

export interface WorkedExampleStep {
    step: number;
    explanation: string;
}

export interface WorkedExample {
    problem: string;
    difficulty: 'Easy' | 'Standard' | 'Hard';
    steps: WorkedExampleStep[];
    answer: string;
    quickCheck: string;
}

export interface CommonMistake {
    mistake: string;
    fix: string;
}

export interface MCQ {
    question: string;
    difficulty: 'Easy' | 'Med' | 'Hard'; // Updated from E/M/H
    tags: string[];
    options: string[];
    answer: string; // This should be the full text of the correct option
    explanation_hinglish: string; // Updated from explanation
    timestamp?: string;
}

export interface Flashcard {
    front: string;
    back: string;
}

export interface Mnemonic {
    type: string;
    content: string;
}

export interface PYQMapping {
    year: number;
    exam: string;
    topic: string;
    summary: string;
    strategy: string;
}

export interface StudyPack {
    conceptPrimer: ConceptPrimer;
    deepSummary: string;
    coreFormulas: CoreFormula[];
    workedExamples: WorkedExample[];
    commonMistakes: CommonMistake[];
    mcqQuiz: MCQ[];
    flashcards: Flashcard[];
    mnemonics: Mnemonic[];
    pyqMapping: PYQMapping[];
    quickRevisionSheet: string[];
}

// For Video/Text Analyzer
export type SimpleGenerationType = 'summary' | 'key-terms' | 'quiz' | 'flashcards' | 'mnemonic' | 'video-script';

export interface SimpleKeyTerm {
    term: string;
    definition: string;
}

export interface SimpleQuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

export interface SimpleFlashcard {
    front: string;
    back: string;
}

export interface SimpleGenerationResult {
    type: SimpleGenerationType;
    title: string;
    content: any; 
}

export interface SourceRef {
    id: number;
    kind: 'youtube' | 'web';
    url: string;
    title: string;
    channel?: string;
    reliability?: string;
    selected: boolean;
}
