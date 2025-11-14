import * as React from "react"
import { Glass } from "./glass"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: React.ReactNode
    containerClassName?: string
}

export function Input({
    icon,
    className,
    containerClassName,
    ...inputProps
}: InputProps) {
    return (
        <Glass
            className={cn(
                "inline-flex w-full items-center gap-2",
                'border border-white/50',
                "px-6 py-3",
                "rounded-full",
                "bg-white/30 backdrop-blur-xl",
                "shadow-inner-xl",   
                containerClassName
            )}
        >
            {icon && (
                <span className="flex h-6 w-6 items-center justify-center shrink-0 text-slate-900">
                    {icon}
                </span>
            )}

            <input
                {...inputProps}
                className={cn(
                    "w-full bg-transparent border-none outline-none",
                    "text-sm leading-5 font-normal",
                    "text-slate-900 placeholder:text-slate-500",
                    className
                )}
            />
        </Glass>
    )
}