export type OrderStatus =
  | 'Новая заявка'
  | 'Замер'
  | 'Расчёт'
  | 'Ожидание предоплаты'
  | 'В производстве'
  | 'Готово к доставке'
  | 'Доставка'
  | 'Сборка'
  | 'Завершено'

export type LeadStatus = 'Новая' | 'Назначен менеджер' | 'Заказ создан' | 'Закрыта'

export type TaskStatus = 'Новая' | 'В работе' | 'Готово' | 'Просрочено'

export type DocumentStatus =
  | 'Черновик'
  | 'Отправлен клиенту'
  | 'Ожидает подписи'
  | 'Подписан'
  | 'На проверке'
  | 'Отклонён'

export type Client = {
  id: string
  name: string
  phone: string
  city: string
  address: string
  ordersCount: number
  totalAmount: number
  lastContact: string
  manager: string
  notes: string
}

export type Lead = {
  id: string
  clientName: string
  phone: string
  city: string
  source: string
  productId: string
  productName: string
  comment: string
  measureDate: string
  createdAt: string
  status: LeadStatus
  manager?: string
}

export type Order = {
  id: string
  number: string
  clientId: string
  clientName: string
  productId: string
  productName: string
  amount: number
  prepayment: number
  status: OrderStatus
  measureDate: string
  deliveryDate: string
  assemblyDate: string
  manager: string
  material: string
  color: string
  dimensions: string
  comments: string[]
  history: string[]
}

export type Task = {
  id: string
  title: string
  orderId: string
  clientName: string
  dueDate: string
  status: TaskStatus
  assignee: string
}

export type Document = {
  id: string
  number: string
  orderId: string
  clientName: string
  type: string
  createdAt: string
  status: DocumentStatus
  createdBy: string
  signer: string
  text: string
  signedAt?: string
}

export type CalendarEvent = {
  id: string
  date: string
  time: string
  type: 'Замер' | 'Доставка' | 'Сборка'
  clientName: string
  address: string
  orderNumber: string
  responsible: string
}
