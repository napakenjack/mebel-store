import type { Task } from '../types/crm'

export const mockTasks: Task[] = [
  {
    id: 't-1',
    title: 'Позвонить клиенту и подтвердить замер',
    orderId: 'o-2',
    clientName: 'Ержан К.',
    dueDate: '2026-06-15',
    status: 'В работе',
    assignee: 'Данияр',
  },
  {
    id: 't-2',
    title: 'Отправить расчёт по кухне',
    orderId: 'o-1',
    clientName: 'Айгуль С.',
    dueDate: '2026-06-15',
    status: 'Готово',
    assignee: 'Алия',
  },
  {
    id: 't-3',
    title: 'Напомнить о предоплате',
    orderId: 'o-3',
    clientName: 'Марат Н.',
    dueDate: '2026-06-14',
    status: 'Просрочено',
    assignee: 'Мадина',
  },
  {
    id: 't-4',
    title: 'Назначить доставку и сборку',
    orderId: 'o-4',
    clientName: 'Динара А.',
    dueDate: '2026-06-15',
    status: 'Новая',
    assignee: 'Алия',
  },
  {
    id: 't-5',
    title: 'Подготовить документы на подпись',
    orderId: 'o-1',
    clientName: 'Айгуль С.',
    dueDate: '2026-06-16',
    status: 'Новая',
    assignee: 'Алия',
  },
]
