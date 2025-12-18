import React, { useId } from "react";
import { Bell,BrickWall,Cog,LogOutIcon,
  User,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useAppDispatch, } from "@/stores/stores";
import { logout } from "@/stores/slices/auth";
import TimerCalculator from "../timer-calculator";
import { setIdleTime } from "@/stores/slices/timings";

const Appnavbar: React.FC = () => {

  const dispatch = useAppDispatch()

  const handleLgout = () => {
    dispatch(logout())
    dispatch(setIdleTime(0))
  };

  const id = useId();

  const { isDarkMode, toggle, } = useDarkMode({
    localStorageKey: 'demo-basic-theme',
    applyDarkClass: true,
    defaultValue: false
  });

  return (
    <div className="p-4 flex items-center justify-between border-b gap-4">
      <TimerCalculator />
      <div className="flex items-center gap-4">
        <div>
          <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center font-medium text-sm">
            <Switch
              checked={isDarkMode}
              className="peer [&_span]:data-[state=checked]:rtl:-translate-x-full absolute inset-0 h-[inherit] w-auto data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full"
              id={id}
              onCheckedChange={toggle}
            />
            <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
              <MoonIcon aria-hidden="true" size={16} />
            </span>
            <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
              <SunIcon aria-hidden="true" size={16} />
            </span>
          </div>
          <Label className="sr-only" htmlFor={id}>
            Labeled switch
          </Label>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <Avatar>
                <AvatarImage
                  src="https://www.untitledui.com/images/avatars/owen-harding"
                  alt="Profile image"
                />
                <AvatarFallback>KK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-w-64">
            <DropdownMenuLabel className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-foreground">
                Keith Kennedy
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                k.kennedy@coss.com
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <BrickWall size={16} className="opacity-60" aria-hidden="true" />
                <span>Billings</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <User size={16} className="opacity-60" aria-hidden="true" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Users size={16} className="opacity-60" aria-hidden="true" />
                <span>Teams</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <Bell size={16} className="opacity-60" aria-hidden="true" />
                <span>Notification</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cog
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLgout}>
              <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Appnavbar;
