import clsx from "clsx"
import type { ComponentProps } from "react"

const variants = {
    primary: "bg-primary text-text-secondary",
    contrast: "bg-contrast text-contrast-foreground",
}

type ButtonProps = ComponentProps<"button"> & {
    variant?: keyof typeof variants
}

export function Button({
    variant = "primary",
    type = "button",
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={clsx(
                "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}