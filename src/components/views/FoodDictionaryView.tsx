import React from 'react';
import { ALLOWED_FOODS_DICTIONARY } from '../../data';

export function FoodDictionaryView() {
  const [filter, setFilter] = React.useState('all');

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'carbs', label: 'النشويات' },
    { id: 'proteins', label: 'البروتينات' },
    { id: 'veggies', label: 'الخضروات' },
    { id: 'fruits', label: 'الفواكه' },
    { id: 'fats', label: 'الدهون' },
    { id: 'sweets', label: 'السكريات' },
  ];

  const filtered = filter === 'all' ? ALLOWED_FOODS_DICTIONARY : ALLOWED_FOODS_DICTIONARY.filter(f => f.type === filter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">دليل المسموحات والسعرات</h2>
          <p className="text-slate-400 text-sm">كافة الأطعمة المذكورة هنا متوافقة قطعياً مع نظام الطيبات.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat.id ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((food, i) => (
          <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-blue-200 mb-3">{food.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-center">
                <span className="block text-slate-500 text-xs">سعرات</span>
                <span className="font-bold text-slate-200">{food.calories}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-center">
                <span className="block text-slate-500 text-xs">كربوهيدرات</span>
                <span className="font-bold text-slate-200">{food.carbs}g</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-center">
                <span className="block text-slate-500 text-xs">بروتين</span>
                <span className="font-bold text-slate-200">{food.protein}g</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-center">
                <span className="block text-slate-500 text-xs">دهون</span>
                <span className="font-bold text-slate-200">{food.fats}g</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center">القيم التقريبية لكل 100 جرام / حصة قياسية</p>
          </div>
        ))}
      </div>
    </div>
  );
}
