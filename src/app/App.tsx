import { BrowserRouter } from 'react-router-dom'
import { InstallAppPopup } from '../components/pwa/InstallAppPopup'
import { AppRoutes } from './routes'

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <InstallAppPopup />
    </BrowserRouter>
  )
}
