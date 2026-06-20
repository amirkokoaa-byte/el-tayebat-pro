import React from 'react';
import { Droplet, Info } from 'lucide-react';
import { WaterLog } from '../../types';

export function WaterTrackerView() {
  const [target, setTarget] = React.useState(() => {
    const saved = localStorage.getItem('altayyebat_water_target');
    return saved ? Number(saved) : 8;
  });
  const [glasses, setGlasses] = React.useState(() => {
    const saved = localStorage.getItem('altayyebat_water_glasses');
    return saved ? Number(saved) : 0;
  });

  React.useEffect(() => {
    localStorage.setItem('altayyebat_water_target', target.toString());
  }, [target]);

  React.useEffect(() => {
    localStorage.setItem('altayyebat_water_glasses', glasses.toString());
  }, [glasses]);

  const progress = Math.min((glasses / target) * 100, 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-800 p-6 md:p-10 rounded-2xl border border-slate-700 text-center">
        <Droplet size={48} className="mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">تتبع شرب الماء</h2>
        <p className="text-slate-400 mb-8">الترطيب مهم جداً لصحة الأمعاء والجسم (الهدف: {target} أكواب)</p>

        <div className="flex flex-col items-center justify-center mb-8">
           <div className="relative w-48 h-48 rounded-full border-8 border-slate-900 flex items-center justify-center bg-slate-800 overflow-hidden shadow-inner">
             {/* Water level fill */}
             <div 
               className="absolute bottom-0 w-full bg-blue-500/40 transition-all duration-1000 ease-in-out"
               style={{ height: `${progress}%` }}
             ></div>
             <div className="relative z-10 text-center">
               <span className="text-5xl font-black text-white">{glasses}</span>
               <span className="block text-slate-300 text-sm mt-1">من {target} أكواب</span>
             </div>
           </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setGlasses(Math.max(0, glasses - 1))}
            className="w-16 h-16 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-2xl font-bold text-slate-300 transition-colors"
          >
            -
          </button>
          <button 
            onClick={() => setGlasses(glasses + 1)}
            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-3xl font-bold text-white transition-colors shadow-lg shadow-blue-900/50"
          >
            +
          </button>
        </div>

        {progress >= 100 && (
          <div className="mt-8 p-4 bg-green-900/30 border border-green-500/50 rounded-xl text-green-400 font-bold animate-pulse">
            أحسنت! لقد حققت هدفك اليومي من شرب الماء.
          </div>
        )}
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
         <h3 className="text-lg font-bold text-white mb-4">إعدادات الهدف اليومي</h3>
         <div className="flex items-center gap-4">
           <input 
             type="range"
             min="4"
             max="15"
             value={target}
             onChange={(e) => setTarget(Number(e.target.value))}
             className="flex-1 accent-blue-500"
           />
           <span className="text-blue-100 font-bold bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
             {target} أكواب
           </span>
         </div>
         <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
           <Info size={14} /> الكوب الواحد يمثل حوالي 250 مل.
         </p>
      </div>
    </div>
  );
}
