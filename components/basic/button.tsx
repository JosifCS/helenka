import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/modules/utils";

export const buttonVariants = cva(String.Empty, {
  variants: {
    variant: {
      primary:
        "rounded-full border border-solid transition-colors flex items-center justify-center border-transparent bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc]",
      secondary:
        "rounded-full border border-solid transition-colors flex items-center justify-center border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent sm:min-w-44",
      link: "gap-2 hover:underline hover:underline-offset-4",
    },
    size: {
      sm: "text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4",
      md: "text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5",
      lg: "text-base sm:text-lg h-12 sm:h-14 px-5 sm:px-6",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, className, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
