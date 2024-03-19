"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex flex-row gap-2">
              {(props.variant === "success" && (
                <div className="flex h-6 w-6 items-center justify-center ">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="h-5 text-[#22C55E]"
                  />
                </div>
              )) ||
                (props.variant === "error" && (
                  <div className="flex h-6 w-6 items-center justify-center ">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="h-5 text-[#EF4444]"
                    />
                  </div>
                ))}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
