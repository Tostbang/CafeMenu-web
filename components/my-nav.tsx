
"use client"

import { ArrowRight01Sharp } from "asem-icons"
import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
// import { useProfileStore } from "@/lib/stores/profile-store"
import { useTransitionRouter } from "next-view-transitions"
import { useLinks } from "@/hooks/use-links"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Fragment } from "react"
import { useRouter } from "@bprogress/next/app"
import { IconType } from "@/lib/types"
// import { InviteSupplierCard } from "@/app/dash/dashboard/_components/InviteSupplierCard"


export type ItemLink = {
  title: string;
  url: string;
  icon: IconType;
  subLinks: null;
} | {
  title: string;
  url: null;
  icon: IconType
  subLinks: {
    title: string;
    icon: IconType;
    url: string;
  }[];
}


export function MyNav({ layout }: { layout: "dash" | "admin" }) {
  const { isMobile, state } = useSidebar()
  const links = useLinks(layout)
  // const { profile } = useProfileStore()

  // const isManager = profile?.roleId === "Manager"
  // const isPurchaser = profile?.roleId === "Purchaser"
  const isManager = true
  const isPurchaser = false

  return (
    <SidebarGroup>
      <SidebarGroupLabel>MENÜ</SidebarGroupLabel>
      <SidebarMenu>
        {links?.map((item) => {
          if (!item.subLinks)
            return <SidebarMenuLink key={item.title} item={item} />

          if (state === 'collapsed' && !isMobile)
            return (
              <SidebarMenuCollapsedDropdown key={item.title} item={item} />
            )

          return (
            <Fragment key={item.title}>
              {item.title === "Hesabım" && (
                <SidebarGroupLabel className="-mb-2">AYARLAR</SidebarGroupLabel>
              )}
              < SidebarMenuCollapsible item={item} />
            </Fragment>
          )
        })}
        {/* {(isManager || isPurchaser) &&
          <InviteSupplierCard />
        } */}
      </SidebarMenu>
    </SidebarGroup >
  )
}


function SidebarMenuCollapsible({ item }: {
  item: ItemLink
}) {
  const { setOpenMobile, open, openMobile } = useSidebar()
  const openState = open || openMobile
  const pathname = usePathname()
  // const router = useTransitionRouter()
  const router = useRouter({ customRouter: useTransitionRouter })
  return (
    <Collapsible
      asChild
      defaultOpen={!!item.url}
      className='group/collapsible'
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <div className="block w-full cursor-pointer">
            <SidebarMenuButton
              tooltip={item.title}
              className={` text-gray-500 rounded-md hover:text-mainColor hover:bg-white font-medium px-3 py-4.5 transition-colors`}
            >
              <div>
                {item.icon && <item.icon className={`${open ? "size-5" : "size-6"}`} />}
              </div>
              {openState && <span>{item.title}</span>}
              {openState && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </SidebarMenuButton>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.subLinks?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  // isActive={pathName === subItem.url}
                  className={`${pathname.includes(subItem.url) ? "bg-white shadow-sm text-mainColor" : "text-gray-500"}  rounded-md hover:text-mainColor hover:bg-white font-medium px-3  py-3 transition-colors`}
                >
                  <div
                    onClick={() => {
                      setOpenMobile(false)
                      router.push(subItem.url)
                    }}
                    className="cursor-pointer"
                  >
                    <div>
                      {subItem.icon && <subItem.icon className={`${open ? "size-4" : "size-6"}`} />}
                    </div>
                    {/* <Settings /> */}
                    <span>{subItem.title}</span>
                  </div>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}


function SidebarMenuCollapsedDropdown({
  item,
}: {
  item: ItemLink
}) {
  // const router = useTransitionRouter()
  const router = useRouter({ customRouter: useTransitionRouter })
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            // tooltip={item.title}
            // isActive={checkIsActive(href, item)}
            className={`  text-gray-500 rounded-md hover:text-mainColor hover:bg-white font-medium px-3 py-4.5 transition-colors`}
          >
            {item.icon && <item.icon />}
            {/* <span>{item.title}</span> */}
            {/* {item.badge && <NavBadge>{item.badge}</NavBadge>} */}
            {/* <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' /> */}
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' align='start' sideOffset={4}>
          <DropdownMenuLabel className="flex items-center justify-between">
            {item.title} <item.icon className="size-4.5" />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item?.subLinks?.map((sub) => (
            <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
              <div
                onClick={() => router.push(sub.url)}
              // className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}
              >
                {sub.icon && <sub.icon />}
                <span className='max-w-52 text-wrap'>{sub.title}</span>
                {/* {sub.badge && (
                  <span className='ms-auto text-xs'>{sub.badge}</span>
                )} */}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function SidebarMenuLink({ item }: {
  item: ItemLink
}) {

  const { setOpenMobile, open, openMobile } = useSidebar()
  const openState = open || openMobile
  const pathname = usePathname()
  // const router = useTransitionRouter()
  const router = useRouter({ customRouter: useTransitionRouter })
  return (
    <div
      onClick={
        () => {
          setOpenMobile(false)
          if (item.url) {
            router.push(item.url)
          }
        }
      }
      key={item.title}
      className="block w-full cursor-pointer"
    >
      <SidebarMenuButton
        tooltip={item.title}
        className={`${item.url && pathname.includes(item.url) ? "bg-[#f5f5f4] navShadow text-[#7e7670] border-[#e7e5e4]" : "text-gray-500 border-transparent"} border active:text-gray-500 hover:text-gray-500 rounded-md  hover:bg-[#ececeb]  font-medium px-3 py-4.5 transition-colors`}
      >
        <div>
          {item.icon && <item.icon className={`${open ? "size-5" : "size-6"}`} />}
        </div>
        {openState && (
          <span>{item.title}</span>
        )}
      </SidebarMenuButton>
    </div>
  )
}

