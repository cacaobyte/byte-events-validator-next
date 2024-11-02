"use client"

import { ChevronsUpDown, LogOut, MonitorCog, MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import useAuth from "@/hooks/use-auth"
import { useI18n } from "@/hooks/use-i18n"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

interface Company {
  logo: string
  name: string
  type: string
}

export function NavUser() {
  // const [toggleCompany, setToggleCompany] = React.useState(false)
  // const [selectedCompany, setSelectedCompany] = React.useState<Company>([])
  const { isMobile } = useSidebar()
  const { user } = useAuth()

  // const handleSwitchCompany = (company: Company) => {
  //   setSelectedCompany(company)
  // }

  // const handleToggleCompany = () => {
  //   setToggleCompany(!toggleCompany)
  // }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={"/logo.svg"} alt={user?.username} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.username}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[275px] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"}
            align="start"
            sideOffset={4}
          >
            <NavUserMain />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function NavUserMain() {
  const { setTheme, theme } = useTheme()
  const { user, signOut } = useAuth()
  const i18n = useI18n()
  return (
    <>
      <DropdownMenuLabel className="font-normal">
        <div className="flex items-center gap-2 py-1.5 text-left text-sm">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={"/logo.svg"} alt={user?.username} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.username}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </div>
        {/* <Button
          variant="outline"
          className="group h-8 w-full rounded-lg"
          onClick={handleToggleCompany}
        >
          <RefreshCw className="group-hover:animate-spin" />
          {i18n.t("nav-user.switch-company")}
        </Button> */}
      </DropdownMenuLabel>

      {/* <DropdownMenuSeparator /> */}

      {/* <DropdownMenuGroup>
        <DropdownMenuItem className="mx-2">
          <CreditCard />
          {i18n.t("nav-user.billing")}
        </DropdownMenuItem>
      </DropdownMenuGroup> */}

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuLabel>{i18n.t("nav-user.preferences")}</DropdownMenuLabel>
        <DropdownMenuLabel className="py-0 font-normal">
          <div className="flex items-center justify-between gap-2 px-1 py-1.5 text-left text-sm">
            <span className="text-sm font-normal">
              {i18n.t("nav-user.theme")}
            </span>
            <ToggleGroup
              type="single"
              value={theme}
              onValueChange={(value) => {
                if (value) setTheme(value)
              }}
              className="flex items-center gap-0.5 rounded-full border"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem
                    value="system"
                    className={cn(
                      "size-6 rounded-full p-0 hover:scale-105",
                      theme === "system" && "bg-accent border shadow-sm"
                    )}
                    aria-label="System theme"
                  >
                    <MonitorCog className="size-4" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{i18n.t("nav-user.system")}</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem
                    value="light"
                    className={cn(
                      "size-6 rounded-full p-0 hover:scale-105",
                      theme === "light" && "bg-accent border shadow-sm"
                    )}
                    aria-label="Light theme"
                  >
                    <Sun className="size-4" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{i18n.t("nav-user.light")}</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem
                    value="dark"
                    className={cn(
                      "size-6 rounded-full p-0 hover:scale-105",
                      theme === "dark" && "bg-accent border shadow-sm"
                    )}
                    aria-label="Dark theme"
                  >
                    <MoonStar className="size-4" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{i18n.t("nav-user.dark")}</span>
                </TooltipContent>
              </Tooltip>
            </ToggleGroup>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuLabel className="py-0 font-normal">
          <div className="flex items-center justify-between gap-2 px-1 py-1.5 text-left text-sm">
            <span className="text-sm font-normal">
              {i18n.t("nav-user.language")}
            </span>
            <Select
              defaultValue={i18n.locale}
              onValueChange={(value) => {
                if (value) i18n.setLocale(value)
              }}
            >
              <SelectTrigger className="h-7 max-w-[5.5rem] p-2 text-sm [&>svg]:w-3 [&>svg]:shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="es">
                    {i18n.t("nav-user.spanish")}
                  </SelectItem>
                  <SelectItem value="en">
                    {i18n.t("nav-user.english")}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DropdownMenuLabel> */}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel asChild>
        <Button className="h-8 w-full rounded-lg" onClick={() => signOut()}>
          <LogOut />
          {i18n.t("nav-user.logout")}
        </Button>
      </DropdownMenuLabel>
    </>
  )
}

function NavUserCompany({
  companies,
  selectedCompany,
  handleSwitchCompany,
  handleToggleCompany,
}: {
  companies: Company[]
  selectedCompany: Company
  handleSwitchCompany: (company: Company) => void
  handleToggleCompany: () => void
}) {
  const i18n = useI18n()

  return (
    <>
      <DropdownMenuLabel className="py-0 font-medium" asChild>
        <Button
          variant="link"
          onClick={handleToggleCompany}
          className="text-muted-foreground flex h-10 w-full items-center justify-start text-[13px]"
        >
          <Icons.back />
          {i18n.t("common.back")}
        </Button>
      </DropdownMenuLabel>

      <DropdownMenuLabel className="py-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              src={selectedCompany.logo}
              alt={selectedCompany.name}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {selectedCompany.name}
            </span>
            <span className="truncate text-xs">{selectedCompany.type}</span>
          </div>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuGroup className="flex h-56 w-full flex-col overflow-y-auto">
        <DropdownMenuLabel className="text-muted-foreground text-[13px] font-medium">
          {i18n.t("nav-user.other-company")}
        </DropdownMenuLabel>
        {companies
          .filter((company) => company.name !== selectedCompany.name)
          .map((company) => (
            <DropdownMenuLabel
              key={company.name}
              className="hover:bg-accent cursor-pointer rounded-lg py-0 font-normal"
              onClick={() => handleSwitchCompany(company)}
            >
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{company.name}</span>
                  <span className="truncate text-xs">{company.type}</span>
                </div>
              </div>
            </DropdownMenuLabel>
          ))}
      </DropdownMenuGroup>
    </>
  )
}
