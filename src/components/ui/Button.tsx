import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button Component
 * High-performance, accessible button with multiple variants
 * Supports both button and link styles with consistent design
 */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonBaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    title?: string;
    "aria-label"?: string;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
    href?: never;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
    href: string;
    type?: never;
    disabled?: never;
    external?: boolean;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-gradient-to-r from-primary-500 to-primary-600 
    text-white 
    shadow-md hover:shadow-lg hover:shadow-primary-500/25
    hover:from-primary-600 hover:to-primary-700
    active:from-primary-700 active:to-primary-800
  `,
    secondary: `
    bg-gradient-to-r from-secondary-500 to-secondary-600 
    text-white 
    shadow-md hover:shadow-lg hover:shadow-secondary-500/25
    hover:from-secondary-600 hover:to-secondary-700
    active:from-secondary-700 active:to-secondary-800
  `,
    outline: `
    bg-transparent 
    text-primary-600 
    border-2 border-primary-500 
    hover:bg-primary-500 hover:text-white
    active:bg-primary-600
  `,
    ghost: `
    bg-transparent 
    text-neutral-700 
    hover:bg-neutral-100 
    active:bg-neutral-200
  `,
    danger: `
    bg-gradient-to-r from-red-500 to-red-600 
    text-white 
    shadow-md hover:shadow-lg hover:shadow-red-500/25
    hover:from-red-600 hover:to-red-700
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm min-h-[36px] gap-1.5",
    md: "px-4 py-2.5 text-base min-h-[44px] gap-2",
    lg: "px-6 py-3 text-lg min-h-[52px] gap-2.5",
    xl: "px-8 py-4 text-xl min-h-[60px] gap-3",
};

// Loading spinner component
function LoadingSpinner({ className }: { className?: string }) {
    return (
        <svg
            className={cn("animate-spin", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (props, ref) => {
        const {
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            children,
            className,
            onClick,
            title,
            "aria-label": ariaLabel,
        } = props;

        const baseStyles = cn(
            "inline-flex items-center justify-center",
            "font-semibold rounded-lg",
            "transition-[transform,background-color,box-shadow,opacity] duration-200 ease-in-out",
            "hover:scale-[1.02] active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
            "touch-manipulation",
            variantStyles[variant],
            sizeStyles[size],
            fullWidth && "w-full",
            isLoading && "cursor-wait",
            className
        );

        const content = (
            <>
                {isLoading && <LoadingSpinner className="w-4 h-4 mr-2" />}
                {!isLoading && leftIcon && (
                    <span className="flex-shrink-0">{leftIcon}</span>
                )}
                <span>{children}</span>
                {!isLoading && rightIcon && (
                    <span className="flex-shrink-0">{rightIcon}</span>
                )}
            </>
        );

        // Render as Link
        if ("href" in props && props.href) {
            const { href, external } = props as ButtonAsLinkProps;

            if (external) {
                return (
                    <a
                        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={baseStyles}
                        onClick={onClick}
                        title={title}
                        aria-label={ariaLabel}
                    >
                        {content}
                    </a>
                );
            }

            return (
                <Link
                    ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                    href={href}
                    className={baseStyles}
                    onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
                    title={title}
                    aria-label={ariaLabel}
                >
                    {content}
                </Link>
            );
        }

        // Render as Button
        const buttonProps = props as ButtonAsButtonProps;
        return (
            <button
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                type={buttonProps.type || "button"}
                disabled={buttonProps.disabled || isLoading}
                onClick={onClick}
                className={baseStyles}
                aria-disabled={buttonProps.disabled || isLoading}
                title={title}
                aria-label={ariaLabel}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
