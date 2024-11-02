"use client"

import { setLocale } from "@/actions/setLocale"
import { MenubarItem, MenubarSubContent } from "./ui/menubar"

export function LocaleSelect({ onChange }: { onChange: typeof setLocale }) {
	return (
		<MenubarSubContent>
			<MenubarItem onClick={() => onChange("cs")}>Česky</MenubarItem>
			<MenubarItem onClick={() => onChange("en")}>English</MenubarItem>
		</MenubarSubContent>
	)
}
