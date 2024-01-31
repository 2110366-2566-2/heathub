import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "font-sans text-5xl font-normal",
      "h1-bold": "font-sans text-5xl font-extrabold",
      h2: "font-sans text-3xl font-normal",
      "h2-bold": "font-sans text-3xl font-extrabold",
      h3: "font-sans text-2xl font-normal",
      "h3-bold": "font-sans text-2xl font-extrabold",
      h4: "font-sans text-xl font-semibold",
      "h4-bold": "font-sans text-xl font-extrabold",
      h5: "font-sans text-base font-semibold",
      "h5-bold": "font-sans text-base font-bold",
      h6: "font-sans text-sm font-semibold",
      body5: "font-sans text-base font-normal",
      body6: "font-sans text-sm font-normal",
      small: "font-sans text-xs font-normal",
      p: "font-sans text-base font-normal",
      blockquote: "font-sans text-base font-normal italic",
      subtle: "font-sans text-sm font-normal text-[#64748B]",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType["variant"]>,
  string
> = {
  h1: "h1",
  "h1-bold": "h1",
  h2: "h2",
  "h2-bold": "h2",
  h3: "h3",
  "h3-bold": "h3",
  h4: "h4",
  "h4-bold": "h4",
  h5: "h5",
  "h5-bold": "h5",
  h6: "h6",
  body5: "p",
  body6: "p",
  small: "p",
  p: "p",
  blockquote: "blockquote",
  subtle: "span",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : undefined) ?? "div";
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
