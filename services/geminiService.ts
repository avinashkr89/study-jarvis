import { GoogleGenAI, Type } from "@google/genai";
import { SimpleGenerationType, StudyPack } from "./types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const proModel = 'gemini-2.5-pro';

// --- NEW: TOPIC TUTOR SERVICE ---

const topicTutorSystemPrompt = `
You are StudyJARVIS (by Avinash) — a friendly, non-judgmental, and expert Hinglish mentor for students preparing for competitive exams like JEE, NEET, UPSC, etc. Your goal is to break down complex topics into an easy-to-understand and exam-ready study pack.

Your tone should be like a teacher: "Is step me dekho...", "Exam me common trap...", "Simple way me samjho...". Use a mix of English for technical terms and Hindi for explanations. Be crisp, clear, and focus on intuition, formulas, examples, and exam strategies.

Always generate all the sections specified in the JSON schema. Ensure the content is comprehensive and directly addresses the user's topic and exam.
- All summaries & explanations must be in bullet points (short, sharp sentences).
- Each section should use clear emoji anchors (💡, ⚙️, 🧠, 🪄, 📘, 🔥, ❗).
- Explanations should have mentor-style comments, e.g., “Yahan students galti karte hain, dhyaan dena.”
- Use bold for keywords/formulas, italics for insights.
- For formulas, always explain the variables.
- For examples, always explain the 'why' (approach) before solving.
- For quizzes, generate exactly 15 MCQs with clear Hinglish explanations for the answers.
- For flashcards, create exactly 20 cards, with at least 8 being Anki-style cloze deletions (using {{c1::...}}).
- The revision sheet must be 8-10 one-liners with emojis and memory triggers.
- Add motivational endings like: "You’ve got this 🔥, ab practice karo!"
`;

const getTopicTutorSchema = () => ({
    type: Type.OBJECT,
    properties: {
        conceptPrimer: { 
            type: Type.OBJECT, 
            properties: {
                title: { type: Type.STRING },
                bullets: { type: Type.ARRAY, items: { type: Type.STRING }},
                analogy: { type: Type.STRING }
            },
            required: ['title', 'bullets', 'analogy']
        },
        deepSummary: { type: Type.STRING },
        coreFormulas: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    formula: { type: Type.STRING },
                    variables: { type: Type.STRING },
                    whenToUse: { type: Type.STRING },
                    units: { type: Type.STRING },
                },
                required: ['name', 'formula', 'variables', 'whenToUse', 'units']
            }
        },
        workedExamples: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    problem: { type: Type.STRING },
                    difficulty: { type: Type.STRING, enum: ['Easy', 'Standard', 'Hard'] },
                    steps: { type: Type.ARRAY, items: { 
                        type: Type.OBJECT, 
                        properties: { step: { type: Type.INTEGER }, explanation: { type: Type.STRING }},
                        required: ['step', 'explanation']
                    }},
                    answer: { type: Type.STRING },
                    quickCheck: { type: Type.STRING },
                },
                required: ['problem', 'difficulty', 'steps', 'answer', 'quickCheck']
            }
        },
        commonMistakes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: { mistake: { type: Type.STRING }, fix: { type: Type.STRING }},
                required: ['mistake', 'fix']
            }
        },
        mcqQuiz: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    difficulty: { type: Type.STRING, enum: ['Easy', 'Med', 'Hard'] },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING }},
                    options: { type: Type.ARRAY, items: { type: Type.STRING }},
                    answer: { type: Type.STRING },
                    explanation_hinglish: { type: Type.STRING },
                    timestamp: { type: Type.STRING },
                },
                required: ['question', 'difficulty', 'tags', 'options', 'answer', 'explanation_hinglish']
            }
        },
        flashcards: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: { front: { type: Type.STRING }, back: { type: Type.STRING }},
                required: ['front', 'back']
            }
        },
        mnemonics: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: { type: { type: Type.STRING }, content: { type: Type.STRING }},
                required: ['type', 'content']
            }
        },
        pyqMapping: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    year: { type: Type.INTEGER },
                    exam: { type: Type.STRING },
                    topic: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    strategy: { type: Type.STRING },
                },
                required: ['year', 'exam', 'topic', 'summary', 'strategy']
            }
        },
        quickRevisionSheet: { type: Type.ARRAY, items: { type: Type.STRING }}
    },
    required: [ 'conceptPrimer', 'deepSummary', 'coreFormulas', 'workedExamples', 'commonMistakes', 'mcqQuiz', 'flashcards', 'mnemonics', 'pyqMapping', 'quickRevisionSheet' ]
});

