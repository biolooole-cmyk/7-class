import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Play, Dna, Leaf, Menu, X } from 'lucide-react';
import { courseData } from './data/courseData';
import { LessonCard } from './components/LessonCard';
import { QuizComponent } from './components/QuizComponent';
import { ResultScreen } from './components/ResultScreen';

type AppState = 'intro' | 'lesson' | 'quiz' | 'results';

export default function App() {
  const [state, setState] = useState<AppState>('intro');
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentBlock = courseData[currentBlockIndex];
  const progress = ((currentBlockIndex) / courseData.length) * 100;

  const startCourse = () => setState('lesson');
  
  const handleStartQuiz = () => setState('quiz');

  const handleQuizComplete = (score: number) => {
    setTotalScore(prev => prev + score);
    if (currentBlockIndex < courseData.length - 1) {
      setCurrentBlockIndex(prev => prev + 1);
      setState('lesson');
    } else {
      setState('results');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setCurrentBlockIndex(0);
    setTotalScore(0);
    setState('intro');
  };

  const skipToBlock = (index: number) => {
    setCurrentBlockIndex(index);
    setState('lesson');
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full h-16 bg-white border-b border-slate-200 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={restart}>
          <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
            <Microscope className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-widest uppercase text-slate-500 leading-none mb-1">7 КЛАС</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Узагальнення за рік</p>
          </div>
        </div>
        
        {state !== 'intro' && state !== 'results' && (
          <div className="hidden md:flex items-center gap-6 flex-1 max-w-md mx-12">
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Прогрес курсу</span>
                <span className="text-[10px] font-bold text-slate-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   className="h-full bg-indigo-500 rounded-full"
                 />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Menu className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Зміст</span>
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-screen w-80 bg-white z-[70] shadow-2xl flex flex-col border-l border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Навчальний план</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {courseData.map((block, idx) => (
                  <button
                    key={block.id}
                    onClick={() => skipToBlock(idx)}
                    className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-all
                      ${currentBlockIndex === idx 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                        : 'hover:bg-slate-50 text-slate-600 border border-transparent'}
                    `}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px]
                      ${currentBlockIndex === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}
                    `}>
                      {idx + 1}
                    </div>
                    <span className="font-bold text-xs truncate uppercase tracking-tight">{block.title}</span>
                  </button>
                ))}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <button 
                  onClick={restart}
                  className="w-full py-2.5 bg-white border border-slate-300 rounded text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Повернутись до вступу
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20 px-6">
        <AnimatePresence mode="wait">
          {state === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto py-20"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
                <div className="inline-flex items-center gap-2 text-indigo-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-8 bg-indigo-50">
                  <Dna className="w-3 h-3" /> Біологія 7 клас
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                  7 клас <br/> <span className="text-indigo-600">Узагальнення за рік</span>.
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                  Глибокий академічний курс, де кожна клітина розглядається як інженерний шедевр еволюції.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-3xl mx-auto">
                   <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="text-indigo-600 font-black text-2xl mb-1">{courseData.length.toString().padStart(2, '0')}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Модулів</div>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="text-indigo-600 font-black text-2xl mb-1">{courseData.reduce((acc, block) => acc + block.quiz.length, 0)}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Тестів</div>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="text-indigo-600 font-black text-2xl mb-1">100%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Якість</div>
                   </div>
                </div>

                <button
                  onClick={startCourse}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-lg text-sm uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 mx-auto"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Почати навчання
                </button>
              </div>
            </motion.div>
          )}

          {state === 'lesson' && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <LessonCard lesson={currentBlock} onStartQuiz={handleStartQuiz} />
            </motion.div>
          )}

          {state === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-xl mx-auto pb-20"
            >
              <QuizComponent questions={currentBlock.quiz} onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {state === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pb-20"
            >
              <ResultScreen 
                score={totalScore} 
                total={courseData.reduce((acc, block) => acc + block.quiz.length, 0)} 
                onRestart={restart} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 bg-gray-50 border-t border-gray-200 mt-20 text-center">
        <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">
          Створено для майбутніх вчених • Біологія 7 клас
        </p>
      </footer>
    </div>
  );
}
