import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { PublicLayout } from '../components/layout/PublicLayout'
import { CalendarPage } from '../pages/admin/CalendarPage'
import { CatalogManagePage } from '../pages/admin/CatalogManagePage'
import { ClientDetailPage } from '../pages/admin/ClientDetailPage'
import { ClientsPage } from '../pages/admin/ClientsPage'
import { DashboardPage } from '../pages/admin/DashboardPage'
import { DocumentsPage } from '../pages/admin/DocumentsPage'
import { LeadsPage } from '../pages/admin/LeadsPage'
import { ManagersPage } from '../pages/admin/ManagersPage'
import { OrderDetailPage } from '../pages/admin/OrderDetailPage'
import { OrdersPage } from '../pages/admin/OrdersPage'
import { SettingsPage } from '../pages/admin/SettingsPage'
import { TasksPage } from '../pages/admin/TasksPage'
import { ClientDashboardPage } from '../pages/client/ClientDashboardPage'
import { ClientDocumentsPage } from '../pages/client/ClientDocumentsPage'
import { ClientOrderDetailPage } from '../pages/client/ClientOrderDetailPage'
import { ClientOrdersPage } from '../pages/client/ClientOrdersPage'
import { ClientProfilePage } from '../pages/client/ClientProfilePage'
import { ClientNotificationsPage } from '../pages/client/ClientNotificationsPage'
import { CatalogPage } from '../pages/public/CatalogPage'
import { CategoryPage } from '../pages/public/CategoryPage'
import { CheckoutPage } from '../pages/public/CheckoutPage'
import { ContactsPage } from '../pages/public/ContactsPage'
import { HomePage } from '../pages/public/HomePage'
import { LoginPage } from '../pages/public/LoginPage'
import { ProductPage } from '../pages/public/ProductPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:categoryId" element={<CategoryPage />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route
        path="client"
        element={
          <AppShell title="Обзор клиента" variant="client">
            <ClientDashboardPage />
          </AppShell>
        }
      />
      <Route
        path="client/orders"
        element={
          <AppShell title="Мои заказы" variant="client">
            <ClientOrdersPage />
          </AppShell>
        }
      />
      <Route
        path="client/orders/:orderId"
        element={
          <AppShell title="Детали заказа" variant="client">
            <ClientOrderDetailPage />
          </AppShell>
        }
      />
      <Route
        path="client/documents"
        element={
          <AppShell title="Документы" variant="client">
            <ClientDocumentsPage />
          </AppShell>
        }
      />
      <Route
        path="client/notifications"
        element={
          <AppShell title="Уведомления" variant="client">
            <ClientNotificationsPage />
          </AppShell>
        }
      />
      <Route
        path="client/profile"
        element={
          <AppShell title="Профиль" variant="client">
            <ClientProfilePage />
          </AppShell>
        }
      />

      <Route
        path="admin"
        element={
          <AppShell title="Dashboard CRM" variant="admin">
            <DashboardPage />
          </AppShell>
        }
      />
      <Route
        path="admin/leads"
        element={
          <AppShell title="Заявки" variant="admin">
            <LeadsPage />
          </AppShell>
        }
      />
      <Route
        path="admin/clients"
        element={
          <AppShell title="Клиенты" variant="admin">
            <ClientsPage />
          </AppShell>
        }
      />
      <Route
        path="admin/clients/:clientId"
        element={
          <AppShell title="Карточка клиента" variant="admin">
            <ClientDetailPage />
          </AppShell>
        }
      />
      <Route
        path="admin/orders"
        element={
          <AppShell title="Заказы" variant="admin">
            <OrdersPage />
          </AppShell>
        }
      />
      <Route
        path="admin/orders/:orderId"
        element={
          <AppShell title="Карточка заказа" variant="admin">
            <OrderDetailPage />
          </AppShell>
        }
      />
      <Route
        path="admin/tasks"
        element={
          <AppShell title="Задачи" variant="admin">
            <TasksPage />
          </AppShell>
        }
      />
      <Route
        path="admin/calendar"
        element={
          <AppShell title="Календарь" variant="admin">
            <CalendarPage />
          </AppShell>
        }
      />
      <Route
        path="admin/catalog"
        element={
          <AppShell title="Каталог" variant="admin">
            <CatalogManagePage />
          </AppShell>
        }
      />
      <Route
        path="admin/documents"
        element={
          <AppShell title="Документы" variant="admin">
            <DocumentsPage />
          </AppShell>
        }
      />
      <Route
        path="admin/managers"
        element={
          <AppShell title="Менеджеры" variant="admin">
            <ManagersPage />
          </AppShell>
        }
      />
      <Route
        path="admin/settings"
        element={
          <AppShell title="Настройки" variant="admin">
            <SettingsPage />
          </AppShell>
        }
      />

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}
