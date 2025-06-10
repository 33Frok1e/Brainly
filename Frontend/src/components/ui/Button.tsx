import type { ReactElement } from "react"

interface ButtonProps {
    title: string,
    size: 'lg' | 'md' | 'sm',
    startIcon?: ReactElement,
    endIcon?: ReactElement
}

const SizeStyles = {
    'lg' : 'px-6 py-4 text-lg',
    'md' : 'px-4 py-2 text-md',
    'sm' : 'px-2 py-1 text-sm',
}

export function Button(props: ButtonProps) {
    return <button className={`${SizeStyles[props.size]} bg-pink-500 flex items-center`}>
        {props.startIcon}
        {props.title}
        {props.endIcon}
    </button>
}