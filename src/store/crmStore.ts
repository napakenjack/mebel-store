import { create } from 'zustand'
import { mockCalendar } from '../data/mockCalendar'
import { mockClients } from '../data/mockClients'
import { mockDocuments } from '../data/mockDocuments'
import { mockLeads } from '../data/mockLeads'
import { mockOrders, orderStatuses } from '../data/mockOrders'
import { mockProducts } from '../data/mockProducts'
import { mockTasks } from '../data/mockTasks'
import type {
  CalendarEvent,
  Client,
  Document,
  Lead,
  LeadStatus,
  Order,
  OrderStatus,
  Task,
  TaskStatus,
} from '../types/crm'
import type { Product } from '../types/product'

type CrmData = {
  products: Product[]
  clients: Client[]
  leads: Lead[]
  orders: Order[]
  tasks: Task[]
  documents: Document[]
  calendar: CalendarEvent[]
}

type LeadPayload = {
  clientName: string
  phone: string
  city: string
  productId: string
  comment: string
  measureDate: string
}

type TaskPayload = {
  title: string
  orderId: string
  clientName: string
  dueDate: string
  assignee: string
}

type CalendarEventPayload = Omit<CalendarEvent, 'id'>

type CrmState = CrmData & {
  createLead: (payload: LeadPayload) => Lead
  assignLead: (leadId: string, manager: string) => void
  updateLeadStatus: (leadId: string, status: LeadStatus) => void
  updateLeadSource: (leadId: string, source: string) => void
  addLeadComment: (leadId: string, comment: string) => void
  createOrderFromLead: (leadId: string) => void
  advanceOrder: (orderId: string) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  updateOrderDates: (orderId: string, measureDate: string, deliveryDate: string) => void
  markPrepayment: (orderId: string) => void
  addOrderComment: (orderId: string, comment: string) => void
  addClientMessage: (orderId: string, message: string) => void
  createTask: (payload: TaskPayload) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  addCalendarEvent: (payload: CalendarEventPayload) => void
  createDocument: (orderId: string, type: string) => void
  sendDocument: (documentId: string) => void
  signDocument: (documentId: string) => void
  toggleProductActive: (productId: string) => void
}

const STORAGE_KEY = 'furniture-crm-data'

const initialData: CrmData = {
  products: mockProducts,
  clients: mockClients,
  leads: mockLeads,
  orders: mockOrders,
  tasks: mockTasks,
  documents: mockDocuments,
  calendar: mockCalendar,
}

