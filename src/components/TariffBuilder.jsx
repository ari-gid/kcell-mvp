import { useState } from 'react'

const DATA_PLANS = [
  { id: 's', label: 'S', gb: '10 GB', price: 990 },
  { id: 'm', label: 'M', gb: '30 GB', price: 1990 },
  { id: 'l', label: 'L', gb: '∞', price: 3490 },
]

const APPS = [
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  { id: 'instagram', label: 'Instagram', icon: '📷' },
  { id: 'youtube', label: 'YouTube', icon: '▶️' },
  { id: 'telegram', label: 'Telegram', icon: '✈️' },
]

export default function TariffBuilder() {
  const [dataPlan, setDataPlan] = useState('m')
  const [selectedApp, setSelectedApp] = useState('telegram')

  const planObj = DATA_PLANS.find(p => p.id === dataPlan)
  const total = planObj ? planObj.price : 0

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Конструктор тарифа</h2>
        <p className="text-sm text-gray-500 mt-1">Собери свой идеальный план</p>
      </div>

      {/* Base plan card */}
      <div className="rounded-2xl p-4 mb-4 border border-purple-100"
        style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">База</span>
          <span className="text-lg font-bold text-purple-600">0 ₸</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-purple-500">✓</span>
            <span>Безлимит: Zoom, Teams, Coursera</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-purple-500">✓</span>
            <span>Безлимитные звонки внутри Kcell/Activ</span>
          </div>
        </div>
      </div>

      {/* Data plan selector */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Выбери объём интернета</p>
        <div className="grid grid-cols-3 gap-2">
          {DATA_PLANS.map(plan => (
            <button
              key={plan.id}
              onClick={() => setDataPlan(plan.id)}
              className={`rounded-2xl py-4 flex flex-col items-center transition-all active:scale-95 ${
                dataPlan === plan.id
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-gray-50 text-gray-700 border border-gray-100'
              }`}
              style={dataPlan === plan.id ? { background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' } : {}}>
              <span className="text-2xl font-bold">{plan.label}</span>
              <span className={`text-xs mt-1 ${dataPlan === plan.id ? 'text-purple-200' : 'text-gray-400'}`}>
                {plan.gb}
              </span>
              <span className={`text-xs mt-1 font-medium ${dataPlan === plan.id ? 'text-white' : 'text-purple-600'}`}>
                {plan.price.toLocaleString()} ₸
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Unlimited app */}
      <div className="mb-24">
        <p className="text-sm font-semibold text-gray-700 mb-3">Выбери 1 безлимитное приложение</p>
        <div className="grid grid-cols-2 gap-2">
          {APPS.map(app => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              className={`rounded-2xl py-3 px-4 flex items-center gap-3 transition-all active:scale-95 ${
                selectedApp === app.id
                  ? 'text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 border border-gray-100'
              }`}
              style={selectedApp === app.id ? { background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' } : {}}>
              <span className="text-xl">{app.icon}</span>
              <span className="font-medium text-sm">{app.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sticky bottom summary */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4 pb-2 bg-white/95 backdrop-blur border-t border-gray-100">
        <div className="pt-3 pb-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">Итого в месяц</p>
              <p className="text-2xl font-bold text-gray-900">{total.toLocaleString()} ₸</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Интернет</p>
              <p className="text-sm font-semibold text-purple-600">{planObj?.gb}/мес</p>
            </div>
          </div>
          <button
            className="w-full py-3.5 rounded-2xl text-white font-semibold text-base shadow-lg active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' }}>
            Подключить
          </button>
        </div>
      </div>
    </div>
  )
}
