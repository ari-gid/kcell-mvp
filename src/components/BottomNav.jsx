const TABS = [
  { id: 'tariff', icon: '📱', label: 'Тариф' },
  { id: 'exchange', icon: '🔄', label: 'Обмен' },
  { id: 'aura', icon: '✨', label: 'Aura' },
  { id: 'ai', icon: '🤖', label: 'AI' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-white border-t border-gray-100 shadow-lg">
      <div className="flex">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-all ${
              active === tab.id ? 'text-purple-600' : 'text-gray-400'
            }`}>
            <span className="text-xl">{tab.icon}</span>
            <span className={`text-xs font-medium ${active === tab.id ? 'text-purple-600' : 'text-gray-400'}`}>
              {tab.label}
            </span>
            {active === tab.id && (
              <span className="w-5 h-0.5 rounded-full" style={{ background: '#6C4BFF' }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
