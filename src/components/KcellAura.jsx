import { useState } from 'react'

const REWARDS = [
  { steps: 5000, gb: 0.5, label: '0.5 GB', claimed: true },
  { steps: 7500, gb: 1, label: '1 GB', claimed: true },
  { steps: 10000, gb: 2, label: '2 GB', claimed: false },
  { steps: 15000, gb: 3, label: '3 GB', claimed: false },
]

const ACHIEVEMENTS = [
  { icon: '🏃', title: '10 дней подряд', desc: 'Активность каждый день', done: true },
  { icon: '🌟', title: 'Первые 10К шагов', desc: 'Достиг цели 10 000 шагов', done: false },
  { icon: '📚', title: 'Студент месяца', desc: 'Zoom / Teams > 20 часов', done: true },
]

export default function KcellAura() {
  const [steps] = useState(8000)
  const [goal] = useState(10000)
  const [ogoBonus] = useState(340)
  const progress = (steps / goal) * 100
  const [claimed, setClaimed] = useState([true, true, false, false])

  const handleClaim = (idx) => {
    if (steps >= REWARDS[idx].steps && !claimed[idx]) {
      const next = [...claimed]
      next[idx] = true
      setClaimed(next)
    }
  }

  return (
    <div className="px-4 pt-6 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Kcell Aura</h2>
        <p className="text-sm text-gray-500 mt-1">Шаги → гигабайты и бонусы</p>
      </div>

      {/* Steps card */}
      <div className="rounded-2xl p-5 mb-4 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-80">Шагов сегодня</p>
            <p className="text-4xl font-bold mt-0.5">{steps.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Цель</p>
            <p className="text-2xl font-bold mt-0.5">{goal.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div
            className="h-3 rounded-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs opacity-70">
          <span>0</span>
          <span className="font-medium">{Math.round(progress)}% от цели</span>
          <span>{goal.toLocaleString()}</span>
        </div>
      </div>

      {/* OGO Bonus */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏅</span>
          <div>
            <p className="font-semibold text-gray-800">OGO Бонус</p>
            <p className="text-xs text-gray-500">Баллы за активность</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-amber-600">{ogoBonus}</p>
          <p className="text-xs text-amber-500">баллов</p>
        </div>
      </div>

      {/* Rewards */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Награды за шаги</p>
        <div className="grid grid-cols-2 gap-2">
          {REWARDS.map((r, idx) => {
            const unlocked = steps >= r.steps
            const isClaimed = claimed[idx]
            return (
              <button
                key={idx}
                onClick={() => handleClaim(idx)}
                className={`rounded-2xl p-3 text-center transition-all ${
                  isClaimed
                    ? 'bg-green-50 border border-green-200'
                    : unlocked
                    ? 'border-2 border-purple-400 bg-purple-50 active:scale-95'
                    : 'bg-gray-50 border border-gray-100 opacity-60'
                }`}>
                <p className={`text-xl font-bold ${isClaimed ? 'text-green-600' : unlocked ? 'text-purple-600' : 'text-gray-400'}`}>
                  {r.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{r.steps.toLocaleString()} шагов</p>
                <p className={`text-xs mt-1 font-medium ${isClaimed ? 'text-green-500' : unlocked ? 'text-purple-500' : 'text-gray-400'}`}>
                  {isClaimed ? '✓ Получено' : unlocked ? 'Получить!' : '🔒 Заблокировано'}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Достижения</p>
        <div className="space-y-2">
          {ACHIEVEMENTS.map((a, idx) => (
            <div key={idx}
              className={`rounded-2xl p-3 flex items-center gap-3 ${a.done ? 'bg-purple-50 border border-purple-100' : 'bg-gray-50 border border-gray-100 opacity-70'}`}>
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                <p className="text-xs text-gray-500">{a.desc}</p>
              </div>
              {a.done && <span className="text-green-500 text-lg">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