const readData = (): CrmData => {
  if (typeof localStorage === 'undefined') {
    return initialData
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? ({ ...initialData, ...JSON.parse(raw) } as CrmData) : initialData
}

const pickData = (state: CrmState): CrmData => ({
  products: state.products,
  clients: state.clients,
  leads: state.leads,
  orders: state.orders,
  tasks: state.tasks,
  documents: state.documents,
  calendar: state.calendar,
})

const persist = (data: CrmData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useCrmStore = create<CrmState>((set, get) => ({
  ...readData(),
  createLead: (payload) => {
    const product = get().products.find((item) => item.id === payload.productId)
    const lead: Lead = {
      id: `lead-${Date.now()}`,
      clientName: payload.clientName,
      phone: payload.phone,
      city: payload.city,
      source: 'Онлайн-магазин',
      productId: payload.productId,
      productName: product?.name ?? 'Товар из каталога',
      comment: payload.comment,
      measureDate: payload.measureDate,
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'Новая',
      notes: payload.comment ? [payload.comment] : [],
    }
    const current = get()
    const next = { ...pickData(current), leads: [lead, ...current.leads] }
    persist(next)
    set({ leads: next.leads })
    return lead
  },
  assignLead: (leadId, manager) => {
    const current = get()
    const leads = current.leads.map((lead) =>
      lead.id === leadId
        ? {
            ...lead,
            manager,
            status: 'Назначен менеджер' as const,
            notes: [`Заявка взята в работу менеджером ${manager}`, ...(lead.notes ?? [])],
          }
        : lead,
    )
    persist({ ...pickData(current), leads })
    set({ leads })
  },
  updateLeadStatus: (leadId, status) => {
    const current = get()
    const leads = current.leads.map((lead) =>
      lead.id === leadId
        ? { ...lead, status, notes: [`Статус изменён: ${status}`, ...(lead.notes ?? [])] }
        : lead,
    )
    persist({ ...pickData(current), leads })
    set({ leads })
  },
  updateLeadSource: (leadId, source) => {
    const current = get()
    const leads = current.leads.map((lead) =>
      lead.id === leadId
        ? { ...lead, source, notes: [`Источник уточнён: ${source}`, ...(lead.notes ?? [])] }
        : lead,
    )
    persist({ ...pickData(current), leads })
    set({ leads })
  },
  addLeadComment: (leadId, comment) => {
    const current = get()
    const leads = current.leads.map((lead) =>
      lead.id === leadId ? { ...lead, notes: [comment, ...(lead.notes ?? [])] } : lead,
    )
    persist({ ...pickData(current), leads })
    set({ leads })
  },
  createOrderFromLead: (leadId) => {
    const current = get()
    const lead = current.leads.find((item) => item.id === leadId)
    if (!lead) {
      return
    }

    const clientId = `client-${Date.now()}`
    const product = current.products.find((item) => item.id === lead.productId)
    const amount = product?.priceFrom ?? 300000
    const client: Client = {
      id: clientId,
      name: lead.clientName,
      phone: lead.phone,
      city: lead.city,
      address: 'Адрес уточняется после замера',
      ordersCount: 1,
      totalAmount: amount,
      lastContact: new Date().toISOString().slice(0, 10),
      manager: lead.manager ?? 'Алия',
      notes: lead.comment,
    }
    const order: Order = {
      id: `order-${Date.now()}`,
      number: `ORD-${new Date().getFullYear()}-${current.orders.length + 101}`,
      clientId,
      clientName: lead.clientName,
      productId: lead.productId,
      productName: lead.productName,
      amount,
      prepayment: 0,
      status: 'Замер',
      measureDate: lead.measureDate,
      deliveryDate: '',
      assemblyDate: '',
      manager: lead.manager ?? 'Алия',
      material: product?.materials[0] ?? 'материал уточняется',
      color: product?.colors[0] ?? 'цвет уточняется',
      dimensions: product?.dimensions ?? 'по замеру',
      comments: [lead.comment],
      history: ['заявка создана', 'назначен замер'],
    }
    const task: Task = {
      id: `task-${Date.now()}`,
      title: 'Провести замер и подготовить расчёт',
      orderId: order.id,
      clientName: lead.clientName,
      dueDate: lead.measureDate,
      status: 'Новая',
      assignee: order.manager,
    }
    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      date: lead.measureDate,
      time: '12:00',
      type: 'Замер',
      clientName: lead.clientName,
      address: 'Адрес уточняется',
      orderNumber: order.number,
      responsible: order.manager,
    }
    const leads = current.leads.map((item) =>
      item.id === leadId ? { ...item, status: 'Заказ создан' as const, manager: order.manager } : item,
    )
    const next = {
      ...pickData(current),
      clients: [client, ...current.clients],
      leads,
      orders: [order, ...current.orders],
      tasks: [task, ...current.tasks],
      calendar: [event, ...current.calendar],
    }
    persist(next)
    set(next)
  },
  advanceOrder: (orderId) => {
    const current = get()
    const orders = current.orders.map((order) => {
      if (order.id !== orderId) {
        return order
      }
      const index = orderStatuses.indexOf(order.status)
      const status = orderStatuses[Math.min(index + 1, orderStatuses.length - 1)]
      return {
        ...order,
        status,
        history: [...order.history, status.toLowerCase()],
      }
    })
    persist({ ...pickData(current), orders })
    set({ orders })
  },
  updateOrderStatus: (orderId, status) => {
    const current = get()
    const orders = current.orders.map((order) =>
      order.id === orderId ? { ...order, status, history: [...order.history, status.toLowerCase()] } : order,
    )
    persist({ ...pickData(current), orders })
    set({ orders })
  },
  updateOrderDates: (orderId, measureDate, deliveryDate) => {
    const current = get()
    const orders = current.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            measureDate,
            deliveryDate,
            history: [...order.history, 'обновлены даты замера и доставки'],
          }
        : order,
    )
    persist({ ...pickData(current), orders })
    set({ orders })
  },
  markPrepayment: (orderId) => {
    const current = get()
    const orders = current.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            prepayment: Math.max(order.prepayment, Math.round(order.amount * 0.3)),
            status: order.status === 'Ожидание предоплаты' ? 'В производстве' : order.status,
            history: [...order.history, 'предоплата отмечена'],
          }
        : order,
    )
    persist({ ...pickData(current), orders })
    set({ orders })
  },
  addOrderComment: (orderId, comment) => {
    const current = get()
    const orders = current.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            comments: [comment, ...order.comments],
            history: [...order.history, 'добавлен комментарий менеджера'],
          }
        : order,
    )
    persist({ ...pickData(current), orders })
    set({ orders })
  },
  addClientMessage: (orderId, message) => {
    const current = get()
    const orders = current.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            comments: [`Клиент: ${message}`, ...order.comments],
            history: [...order.history, `сообщение клиента менеджеру: ${message}`],
          }
        : order,
    )
    persist({ ...pickData(current), orders })
    set({ orders })
  },
  createTask: (payload) => {
    const current = get()
    const task: Task = {
      id: `task-${Date.now()}`,
      status: 'Новая',
      ...payload,
    }
    const tasks = [task, ...current.tasks]
    persist({ ...pickData(current), tasks })
    set({ tasks })
  },
  updateTaskStatus: (taskId, status) => {
    const current = get()
    const tasks = current.tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    persist({ ...pickData(current), tasks })
    set({ tasks })
  },
  addCalendarEvent: (payload) => {
    const current = get()
    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      ...payload,
    }
    const calendar = [event, ...current.calendar]
    persist({ ...pickData(current), calendar })
    set({ calendar })
  },
  createDocument: (orderId, type) => {
    const current = get()
    const order = current.orders.find((item) => item.id === orderId)
    if (!order) {
      return
    }
    const document: Document = {
      id: `doc-${Date.now()}`,
      number: `DOC-${new Date().getFullYear()}-${current.documents.length + 50}`,
      orderId,
      clientName: order.clientName,
      type,
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'Черновик',
      createdBy: order.manager,
      signer: order.clientName,
      text: `Демо-документ “${type}” по заказу ${order.number}. В production здесь будет сформированный документ с реквизитами, спецификацией и условиями.`,
    }
    const documents = [document, ...current.documents]
    persist({ ...pickData(current), documents })
    set({ documents })
  },
  sendDocument: (documentId) => {
    const current = get()
    const documents = current.documents.map((document) =>
      document.id === documentId ? { ...document, status: 'Ожидает подписи' as const } : document,
    )
    persist({ ...pickData(current), documents })
    set({ documents })
  },
  signDocument: (documentId) => {
    const current = get()
    const documents = current.documents.map((document) =>
      document.id === documentId
        ? {
            ...document,
            status: 'Подписан' as const,
            signedAt: new Date().toISOString().slice(0, 10),
          }
        : document,
    )
    persist({ ...pickData(current), documents })
    set({ documents })
  },
  toggleProductActive: (productId) => {
    const current = get()
    const products = current.products.map((product) =>
      product.id === productId ? { ...product, active: !product.active } : product,
    )
    persist({ ...pickData(current), products })
    set({ products })
  },
}))
