import { useState } from 'react'

export default function ExchangeFeature() {
  const [sms, setSms] = useState(50)
  const [minutes, setMinutes] = useState(100)

  const smsGb = (sms / 100).toFixed(2)
  const minutesGb = (minutes / 50).toFixed(2)
  const totalGb = (parseFloat(smsGb) + parseFloat(minutesGb)).toFixed(2)

  return (
    <div className="px-4 pt-6 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Обмен ресурсов</h2>
        <p className="text-sm text-gray-500 mt-1">Превращай SMS и минуты в гигабайты</p>
      </div>

      {/* Info banner */}
      <div className="rounded-2xl p-4 mb-6 flex items-start gap-3"
        style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-sm font-semibold text-purple-700">Как это работает?</p>
          <p className="text-xs text-gray-600 mt-1">
            100 SMS = 1 GB · 50 минут = 1 GB
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Неиспользованные ресурсы можно конвертировать в интернет
          </p>
        </div>
      </div>

      {/* SMS slider */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <span className="font-semibold text-gray-800">SMS</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">{sms}</span>
            <span className="text-sm text-gray-500"> шт</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="10"
          value={sms}
          onChange={e => setSms(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: '#6C4BFF' }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">0</span>
          <span className="text-xs text-purple-600 font-medium">= {smsGb} GB</span>
          <span className="text-xs text-gray-400">200</span>
        </div>
      </div>

      {/* Minutes slider */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <span className="font-semibold text-gray-800">Минуты</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">{minutes}</span>
            <span className="text-sm text-gray-500"> мин</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="300"
          step="10"
          value={minutes}
          onChange={e => setMinutes(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: '#6C4BFF' }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">0</span>
          <span className="text-xs text-purple-600 font-medium">= {minutesGb} GB</span>
          <span className="text-xs text-gray-400">300</span>
        </div>
      </div>

      {/* Result card */}
      <div className="rounded-2xl p-5 text-center text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' }}>
        <p className="text-sm opacity-80 mb-1">Ты получишь</p>
        <p className="text-5xl font-bold mb-1">{totalGb}</p>
        <p className="text-lg font-semibold opacity-90">GB</p>
        <div className="mt-3 pt-3 border-t border-white/20 flex justify-center gap-6 text-sm">
          <div>
            <span className="opacity-70">SMS:</span>
            <span className="ml-1 font-medium">{smsGb} GB</span>
          </div>
          <div>
            <span className="opacity-70">Минуты:</span>
            <span className="ml-1 font-medium">{minutesGb} GB</span>
          </div>
        </div>
      </div>

      {/* Apply button */}
      <button
        className="w-full mt-4 py-4 rounded-2xl font-semibold text-purple-600 bg-purple-50 active:bg-purple-100 active:scale-95 transition-all text-base border border-purple-200">
        Применить обмен
      </button>
    </div>
  )
}
