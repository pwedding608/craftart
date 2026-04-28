import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminGuard } from '@/features/admin/AdminGuard'
import { AdminLoginPage } from '@/features/admin/AdminLoginPage'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ShopPage } from '@/pages/ShopPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CustomOrderPage } from '@/pages/CustomOrderPage'
import { TestimonialsPage } from '@/pages/TestimonialsPage'
import { ContactPage } from '@/pages/ContactPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { AdminDashboardPage } from '@/features/admin/AdminDashboardPage'
import { AdminProductsPage } from '@/features/admin/AdminProductsPage'
import { AdminProductFormPage } from '@/features/admin/AdminProductFormPage'
import { AdminInquiriesPage } from '@/features/admin/AdminInquiriesPage'
import { AdminOrdersPage } from '@/features/admin/AdminOrdersPage'
import { AdminTestimonialsPage } from '@/features/admin/AdminTestimonialsPage'
import { AdminGalleryPage } from '@/features/admin/AdminGalleryPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:categorySlug" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminGuard />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<AdminProductFormPage />} />
          <Route path="products/:id" element={<AdminProductFormPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
