import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { HTMLAttributes } from "react"

type ArtworkProps = HTMLAttributes<HTMLDivElement> & {
	/** Poměr stran obrázku. Výchozí hodnota je *free*. */
	aspectRatio?: "portrait" | "square" | "free"
	width?: number
	height?: number
	src: string
	alt: string
	label: string
	description: string
	href: string
}

export function Artwork({
	className,
	aspectRatio = "free",
	alt,
	src,
	height,
	width,
	description,
	label,
	href,
	...props
}: ArtworkProps) {
	return (
		<div className={cn("space-y-3", className)} {...props}>
			<Link href={href} passHref>
				<div className="overflow-hidden rounded-md bg-gray-200">
					<Image
						alt={alt}
						src={src}
						width={width}
						height={height}
						className={cn(
							"h-auto w-auto object-cover transition-all hover:scale-105",
							aspectRatio === "portrait"
								? "aspect-[3/4]"
								: aspectRatio === "square"
									? "aspect-square"
									: "",
							className
						)}
					/>
				</div>
			</Link>

			<div className="space-y-1 text-sm">
				<Link href={href} passHref>
					<h3 className="font-medium leading-none">{label}</h3>
					<p className="text-xs text-muted-foreground">
						{description}
					</p>
				</Link>
			</div>
		</div>
	)
}
