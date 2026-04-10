
import { Calculator01Filled, CustomerSupportFilled, DashboardSquare03Filled, File02Filled, GeometricShapes01Filled, LaptopPhoneSync1Filled, Location01Filled, NoodlesFilled, Package, PackageFilled, User02Filled, UserMultipleFilled } from "asem-icons";
import { CircleQuestionMark, Factory, Headset, LayoutDashboard, QrCode, Star, User } from "lucide-react";


export const userLinks = [
  {
    title: "Menü",
    url: "/dash/menu",
    icon: File02Filled,
    subLinks: null,
  },
  {
    title: "Kategory",
    url: "/dash/category",
    icon: GeometricShapes01Filled,
    subLinks: null,
  },
  {
    title: "Ürün",
    url: "/dash/products",
    icon: NoodlesFilled,
    subLinks: null,
  },
  {
    title: "QR Kod",
    url: "/dash/qr",
    icon: QrCode,
    subLinks: null,
  },
  // {
  //   title: "Destek",
  //   url: "/dash/support",
  //   icon: CustomerSupportFilled,
  //   subLinks: null
  // },
  // {
  //   title: "Paketler",
  //   url: "/dash/packages",
  //   icon: Package,
  //   subLinks: null
  // },
  // {
  //   title: "Ihaleler",
  //   url: true,
  //   icon: HandshakeIcon,
  //   subLinks: [
  //     {
  //       title: "İhaleler Listele",
  //       url: "/dash/tender",
  //       icon: LayoutList
  //     },
  //     {
  //       title: "Açık İhaleler",
  //       url: "/dash/public-tenders",
  //       icon: Check
  //     },
  //     {
  //       title: "Sipariş Bekliyor",
  //       url: "/dash/completed-tenders",
  //       icon: CheckCheck
  //     },
  //   ],
  // },
  // {
  //   title: "Ekip Yönetimi",
  //   url: null,
  //   icon: Users,
  //   subLinks: [
  //     {
  //       title: "Departmanlar",
  //       url: "/dash/departments",
  //       icon: Building2,
  //       subLinks: null,
  //     },
  //     {
  //       title: "Personeller",
  //       url: "/dash/users",
  //       icon: Users,
  //       subLinks: null,
  //     },
  //   ],
  // },
  {
    title: "Paketler",
    url: "/dash/packages",
    icon: PackageFilled,
    subLinks: null,
  },
  {
    title: "Profil",
    url: "/dash/profile",
    icon: User02Filled,
    subLinks: null,
  },
  // {
  //   title: "Sıkça Sorulan Sorular",
  //   url: "/dash/faq",
  //   icon: CircleQuestionMark,
  //   subLinks: null,
  // },
  // {
  //   title: "Değerlendirmeler",
  //   url: "/dash/reviews",
  //   icon: Star,
  //   subLinks: null,
  // },
  // {
  //   title: "Hesabım",
  //   url: null,
  //   icon: Settings,
  //   subLinks: [
  //     {
  //       title: "Profil",
  //       url: "/dash/profile",
  //       icon: User
  //     },
  //     {
  //       title: "Cihazlar",
  //       url: "/dash/devices",
  //       icon: MonitorSmartphone
  //     },
  //   ]
  // }
]

export const adminLinks = [
  {
    title: "Kontrol Paneli",
    url: "/admin/dashboard",
    icon: DashboardSquare03Filled,
    subLinks: null,
  },
  {
    title: "Kullanıcılar",
    url: "/admin/users",
    icon: UserMultipleFilled,
    subLinks: null,
  },
  {
    title: "Paketler",
    url: "/admin/packages",
    icon: PackageFilled,
    subLinks: null,
  },
  {
    title: "Destek",
    url: "/admin/support",
    icon: CustomerSupportFilled,
    subLinks: null
  },
  {
    title: "Cihazlar",
    url: "/admin/devices",
    icon: LaptopPhoneSync1Filled,
    subLinks: null
  },
  {
    title: "Profil",
    url: "/admin/profile",
    icon: User02Filled,
    subLinks: null,
  },
]
