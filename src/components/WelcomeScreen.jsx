export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-16 translate-x-16"
        style={{ background: 'radial-gradient(circle, #6C4BFF 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 translate-y-8 -translate-x-8"
        style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />

      {/* Logo mark */}
      <div className="mb-8 w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg"
        style={{ background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' }}>
        <span className="text-white text-3xl font-bold">K</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-2 tracking-tight">
        Kcell Combo
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-500 text-center mb-2">
        Студенческий конструктор тарифа
      </p>
      <p className="text-sm text-gray-400 text-center mb-10 px-4">
        Плати только за то, что нужно. Зарабатывай бонусы за активность.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {['🎓 Для студентов', '🤖 AI советник', '🎮 Геймификация', '📊 Гибкий тариф'].map(tag => (
          <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold shadow-lg active:scale-95 transition-transform"
        style={{ background: 'linear-gradient(135deg, #6C4BFF 0%, #A855F7 100%)' }}>
        Собрать тариф
      </button>

      <p className="mt-4 text-xs text-gray-400">Без скрытых платежей · Отменить в любой момент</p>
    </div>
  )
}
