import { Download, Share2, Smartphone, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/Button'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISS_KEY = 'installPromptDismissed'
const DISMISS_AT_KEY = 'installPromptDismissedAt'
const APP_INSTALLED_KEY = 'appInstalled'
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000

const INSTALL_PROMPT_STORAGE_KEYS = [
  DISMISS_KEY,
  DISMISS_AT_KEY,
  APP_INSTALLED_KEY,
  'appInstalledAt',
  'pwaInstallPromptDismissed',
  'pwaInstallPromptDismissedAt',
  'amanat-mebel-install-dismissed',
  'amanat-mebel-install-dismissed-at',
  'amanatMebelInstallPromptDismissed',
  'amanatMebelInstallPromptDismissedAt',
]

export function resetInstallPromptState() {
  INSTALL_PROMPT_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
}

function isIosLikeDevice() {
  const navigatorWithTouch = window.navigator as Navigator & { standalone?: boolean }
  return (
    /iPhone|iPad|iPod/i.test(window.navigator.userAgent) ||
    (window.navigator.platform === 'MacIntel' && navigatorWithTouch.maxTouchPoints > 1)
  )
}

function isStandaloneMode() {
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean }
  return window.matchMedia('(display-mode: standalone)').matches || navigatorWithStandalone.standalone === true
}

function normalizeInstallPromptStorage() {
  localStorage.removeItem('amanat-mebel-install-dismissed')
  localStorage.removeItem('amanat-mebel-install-dismissed-at')

  const dismissedAt = localStorage.getItem(DISMISS_AT_KEY)
  if (localStorage.getItem(DISMISS_KEY) === 'true' && !dismissedAt) {
    localStorage.removeItem(DISMISS_KEY)
  }
}

function wasDismissedRecently() {
  const dismissedAt = Number(localStorage.getItem(DISMISS_AT_KEY))
  if (!Number.isFinite(dismissedAt) || dismissedAt <= 0) {
    localStorage.removeItem(DISMISS_AT_KEY)
    return false
  }

  const stillCoolingDown = Date.now() - dismissedAt < DISMISS_COOLDOWN_MS
  if (!stillCoolingDown) {
    localStorage.removeItem(DISMISS_KEY)
    localStorage.removeItem(DISMISS_AT_KEY)
  }

  return stillCoolingDown
}

function markInstallPromptDismissed() {
  localStorage.removeItem(DISMISS_KEY)
  localStorage.setItem(DISMISS_AT_KEY, Date.now().toString())
}

export function InstallAppPopup() {
  const [open, setOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showManualHelp, setShowManualHelp] = useState(false)
  const isIos = isIosLikeDevice()

  const closeUntilTomorrow = () => {
    markInstallPromptDismissed()
    setOpen(false)
  }

  const runInstallFlow = useCallback(async () => {
    localStorage.removeItem(DISMISS_AT_KEY)

    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      setDeferredPrompt(null)

      if (choice.outcome === 'dismissed') {
        markInstallPromptDismissed()
      }

      setOpen(false)
      return
    }

    setShowManualHelp(true)
    setOpen(true)
  }, [deferredPrompt])

  useEffect(() => {
    normalizeInstallPromptStorage()

    if (isStandaloneMode()) {
      localStorage.setItem(APP_INSTALLED_KEY, 'true')
      return
    }

    let timerId: number | undefined
    if (!wasDismissedRecently()) {
      timerId = window.setTimeout(() => setOpen(true), 800)
    }

    const beforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setShowManualHelp(false)
      if (!wasDismissedRecently()) {
        setOpen(true)
      }
    }

    const appInstalled = () => {
      localStorage.setItem(APP_INSTALLED_KEY, 'true')
      setDeferredPrompt(null)
      setOpen(false)
    }

    window.addEventListener('beforeinstallprompt', beforeInstall)
    window.addEventListener('appinstalled', appInstalled)

    return () => {
      if (timerId) {
        window.clearTimeout(timerId)
      }
      window.removeEventListener('beforeinstallprompt', beforeInstall)
      window.removeEventListener('appinstalled', appInstalled)
    }
  }, [])

  useEffect(() => {
    const openPopup = () => {
      void runInstallFlow()
    }

    window.addEventListener('open-install-popup', openPopup)
    return () => window.removeEventListener('open-install-popup', openPopup)
  }, [runInstallFlow])

  const resetDebugState = () => {
    resetInstallPromptState()
    setDeferredPrompt(null)
    setShowManualHelp(true)
    setOpen(true)
  }

  if (!open) {
    return null
  }

  return (
    <div className="install-popup" role="dialog" aria-modal="true" aria-label="Установка приложения">
      <button aria-label="Закрыть окно установки" className="install-close" onClick={closeUntilTomorrow} type="button">
        <X size={18} />
      </button>
      <div className="install-icon">
        <Smartphone size={26} />
      </div>
      <div>
        <span className="eyebrow">Amanat Mebel</span>
        <h2>Установите приложение на рабочий экран телефона</h2>
        <p>Работает как приложение: быстро открывается, удобно использовать с телефона и компьютера.</p>
      </div>
      <div className="install-actions">
        {deferredPrompt ? (
          <Button icon={<Download size={17} />} onClick={runInstallFlow}>
            Установить
          </Button>
        ) : (
          <Button icon={<Share2 size={17} />} onClick={() => setShowManualHelp(true)} variant="secondary">
            Показать инструкцию
          </Button>
        )}
        <Button onClick={closeUntilTomorrow} variant="ghost">
          Позже
        </Button>
      </div>
      {(showManualHelp || !deferredPrompt) && (
        <div className="ios-help">
          <strong>
            <Share2 size={16} />
            {isIos ? 'Для iPhone / Safari' : 'Ручная установка'}
          </strong>
          {isIos ? (
            <>
              <p>На iPhone установка PWA выполняется вручную через меню Поделиться.</p>
              <ol>
                <li>Нажмите кнопку "Поделиться".</li>
                <li>Выберите "На экран Домой".</li>
                <li>Нажмите "Добавить".</li>
              </ol>
            </>
          ) : (
            <p>
              Если кнопка установки не появилась, откройте меню браузера и выберите "Установить приложение" или
              "Добавить на главный экран".
            </p>
          )}
        </div>
      )}
      {import.meta.env.DEV && (
        <Button className="install-debug" onClick={resetDebugState} size="sm" variant="ghost">
          Сбросить PWA popup
        </Button>
      )}
    </div>
  )
}
