import { useState } from 'react'

const QUESTIONS = [
  { id: 'data', label: 'Сколько интернета ты тратишь?', options: ['Мало (до 5 GB)', 'Средне (5–20 GB)', 'Много (20+ GB)'] },
  { id: 'video', label: 'Смотришь видео онлайн?', options: ['Редко', 'Иногда', 'Постоянно'] },
  { id: 'calls', label: 'Как часто звонишь?', options: ['Почти не звоню', 'Иногда', 'Много звоню'] },
]

const PLANS = {
  low: { name: 'S — 10 GB', price: '990 ₸/мес', reason: 'На основе твоих ответов: ты мало используешь интернет и редко звонишь. S-план — идеальный выбор для экономии.', color: '#10B981' },
  medium: { name: 'M — 30 GB', price: '1 990 ₸/мес', reason: 'Твоё использование среднее — ты иногда смотришь видео и звонишь. M-план обеспечит комфортное использование без переплат.', color: '#6C4BFF' },
  high: { name: 'L — Безлимит', price: '3 490 ₸/мес', reason: 'Ты активно используешь интернет и часто звонишь. Безлимитный план — оптимальное решение без ограничений.', color: '#F59E0B' },
}

function getRecommendation(answers) {
  const score = answers.data + answers.video + answers.calls
  if (score <= 2) return 'low'
  if (score <= 5) return 'medium'
  return 'high'
}

export default function AIRecommendation() {
  const [answers, setAnswers] = useState({ data: 0, video: 0, calls: 0 })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const keys = QUESTIONS.map(q => q.id)

  const allAnswered = keys.every(k => answers[k] > 0)

  const handleOption = (qid, idx) => {
    setAnswers(prev => ({ ...prev, [qid]: idx + 1 }))
    setResult(null)
  }

  const handleAnalyze = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setResult(getRecommendation(answers))
    }, 1500)
  }

  const plan = result ? PLANS[result] : null

  return (
    <div className="px-4 pt-6 pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🤖</span>
          <h2 className="text-2xl font-bold text-gray-900">AI Советник</h2>
        </div>
        <p className="text-sm text-gray-500">Ответь на вопросы — получи персональный план</p>
      </div>

      {/* Questions */}
      <div className="space-y-4 mb-6">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="bg-gray-50 rounded-2xl p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">{q.label}</p>
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOption(q.id, idx)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-all active:scale-98 ${
                    answers[q.id] === idx + 1
                      ? 'text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                  style={answers[q.id] === idx + 1 ? { background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' } : {}}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Analyze button */}
      {!result && (
        <button
          onClick={handleAnalyze}
          disabled={!allAnswered || loading}
          className={`w-full py-4 rounded-2xl text-white font-semibold text-base shadow-lg transition-all ${
            allAnswered && !loading ? 'active:scale-95' : 'opacity-50'
          }`}
          style={{ background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' }}>
          {loading ? '🔄 Анализирую...' : '🤖 Подобрать план'}
        </button>
      )}

      {/* Loading dots */}
      {loading && (
        <div className="mt-4 text-center text-sm text-gray-500 animate-pulse">
          AI анализирует твои данные...
        </div>
      )}

      {/* Result card */}
      {plan && (
        <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 text-white" style={{ background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}cc 100%)` }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">✨</span>
              <span className="text-sm font-medium opacity-90">Рекомендация AI</span>
            </div>
            <p className="text-2xl font-bold">{plan.name}</p>
            <p className="text-lg font-semibold opacity-90">{plan.price}</p>
          </div>
          <div className="p-4 bg-white border border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed">{plan.reason}</p>
            <button
              onClick={() => setResult(null)}
              className="mt-4 text-xs text-purple-600 underline">
              Ответить заново
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
