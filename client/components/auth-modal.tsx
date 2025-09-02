"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMobileScreen } from "@/hooks/use-mobile-screen";

interface AuthModalProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AuthModal({ children, title }: Readonly<AuthModalProps>) {
  const { back } = useRouter();
  const isMobile = useMobileScreen();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      back();
    }
  };

  if (isMobile) {
    return (
      <Sheet open={true} onOpenChange={handleOpenChange}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-[10px] p-4">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="mt-4">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
