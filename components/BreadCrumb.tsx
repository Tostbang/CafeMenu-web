"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { AnimatePresence, motion as m } from "motion/react"

// function formatSegment(segment: string) {
//   try {
//     const decoded = decodeURIComponent(segment)
//     return decoded.replace(/[-_]/g, ' ')
//   } catch (e) {
//     return segment.replace(/[-_]/g, ' ')
//   }
// }

export default function DynamicBreadcrumb() {
  const pathname = usePathname() || '/'
  // const search = useSearchParams()
  // const { segments } = useBreadCrumbStore()
  const breadcrumbNameMap: Record<string, string> = {
    '/dash': "Kontrol Paneli",
    '/dash/calculate': "Hesaplama",
    "/dash/packages": "Paketler",
    "/dash/packages/result": "Sonuç",
    '/dash/devices': "Cihazlarım",
    '/dash/profile': "Profil",
    '/admin': "Kontrol Paneli",
    '/admin/users': "Kullanıcılar",
    '/admin/packages': "Paketler",
    '/admin/support': "Destek",
    '/admin/devices': "Cihazlarım",
    '/dash/diyarbakir': "Diyarbakır",
    '/admin/profile': "Profil",
  };

  const pathSegments = pathname.split('/').filter(Boolean)
  const crumbs = pathSegments.map((segment, index) => {
    const linkIndex = '/' + pathSegments
      .slice(0, index + 1)
      .map((item) => (/^\d+$/.test(item) ? "[id]" : item))
      .join('/')
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    if (segment !== "manager" && segment !== "supplier" && segment !== "purchaser" && segment !== "dashboard" && segment !== "departmentUser") {
      const label =
        breadcrumbNameMap[linkIndex] ||
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      return { href, label }
    }
  })
  // console.log("crumbs", crumbs)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs?.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          if (!crumb) return null
          return (
            <AnimatePresence key={crumb.href} mode='wait'>
              <m.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }} className='flex items-center gap-x-2'>
                <BreadcrumbItem>
                  {i === crumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
              </m.div>
            </AnimatePresence>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
