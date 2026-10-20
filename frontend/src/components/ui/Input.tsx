import clsx from "clsx"
import { useId } from "react"
import type { ComponentProps } from "react"

type InputProps = ComponentProps<"input"> & {
    label?: string
}

export function Input({ label, id, className, ...props }: InputProps) {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={clsx(
                    "w-full rounded-sm border border-border bg-input-background px-3 py-2.5 text-sm text-text outline-none placeholder:text-text focus:border-primary",
                    className
                )}
                {...props}
            />
        </div>
    )
}