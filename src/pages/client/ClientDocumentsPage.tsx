import { useState } from 'react'
import { DocumentCard } from '../../components/crm/DocumentCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import type { Document } from '../../types/crm'

export function ClientDocumentsPage() {
  const clientName = useAuthStore((state) => state.session?.name ?? 'Айгуль С.')
  const allDocuments = useCrmStore((state) => state.documents)
  const documents = allDocuments.filter((document) => document.clientName === clientName)
  const signDocument = useCrmStore((state) => state.signDocument)
  const [selected, setSelected] = useState<Document | null>(null)
  const [accepted, setAccepted] = useState(false)

  const close = () => {
    setSelected(null)
    setAccepted(false)
  }

  const sign = () => {
    if (selected && accepted) {
      signDocument(selected.id)
      close()
    }
  }

  return (
    <>
      <Card title="Документы клиента" eyebrow="Демо-подписание">
        <div className="document-list">
          {documents.map((document) => (
            <DocumentCard
              document={document}
              key={document.id}
              onOpen={(item) => setSelected(item)}
              onSign={(documentId) => {
                const item = documents.find((document) => document.id === documentId)
                if (item) {
                  setSelected(item)
                }
              }}
            />
          ))}
        </div>
      </Card>
      <Modal onClose={close} open={Boolean(selected)} title={selected?.number ?? 'Документ'}>
        {selected && (
          <div className="document-modal-body">
            <p>{selected.text}</p>
            <div className="notice">
              Демо-подпись. В production можно подключить ЭЦП / интеграцию с сервисом
              электронного документооборота.
            </div>
            <label className="checkbox-row">
              <input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} type="checkbox" />
              Я ознакомился и согласен
            </label>
            <div className="signature-box">Демо-поле подписи</div>
            <Button disabled={!accepted} onClick={sign}>
              Подписать демо-подписью
            </Button>
          </div>
        )}
      </Modal>
    </>
  )
}
