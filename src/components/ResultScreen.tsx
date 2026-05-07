import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Target, ListChecks, RotateCcw, PartyPopper } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  let title = "Час повторити матеріал";
  let description = "Біологія — складна наука, не засмучуйтесь!";
  let emoji = "🌱";

  if (percentage >= 90) {
    title = "Справжній Біолог-Експерт!";
    description = "Ви блискуче знаєте тему. Природа вами пишається!";
    emoji = "🏆";
  } else if (percentage >= 70) {
    title = "Чудовий результат!";
    description = "Ви добре орієнтуєтесь у матеріалі, залишились лише дрібниці.";
    emoji = "🌟";
  } else if (percentage >= 50) {
    title = "Хороший старт";
    description = "Ви розумієте основи, але варто заглибитись у деталі.";
    emoji = "📚";
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600" />
        
        <div className="text-5xl mb-6">{emoji}</div>
        <h2 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">{percentage}%</h2>
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-8">Рейтинг Академічної Успішності</h3>
        
        <div className="mb-12">
          <p className="text-xl font-bold text-slate-800 mb-2">{title}</p>
          <p className="text-slate-500 font-medium">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <Trophy className="w-6 h-6 text-indigo-600 mx-auto mb-4" />
            <div className="text-2xl font-black text-slate-900">{score}/{total}</div>
            <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Правильних відповідей</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <Target className="w-6 h-6 text-emerald-600 mx-auto mb-4" />
            <div className="text-2xl font-black text-slate-900 capitalize text-sm">{percentage < 80 ? 'Потрібно повторити' : 'Підтверджено'}</div>
            <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Статус кваліфікації</div>
          </div>
        </div>

        <div className="text-left bg-indigo-900 rounded-xl p-8 mb-10 text-white shadow-xl">
          <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-indigo-400 mb-6 flex items-center gap-2">
            <ListChecks className="w-4 h-4" /> Аналіз компетенцій
          </h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-5 h-5 rounded bg-emerald-500 text-white shrink-0 flex items-center justify-center text-[10px] font-bold">✓</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {percentage > 60 ? "Засвоєно фундаментальні принципи клітинної біології та прокаріотичних систем." : "Варто глибше дослідити структуру клітинної мембрани та ядра."}
              </p>
            </li>
            <li className="flex gap-4">
              <div className="w-5 h-5 rounded bg-emerald-500 text-white shrink-0 flex items-center justify-center text-[10px] font-bold">✓</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {percentage > 80 ? "Успішно ідентифіковано ключові відмінності між царствами живої природи." : "Рекомендуємо звернути увагу на еволюційні переходи вищих рослин до суходолу."}
              </p>
            </li>
          </ul>
        </div>

        <button
          onClick={onRestart}
          className="bg-slate-900 hover:bg-black text-white py-4 rounded-lg font-black text-[10px] uppercase tracking-[0.3em] w-full transition-all shadow-lg flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-4 h-4" />
          Почати новий семестр
        </button>

        <div className="mt-8 text-slate-400">
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Біосфера © 2026 • Академія Природничих Наук</span>
        </div>
      </motion.div>
    </div>
  );
};
