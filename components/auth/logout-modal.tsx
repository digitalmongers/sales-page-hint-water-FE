"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProfile } from "@/components/auth/login-modal";

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile | null;
  onConfirmLogout: () => void;
}

export function LogoutModal({
  open,
  onOpenChange,
  user,
  onConfirmLogout,
}: LogoutModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="w-full max-w-[calc(100%-2rem)] sm:max-w-md gap-0 p-0 overflow-hidden rounded-2xl border-gray-100 shadow-xl"
      >
        {/* Subtle decorative top bar in brand color */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-950 via-sky-700 to-blue-900" />

        <div className="p-6 sm:p-7 flex flex-col items-center text-center">
          {/* Avatar with logout badge */}
          <div className="relative mb-4 flex items-center justify-center">
            <Avatar className="size-16 sm:size-18 ring-4 ring-blue-50 shadow-sm">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-blue-950 text-white font-semibold text-base sm:text-lg">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span
              className="absolute -bottom-1 -end-1 flex size-6 sm:size-7 items-center justify-center rounded-full bg-rose-100 text-rose-600 ring-2 ring-white shadow-xs"
              aria-hidden="true"
            >
              <HugeiconsIcon icon={Logout01Icon} className="size-3.5 sm:size-4" />
            </span>
          </div>

          <DialogHeader className="gap-2 items-center text-center">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              Log out of your account?
            </DialogTitle>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              <span className="font-semibold text-blue-950">{user.name}</span>
              <span className="text-gray-400">•</span>
              <span className="truncate max-w-[180px] sm:max-w-[220px]">{user.email}</span>
            </div>
            <DialogDescription className="text-sm text-gray-600 max-w-sm mt-1 leading-relaxed">
              Are you sure you want to log out? You will need to sign back in to access your subscriptions and order tracking.
            </DialogDescription>
          </DialogHeader>

          {/* Action buttons - mobile first: stacked on mobile, row on tablet/desktop */}
          <DialogFooter className="w-full mt-6 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3">
            <Button
              id="cancel-logout-btn"
              type="button"
              variant="outline"
              size="lg"
              onClick={() => onOpenChange(false)}
              className="w-full sm:flex-1 h-11 text-sm font-medium border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Cancel
            </Button>
            <Button
              id="confirm-logout-btn"
              type="button"
              size="lg"
              onClick={() => {
                onConfirmLogout();
                onOpenChange(false);
              }}
              className="w-full sm:flex-1 h-11 text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white shadow-xs gap-2"
            >
              <HugeiconsIcon icon={Logout01Icon} className="size-4" />
              Log out
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
