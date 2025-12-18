"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Home,
  Package2,
  Users,
} from "lucide-react";
import type { Route } from "./nav-main";
import DashboardNavigation from "@/components/nav-main";
import { Link } from "react-router";
import logo from "../assets/building.svg"

const dashboardRoutes: Route[] = [
  {
    id: "home",
    isSomethingNew : false,
    isDisabled: false,
    title: "Home",
    icon: <Home className="size-12" />,
    link: "/",
  },
  {
    id: "customers",
    isDisabled: false,
    title: "Customers",
    isSomethingNew : true,

    icon: <Users className="size-12" />,
    link: "/customers",
  },
];

export function DashboardSidebar() {
  const { state,  } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="inset" className="" collapsible="none">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <Link to="/" className="flex items-center gap-2">
        <img src={logo} className="scale-75" alt="" />
          {/* {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Acme
            </span>
          )} */}
        </Link>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>
      {/* <SidebarFooter className="px-2">
        <TeamSwitcher teams={teams} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
