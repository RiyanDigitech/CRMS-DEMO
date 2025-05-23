"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0.5 select-none",
  {
    variants: {
      variant: {
        default: "bg-[#FF8548] text-white shadow-sm hover:bg-[#FF8548]/90 active:bg-[#FF8548]/80",
        outline: "border-2 border-[#008444] text-[#008444] bg-background hover:bg-[#008444]/5 active:bg-[#008444]/10",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-[#FF8548] underline-offset-4 hover:underline p-0 h-auto shadow-none",
        success: "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 active:bg-emerald-700",
        warning: "bg-amber-500 text-white shadow-sm hover:bg-amber-600 active:bg-amber-700",
        danger: "bg-rose-500 text-white shadow-sm hover:bg-rose-600 active:bg-rose-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        xl:"h-12 rounded-md px-10",
        icon: "h-10 w-10",
        full: "w-full h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
BaseButton.displayName = "Button"

export { BaseButton, buttonVariants }

