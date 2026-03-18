import LandingPage from './LandingPage'
import WalletTopupPage from './pages/WalletTopupPage'

function App() {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/wallet/topup')) {
        return <WalletTopupPage />
    }

    return <LandingPage />
}

export default App
