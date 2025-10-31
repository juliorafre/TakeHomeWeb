import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"button inline-flex relative items-center justify-center gap-2 max-h-8 whitespace-nowrap rounded-lg font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive clickeable shadow-button",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 shadow-button-primary",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-white text-secondary-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				light:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				/* link: "text-primary underline-offset-4 hover:underline", */
			},
			size: {
				default:
					"h-8 px-3 py-2 has-[>svg]:px-3 text-[13px] leading-4 rounded-lg",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const Button = ({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => {
	return (
		<button
			type="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{props.children}
		</button>
	);
};

export default Button;
