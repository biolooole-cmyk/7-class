import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Lightbulb, GraduationCap, Quote } from 'lucide-react';
import { LessonBlock } from '../types';

interface LessonCardProps {
  lesson: LessonBlock;
  onStartQuiz: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onStartQuiz }) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Module Navigation Placeholder/Visual */}
      <div className="bg-white border border-slate-200 px-8 py-3 rounded-xl flex gap-8 mb-4 overflow-x-auto">
        <button className="px-1 py-3 border-b-2 border-indigo-600 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Теорія</button>
        <button className="px-1 py-3 border-b-2 border-transparent text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-600 whitespace-nowrap">Глосарій</button>
        <button className="px-1 py-3 border-b-2 border-transparent text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-600 whitespace-nowrap">Перевірка (5)</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-10">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{lesson.title}</h2>
            
            <p className="text-slate-500 leading-relaxed mb-8 italic border-l-4 border-indigo-100 pl-6 text-lg">
              {lesson.motivation}
            </p>

            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              {lesson.theory.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-12 space-y-8">
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 transition-colors hover:border-indigo-100">
                <h4 className="font-black text-indigo-900 mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Приклади з життя
                </h4>
                <div className="space-y-4">
                  {lesson.examples.map((ex, i) => (
                    <p key={i} className="text-sm text-slate-600 leading-relaxed">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50 rounded-b-2xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Розділ завершено на 100%</span>
            <div className="flex gap-3">
              <button
                onClick={onStartQuiz}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase tracking-widest shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700"
              >
                Перевірка знань
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Glossary & Analogies */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6">
          <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">Термінологія</h3>
            <div className="space-y-6">
              {lesson.glossary.map((g, i) => (
                <div key={i}>
                  <div className="text-sm font-bold mb-1 text-white">{g.term}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{g.definition}</div>
                  {i < lesson.glossary.length - 1 && <div className="h-px bg-slate-800 mt-6"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Простими словами</h3>
            <div className="space-y-6">
              {lesson.analogies.map((an, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-indigo-500 pl-4">
                  "{an}"
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
