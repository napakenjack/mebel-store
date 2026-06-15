import { Download, Share2, Smartphone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISS_KEY = 'furniture-crm-install-dismissed'

export function InstallAppPopup() {
  const [open, setOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIosHelp, setShowIosHelp] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY) === 'true'
    if (!dismissed) {
      window.setTimeout(() => setOpen(true), 600)
    }

    const beforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setOpen(true)
    }

    const openPopup = () => {
      localStorage.removeItem(DISMISS_KEY)
      setOpen(true)
    }

    window.addEventListener('beforeinstallprompt', beforeInstall)
    window.addEventListener('open-install-popup', openPopup)

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall)
      window.removeEventListener('open-install-popup', openPopup)
    }
  }, [])

  const close = () => {
    localStorage.setItem(DISMISS_KEY, 'true')
    setOpen(false)
  }

  const install = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
      close()
      return
    }

    setShowIosHelp(true)
  }

  if (!open) {
    return null
  }

  return (
    <div className="install-popup" role="dialog" aria-modal="true" aria-label="Установка приложения">
      <button aria-label="Закрыть окно установки" className="install-close" onClick={close} type="button">
        <X size={18} />
      </button>
      <div className="install-icon">
        <Smartphone size={26} />
      </div>
      <div>
        <span className="eyebrow">Furniture CRM</span>
        <h2>Установите приложение на рабочий экран телефона</h2>
        <p>Работает как приложение: быстро открывается, удобно использовать с телефона и компьютера.</p>
      </div>
      <div className="install-actions">
        <Button icon={<Download size={17} />} onClick={install}>
          Установить
        </Button>
        <Button onClick={close} variant="ghost">
          Позже
        </Button>
      </div>
      {showIosHelp && (
        <div className="ios-help">
          <strong>
            <Share2 size={16} />
            Для iPhone / Safari
          </strong>
          <ol>
            <li>Нажмите кнопку “Поделиться”.</li>
            <li>Выберите “На экран Домой”.</li>
            <li>Нажмите “Добавить”.</li>
          </ol>
        </div>
      )}
    </div>
  )
}
