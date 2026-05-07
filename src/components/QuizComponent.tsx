import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight, Info, HelpCircle } from 'lucide-react';
import { LessonBlock, Question } from '../types';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const QuizComponent: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Перевірка 1.{currentQuestionIndex + 1}</span>
          <div className="flex gap-1">
            {questions.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 w-6 rounded-full ${idx <= currentQuestionIndex ? 'bg-indigo-600' : 'bg-slate-100'}`}
              />
            ))}
          </div>
        </div>
        <HelpCircle className="text-slate-300 w-5 h-5" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
        {currentQuestion.text}
      </h3>

      <div className="space-y-2 mb-10">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            disabled={isAnswered}
            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between group
              ${selectedOption === idx 
                ? isAnswered 
                  ? idx === currentQuestion.correctAnswer 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                    : 'border-rose-600 bg-rose-50 text-rose-900'
                  : 'border-indigo-600 bg-indigo-50 text-indigo-900'
                : isAnswered && idx === currentQuestion.correctAnswer
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-slate-100 hover:border-slate-300 text-slate-600 bg-slate-50/50'
              }
            `}
          >
            <span className="text-sm font-bold uppercase tracking-tight">{String.fromCharCode(65 + idx)}) {option}</span>
            {isAnswered && idx === currentQuestion.correctAnswer && <Check className="w-5 h-5 text-emerald-600" />}
            {isAnswered && selectedOption === idx && idx !== currentQuestion.correctAnswer && <X className="w-5 h-5 text-rose-600" />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl mb-8 text-xs leading-relaxed flex gap-4 ${
              selectedOption === currentQuestion.correctAnswer 
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' 
                : 'bg-indigo-50 text-indigo-900 border border-indigo-100'
            }`}
          >
            <Info className={`w-5 h-5 shrink-0 ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-600' : 'text-indigo-600'}`} />
            <div>
              <p className="font-black uppercase tracking-widest mb-2">
                {selectedOption === currentQuestion.correctAnswer ? 'Вірно!' : 'Розберемось:'}
              </p>
              <p className="font-medium">
                {selectedOption === currentQuestion.correctAnswer 
                  ? currentQuestion.explanationCorrect 
                  : currentQuestion.explanationIncorrect}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        {!isAnswered ? (
          <button
            onClick={handleVerify}
            disabled={selectedOption === null}
            className={`flex-1 py-4 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all
              ${selectedOption !== null 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
            `}
          >
            Перевірити
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-4 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 flex items-center justify-center gap-3 transition-all"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Наступне' : 'Завершити'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
