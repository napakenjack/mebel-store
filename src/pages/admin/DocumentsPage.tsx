import { useState } from 'react'
import { DocumentCard } from '../../components/crm/DocumentCard'
import { Card } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { useCrmStore } from '../../store/crmStore'
import type { Document } from '../../types/crm'

export function DocumentsPage() {
  const documents = useCrmStore((state) => state.documents)
  const sendDocument = useCrmStore((state) => state.sendDocument)
  const signDocument = useCrmStore((state) => state.signDocument)
  const [selected, setSelected] = useState<Document | null>(null)

  return (
    <>
      <Card title="Documents / Документы" eyebrow="CRM">
        <div className="document-list">
          {documents.map((document) => (
            <DocumentCard
              document={document}
              key={document.id}
              onOpen={setSelected}
              onSend={sendDocument}
              onSign={signDocument}
            />
          ))}
        </div>
      </Card>
      <Modal onClose={() => setSelected(null)} open={Boolean(selected)} title={selected?.number ?? 'Документ'}>
        {selected && (
          <div className="document-modal-body">
            <p>{selected.text}</p>
            <div className="notice">
              Это демонстрационный документ. В production можно подключить генерацию PDF, ЭЦП и
              электронный документооборот.
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
