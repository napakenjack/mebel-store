# Furniture CRM Demo

Демо-версия PWA-приложения для мебельного магазина.

Внутри есть три части:

- публичный онлайн-магазин мебели с каталогом, карточками товаров и заявкой;
- личный кабинет клиента со статусами заказов, документами и демо-подписью;
- CRM для администратора и менеджера: dashboard, заявки, клиенты, заказы, kanban, задачи, календарь, каталог, документы и настройки.

Все данные находятся в проекте как mock-данные. Изменения демо-сценариев сохраняются в `localStorage`, backend не используется.

## Технологии

- React
- Vite
- TypeScript
- React Router
- Zustand
- lucide-react
- vite-plugin-pwa
- Tailwind CSS preflight + собственные стили

## Запуск

```bash
npm run dev
```

## Проверка

```bash
npm run lint
npm run build
```

В текущей Windows-среде обычный `npm` может смотреть в битый пользовательский shim. Рабочая команда через системный npm:

```powershell
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build
```
