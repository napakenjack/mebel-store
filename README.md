# Amanat Mebel - ваш магазин мебели

Демо-версия PWA-приложения для мебельного онлайн-магазина с личным кабинетом клиента и CRM.

Внутри есть три части:

- публичный онлайн-магазин мебели с каталогом, карточками товаров и заявкой;
- личный кабинет клиента со статусами заказов, документами, уведомлениями и демо-подписью;
- CRM для администратора и менеджера: dashboard, заявки, клиенты, заказы, kanban, задачи, календарь, каталог, документы, менеджеры и настройки.

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

## Иконки приложения

Для замены иконки приложения положите файлы:

- `public/icons/app-icon-192.png`
- `public/icons/app-icon-512.png`
- `public/icons/favicon.png`

Эти пути уже подключены в PWA manifest и `index.html`. До добавления PNG-файлов приложение продолжит открываться; старые SVG-иконки остаются fallback для разработки.

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
