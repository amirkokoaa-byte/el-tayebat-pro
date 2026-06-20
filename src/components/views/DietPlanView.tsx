import React from 'react';
import { BREAKFAST_MEALS, LUNCH_MEALS, DINNER_MEALS, FORBIDDEN_RULES } from '../../data';
import { Meal } from '../../types';
import { RefreshCw, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

export function DietPlanView() {
  const [day, setDay] = React.useState(1);
  const [bIndex, setBIndex] = React.useState(0);
  const [lIndex, setLIndex] = React.useState(0);
  const [reshuffles, setReshuffles] = React.useState(3);

  const combinedMealsForMeal2 = [...LUNCH_MEALS, ...DINNER_MEALS];

  const handleShuffle = (type: 'b' | 'l') => {
    if (reshuffles <= 0) return;
    if (type === 'b') setBIndex((prev) => (prev + 1) % BREAKFAST_MEALS.length);
    if (type === 'l') setLIndex((prev) => (prev + 1) % combinedMealsForMeal2.length);
    setReshuffles((r) => r - 1);
  };

  const nextDay = () => {
    setDay(d => d < 30 ? d + 1 : 30);
    setReshuffles(3);
    setBIndex(Math.floor(Math.random() * BREAKFAST_MEALS.length));
    setLIndex(Math.floor(Math.random() * combinedMealsForMeal2.length));
  };

  const prevDay = () => {
    setDay(d => d > 1 ? d - 1 : 1);
  };

  const currentPhase = day <= 14 
    ? { title: 'مرحلة الترميم الشديدة (الأسبوع 1-2)', desc: 'الاعتماد على أقل عدد من المكونات لوقف الالتهاب وعلاج جدار الأمعاء.' }
    : { title: 'مرحلة التثبيت والتنويع (الأسبوع 3-4)', desc: 'إضافة خيارات مسموحة أكثر لمنع الملل مع الحفاظ على النظام.' };

  const renderMealCard = (title: string, meal: Meal, type: 'b'|'l') => (
    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700/50 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <button 
          onClick={() => handleShuffle(type)}
          disabled={reshuffles === 0}
          className="flex items-center gap-1.5 text-sm bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          <RefreshCw size={16} /> بديل
        </button>
      </div>
      <p className="text-lg text-blue-200 font-medium mb-3 flex-1">{meal?.name}</p>
      <div className="space-y-2 mt-auto">
        <p className="text-slate-400 text-sm">المكونات: <span className="text-slate-300">{meal?.ingredients?.join('، ')}</span></p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-slate-900 text-slate-300 px-2 py-1 rounded-md text-xs border border-slate-700">سعرات: {meal?.calories}</span>
          <span className="bg-slate-900 text-slate-300 px-2 py-1 rounded-md text-xs border border-slate-700">بروتين: {meal?.protein}g</span>
          <span className="bg-slate-900 text-slate-300 px-2 py-1 rounded-md text-xs border border-slate-700">كربوهيدرات: {meal?.carbs}g</span>
          <span className="bg-slate-900 text-slate-300 px-2 py-1 rounded-md text-xs border border-slate-700">دهون: {meal?.fats}g</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
        <button onClick={prevDay} disabled={day === 1} className="px-4 py-2 bg-slate-700 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors">السابق</button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">اليوم {day} من 30</h2>
          <p className="text-sm text-slate-400 mt-1">تغييرات متاحة: {reshuffles}</p>
          <div className="mt-2 text-xs font-bold text-blue-300 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700 inline-block">
            {currentPhase.title}
          </div>
        </div>
        <button onClick={nextDay} disabled={day === 30} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg disabled:opacity-50 transition-colors text-white">التالي</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {renderMealCard('الوجبة الأولى (الإفطار)', BREAKFAST_MEALS[bIndex], 'b')}
        {renderMealCard('الوجبة الثانية (الغداء أو العشاء)', combinedMealsForMeal2[lIndex], 'l')}
      </div>

      <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-xl mt-6">
         <h4 className="flex items-center gap-2 font-bold text-blue-300 mb-2">
            <ShieldAlert size={18} /> قاعدة الوجبتين لترميم الأمعاء
         </h4>
         <p className="text-sm text-blue-100 leading-relaxed">
            وفقاً للنظام الحتمي، يُسمح بوجبتين فقط في اليوم. يُمنع "السناكس" أو الأكل بين الوجبات تماماً لإعطاء المعدة فرصة للتعافي وتقليل ارتفاع الإنسولين. <strong>نأكل فقط عند الجوع الحقيقي.</strong>
         </p>
      </div>

      <div className="bg-slate-800/80 rounded-2xl p-6 border-l-4 border-l-orange-500 mt-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-orange-500 shrink-0 mt-1" />
          <div>
            <h4 className="text-orange-400 font-bold text-lg mb-2">تعليمات قاطعة (د. ضياء العوضي):</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
              {FORBIDDEN_RULES.slice(0, 4).map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-500 mt-8 flex items-center justify-center gap-1">
        <Info size={14} /> بناءً على الفيديوهات الرسمية للدكتور ضياء العوضي.
      </p>
    </div>
  );
}
