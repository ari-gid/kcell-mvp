import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import TariffBuilder from './components/TariffBuilder'
import ExchangeFeature from './components/ExchangeFeature'
import KcellAura from './components/KcellAura'
import AIRecommendation from './components/AIRecommendation'
import BottomNav from './components/BottomNav'

export default function App() {
  const [screen, setScreen] = useState('welcome')

  if (screen === 'welcome') {
    return <WelcomeScreen onStart={() => setScreen('tariff')} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 pb-20">
        {screen === 'tariff' && <TariffBuilder />}
        {screen === 'exchange' && <ExchangeFeature />}
        {screen === 'aura' && <KcellAura />}
        {screen === 'ai' && <AIRecommendation />}
      </div>
      <BottomNav active={screen} onChange={setScreen} />
    </div>
  )
}
