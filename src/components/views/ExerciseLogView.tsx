import React from 'react';
import { Activity, Plus, TrendingUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { ExerciseLogEntry } from '../../types';

export function ExerciseLogView() {
  const [logs, setLogs] = React.useState<ExerciseLogEntry[]>(() => {
    const saved = localStorage.getItem('altayyebat_exercise_logs');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), durationMinutes: 30, caloriesBurned: 200, type: 'مشي سريع' },
      { id: '2', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), durationMinutes: 45, caloriesBurned: 350, type: 'تمارين مقاومة' },
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('altayyebat_exercise_logs', JSON.stringify(logs));
  }, [logs]);

  const [newType, setNewType] = React.useState('');
  const [newDuration, setNewDuration] = React.useState('');

  const handleAdd = () => {
    if (!newType || !newDuration) return;
    
    // Simple estimation: ~7 calories per minute on average
    const estimatedCalories = Number(newDuration) * 7;
    
    const entry: ExerciseLogEntry = {
      id: uuidv4(),
      date: format(new Date(), 'yyyy-MM-dd'),
      durationMinutes: Number(newDuration),
      caloriesBurned: estimatedCalories,
      type: newType
    };
    
    setLogs([...logs, entry]);
    setNewType('');
    setNewDuration('');
  };

  const chartData = logs.map(log => ({
    name: log.date.split('-').slice(1).join('/'),
    السعرات: log.caloriesBurned,
    المدة: log.durationMinutes
  }));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
          <TrendingUp size={24} className="text-blue-400" />
          التقدم والرسوم البيانية (السعرات المحروقة)
        </h2>
        <div className="h-64 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Line type="monotone" dataKey="السعرات" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity size={20} className="text-blue-400" />
          إضافة تمرين جديد (اليوم)
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="نوع التمرين (مثال: مشي سريع)" 
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
          <input 
            type="number" 
            placeholder="المدة (بالدقائق)" 
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            className="w-full md:w-32 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} /> أضف
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-900/50 text-slate-400 text-sm">
            <tr>
              <th className="p-4">التاريخ</th>
              <th className="p-4">التمرين</th>
              <th className="p-4">المدة</th>
              <th className="p-4">سعرات محروقة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-slate-300">
            {logs.slice().reverse().map((log) => (
              <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="p-4">{log.date}</td>
                <td className="p-4 font-bold text-blue-100">{log.type}</td>
                <td className="p-4">{log.durationMinutes} دقيقة</td>
                <td className="p-4 text-orange-300">{log.caloriesBurned} سعرة</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
