import React from 'react';
import { Scale, TrendingUp, TrendingDown, Info } from 'lucide-react';

export function WeightManagerView() {
  const [mode, setMode] = React.useState<'loss' | 'gain'>('loss');
  const [calories, setCalories] = React.useState(2000);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-4">
        <button
          onClick={() => setMode('loss')}
          className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${mode === 'loss' ? 'border-blue-500 bg-blue-900/40 text-blue-100' : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <TrendingDown size={32} className="mb-2" />
          <span className="text-xl font-bold">التخسيس</span>
        </button>
        <button
          onClick={() => setMode('gain')}
          className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${mode === 'gain' ? 'border-blue-500 bg-blue-900/40 text-blue-100' : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <TrendingUp size={32} className="mb-2" />
          <span className="text-xl font-bold">زيادة الوزن</span>
        </button>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Scale size={24} className="text-blue-400" />
            حاسبة السعرات المحروقة
          </h2>
          <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 text-xl font-bold text-blue-400">
            {calories} سعرة
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-slate-300 text-sm">تخصيص الخطة الغذائية بناءً على السعرات اليومية المستهدفة:</label>
          <input 
            type="range" 
            min="1200" 
            max="4000" 
            step="100" 
            value={calories} 
            onChange={(e) => setCalories(Number(e.target.value))}
            className="w-full accent-blue-500" 
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1200</span>
            <span>2000</span>
            <span>4000</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">تعليمات {mode === 'loss' ? 'التخسيس' : 'زيادة الوزن'} (وفقاً للطيبات)</h3>
        
        {mode === 'loss' ? (
           <ul className="space-y-3 text-slate-300">
             <li className="flex items-start gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
               <div>الاعتماد على الدهون الحيوانية (الزبدة/السمن) للشبع وتقليل الإحساس بالجوع.</div>
             </li>
             <li className="flex items-start gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
               <div>منع "السناكس" والوجبات البينية تماماً. نأكل فقط عند الجوع الحقيقي.</div>
             </li>
             <li className="flex items-start gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
               <div>تقليل حصص النشويات (الأرز/توست الحبة الكاملة) تدريجياً، مع الحفاظ عليها كمصدر للطاقة.</div>
             </li>
           </ul>
        ) : (
           <ul className="space-y-3 text-slate-300">
             <li className="flex items-start gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
               <div>زيادة حصص الكربوهيدرات المسموحة (الأرز، البطاطس، البطاطا، توست الحبة الكاملة) بشكل رئيسي في الوجبات.</div>
             </li>
             <li className="flex items-start gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
               <div>استخدام العسل الأبيض النقي والبلح أو التمر يومياً.</div>
             </li>
             <li className="flex items-start gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
               <div>زيادة كمية السمن البلدي في طهي اللحوم والطيور.</div>
             </li>
           </ul>
        )}
      </div>

      <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
        <Info size={14} /> بناءً على الفيديوهات الرسمية للدكتور ضياء العوضي.
      </p>
    </div>
  );
}
