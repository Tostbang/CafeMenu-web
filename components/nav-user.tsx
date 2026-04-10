
"use client"

// import { useSignOut } from "@/app/dash/_services/mutations"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { deleteToken } from "@/lib/helpers"
import { useProfileStore } from "@/lib/store/profile-store"
import { Role } from "@/lib/types"
import { Computer, Laptop, Logout04, UnfoldMoreSharp, User02 } from "asem-icons"
import { useRouter } from "next/navigation"
// import { useProfileStore } from "@/lib/stores/profile-store"

export function NavUser() {
  const { isMobile: small } = useSidebar()
  const router = useRouter()
  const { profile } = useProfileStore()

  const isAdmin = profile?.roleId === Role.Admin
  // const isManager = profile?.roleId === "Manager"
  // const isSupplier = profile?.roleId === "Supplier"
  // const isDepartmentUser = profile?.roleId === "DepartmentUser"
  // const { mutate } = useSignOut()

  const profileUrl = isAdmin ? "/admin/profile" : "/dash/profile"
  const deviceUrl = isAdmin ? "/admin/devices" : "/dash/devices"
  const { setOpenMobile } = useSidebar()
  // const router = useTransitionRouter()



  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className={`bg-white w-56 outline-0 ring-0 select-none focus:ring-0 focus-visible:ring-0 border h-11 ${small ? "size-10 rounded-full p-0 mr-3 border" : "rounded-xl px-2"}`}
          >
            <Avatar className={`rounded-lg ${small ? "size-10" : "size-8"}`}>
              {/* <AvatarImage alt={profile?.firstName} src={profile?.profileImageUrl} /> */}
              <AvatarFallback className="rounded-lg  text-lg">{profile?.firstName?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{profile?.firstName} {profile?.lastName}</span>
              <span className="truncate text-xs text-gray-500">{profile?.email}</span>
            </div>
            <UnfoldMoreSharp className="ml-auto size-4 text-gray-500" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage alt={profile?.name} src={profile?.profileImageUrl} /> */}
                <AvatarFallback className="rounded-lg">{profile?.firstName?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{profile?.firstName} {profile?.lastName}</span>
                <span className="truncate text-xs">{profile?.email}</span>
              </div>
            </div>
            {/* <div className="flex items-center gap-x-1 px-4">
                  <BriefcaseBusiness className="text-gray-500 size-4" />
                  <h2>Role:</h2>
                  {profile.roleId}
                </div> */}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Profile - All roles */}
          <DropdownMenuItem onClick={
            () => {
              setOpenMobile(false)
              router.push(profileUrl)
            }
          }>
            <User02 />
            Profil
          </DropdownMenuItem>

          {/* Departments - Manager only */}
          {/* {isManager && (
            <DropdownMenuItem onClick={() => router.push("/dash/departments")}>
              <Building2 />
              Departmanlar
            </DropdownMenuItem>
          )} */}

          {/* Tenders - Purchaser and Manager */}
          {/* {(isPurchaser || isManager) && (
            <DropdownMenuItem onClick={() => router.push("/dash/tender")}>
              <HandshakeIcon />
              İhaleler
            </DropdownMenuItem>
          )} */}

          {/* {!isDepartmentUser && (
            <>
              <DropdownMenuItem onClick={() => router.push("/dash/orders")}>
                <ShoppingBag />
                Siparişler
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dash/reviews")}>
                <Star />
                Değerlendirmeler
              </DropdownMenuItem>
            </>
          )} */}

          {/* Devices - All roles */}
          <DropdownMenuItem onClick={
            () => {
              setOpenMobile(false)
              router.push(deviceUrl)
            }
          }>
            <Laptop />
            Cihazlar
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <p className="text-[#848b9b] text-xs text-center mt-2">@2025 Seuqnce Inc.</p> */}
    </>

  )
}

// <DropdownMenuItem onClick={
// 		  () => mutate({
//             body: {
//               sessionId: profile?.currentSessionId ?? 0
//             }
//           })}>
//             <Logout04 />
//             Çıkış Yap
//           </DropdownMenuItem>
