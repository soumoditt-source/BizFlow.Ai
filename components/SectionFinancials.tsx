import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Financials, Language } from '../types';
import { getLabel } from '../utils/i18n';

interface Props {
  data: Financials;
  language: Language;
}

const SectionFinancials: React.FC<Props> = ({ data, language }) => {
  return (
    <div className="space-y-6">
      {/* Unit Economics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-dark-card p-6 rounded-xl border-l-4 border-bizflow-500">
            <div className="text-xs text-gray-400 uppercase mb-1">{getLabel(language, 'cac')}</div>
            <div className="text-3xl font-bold text-white">{data.unitEconomics.cac}</div>
         </div>
         <div className="bg-dark-card p-6 rounded-xl border-l-4 border-blue-500">
            <div className="text-xs text-gray-400 uppercase mb-1">{getLabel(language, 'ltv')}</div>
            <div className="text-3xl font-bold text-white">{data.unitEconomics.ltv}</div>
         </div>
         <div className="bg-dark-card p-6 rounded-xl border-l-4 border-purple-500">
            <div className="text-xs text-gray-400 uppercase mb-1">{getLabel(language, 'margin')}</div>
            <div className="text-3xl font-bold text-white">{data.unitEconomics.margin}</div>
         </div>
      </div>

      {/* Main Chart */}
      <div className="bg-dark-card p-6 rounded-xl border border-bizflow-900/50 h-96">
        <h3 className="text-white font-bold mb-6">{getLabel(language, 'projectionTitle')}</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data.projections}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              itemStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#14b8a6" name={getLabel(language, 'revenue')} radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#f43f5e" name={getLabel(language, 'expenses')} radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" fill="#3b82f6" name={getLabel(language, 'profit')} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-card p-6 rounded-xl border border-bizflow-900/50">
          <h3 className="text-white font-bold mb-4">{getLabel(language, 'revModel')}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{data.revenueModel}</p>
        </div>
        <div className="bg-dark-card p-6 rounded-xl border border-bizflow-900/50">
          <h3 className="text-white font-bold mb-4">{getLabel(language, 'costStruct')}</h3>
          <ul className="space-y-2">
            {data.costStructure.map((cost, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                {cost}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionFinancials;