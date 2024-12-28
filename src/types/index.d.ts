declare module "@/lib/utils" {
  import { ClassValue } from "clsx";
  export function cn(...inputs: ClassValue[]): string;
}

declare module "@/hooks/use-mobile" {
  export function useMobile(): boolean;
}

declare module "@/hooks/use-toast" {
  import { ReactNode } from "react";

  export interface Toast {
    id: string;
    title?: string;
    description?: string;
    action?: ReactNode;
  }

  export function useToast(): {
    toast: (props: Omit<Toast, "id">) => string;
    dismiss: (id: string) => void;
    toasts: Toast[];
  };

  export const toast: {
    show: (props: Omit<Toast, "id">) => string;
  };
}