export const generateTopicStudyPack = async (topic: string, exam: string, sources: any[]): Promise<StudyPack> => {
    try {
        const userPrompt = `Generate a study pack for the topic "${topic}" for a student preparing for the "${exam}" exam. Use the following sources as context if needed: ${JSON.stringify(sources.map(s => ({ title: s.title, url: s.url })))}. Fulfill all sections as requested in the system prompt.`;

        const response = await ai.models.generateContent({
            model: proModel,
            contents: userPrompt,
            config: {
                systemInstruction: topicTutorSystemPrompt,
                responseMimeType: "application/json",
                responseSchema: getTopicTutorSchema(),
                temperature: 0.6,
                topK: 40,
                topP: 0.95,
            }
        });
        
        const jsonString = response.text.trim();
        if (!jsonString) {
            throw new Error("Empty response from API");
        }
        
        return JSON.parse(jsonString);

    } catch (error) {
        console.error(`Error generating topic study pack:`, error);
        throw new Error('Failed to generate study pack. The model may be overloaded or the topic is too complex. Please try again later.');
    }
};


// --- OLD: SIMPLE CONTENT GENERATOR (for Video/Text Analyzer) ---

const getSimpleResponseSchema = (type: SimpleGenerationType) => {
    switch (type) {
        case 'summary': return { type: Type.OBJECT, properties: { summary: { type: Type.STRING } }, required: ['summary'] };
        case 'key-terms': return { type: Type.OBJECT, properties: { terms: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { term: { type: Type.STRING }, definition: { type: Type.STRING } }, required: ['term', 'definition'] } } }, required: ['terms'] };
        case 'quiz': return { type: Type.OBJECT, properties: { questions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { question: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } }, answer: { type: Type.STRING } }, required: ['question', 'options', 'answer'] } } }, required: ['questions'] };
        case 'flashcards': return { type: Type.OBJECT, properties: { flashcards: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { front: { type: Type.STRING }, back: { type: Type.STRING } }, required: ['front', 'back'] } } }, required: ['flashcards'] };
        case 'mnemonic': return { type: Type.OBJECT, properties: { mnemonic: { type: Type.STRING } }, required: ['mnemonic'] };
        case 'video-script': return { type: Type.OBJECT, properties: { script: { type: Type.STRING } }, required: ['script'] };
        default: throw new Error("Invalid generation type");
    }
}

const getSimplePrompt = (type: SimpleGenerationType, text: string) => {
    switch(type) {
        case 'summary': return `Summarize the following text concisely for a student:\n\n${text}`;
        case 'key-terms': return `Extract the key terms and their definitions from the following text:\n\n${text}`;
        case 'quiz': return `Generate a multiple-choice quiz with 5 questions based on the following text. For each question, provide 4 options and indicate the correct answer:\n\n${text}`;
        case 'flashcards': return `Create 5 flashcards from the following text, with a term/question on the front and a definition/answer on the back:\n\n${text}`;
        case 'mnemonic': return `Create a memorable mnemonic device (like an acronym, song, or story) to help remember the key information in the following text:\n\n${text}`;
        case 'video-script': return `Write a short, engaging video script (around 1-2 minutes) explaining the main concepts of the following text. Include scene descriptions and narration:\n\n${text}`;
        default: throw new Error("Invalid generation type");
    }
};

export const generateSimpleContent = async (type: SimpleGenerationType, text: string): Promise<any> => {
    try {
        const prompt = getSimplePrompt(type, text);
        const schema = getSimpleResponseSchema(type);

        const response = await ai.models.generateContent({
            model: proModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.5,
            }
        });

        const jsonString = response.text.trim();
        if (!jsonString) { throw new Error("Empty response from API"); }
        
        return JSON.parse(jsonString);

    } catch (error) {
        console.error(`Error generating simple content for type ${type}:`, error);
        throw new Error('Failed to generate content. The model may be overloaded or the input content is too complex. Please try again.');
    }
};