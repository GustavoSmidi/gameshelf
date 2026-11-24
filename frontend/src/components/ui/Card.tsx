import clsx from "clsx"
import type { ReactNode } from "react"

const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-14",
}

type CardProps = {
    children: ReactNode
    className?: string
    padding?: keyof typeof paddings
}

export function Card({
    children,
    className,
    padding = "md",
}: CardProps) {
    return (
        <div className={clsx("bg-card-background","w-full", paddings[padding], className)}>
            {children}
        </div>
    )
}