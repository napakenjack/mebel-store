import type { DocumentStatus, LeadStatus, OrderStatus, TaskStatus } from '../types/crm'

export const orderStatusTone: Record<OrderStatus, string> = {
  'Новая заявка': 'neutral',
  Замер: 'info',
  Расчёт: 'info',
  'Ожидание предоплаты': 'warning',
  'В производстве': 'primary',
  'Готово к доставке': 'success',
  Доставка: 'success',
  Сборка: 'primary',
  Завершено: 'done',
}

export const leadStatusTone: Record<LeadStatus, string> = {
  Новая: 'warning',
  'Назначен менеджер': 'info',
  'Заказ создан': 'success',
  Закрыта: 'done',
}

export const taskStatusTone: Record<TaskStatus, string> = {
  Новая: 'neutral',
  'В работе': 'primary',
  Готово: 'done',
  Просрочено: 'danger',
}

export const documentStatusTone: Record<DocumentStatus, string> = {
  Черновик: 'neutral',
  'Отправлен клиенту': 'info',
  'Ожидает подписи': 'warning',
  Подписан: 'done',
  'На проверке': 'primary',
  Отклонён: 'danger',
}
