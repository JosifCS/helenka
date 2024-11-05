import { setLocale } from "@/actions/setLocale"
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "./ui/menubar"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"

export function TopMenu() {
	const locale = useLocale()
	const t = useTranslations("Components.TopMenu")
	return (
		<Menubar className="rounded-none border-b  px-2 lg:px-4 fixed top-0 left-0 right-0">
			<MenubarMenu>
				<MenubarTrigger className="font-bold" asChild>
					<Link href={"/"}>Helenka</Link>
				</MenubarTrigger>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>{t("file")}</MenubarTrigger>
				<MenubarContent>
					<MenubarItem asChild>
						<Link href="/dialog/import-report">{t("import")}</Link>
					</MenubarItem>
					<MenubarItem asChild>
						<Link href="/reports">{t("newAssembly")}</Link>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>{t("help")}</MenubarTrigger>
				<MenubarContent>
					<MenubarItem asChild>
						<Link href="/about">{t("about")}</Link>
					</MenubarItem>
					<MenubarItem asChild>
						<Link href="/settings">{t("settings")}</Link>
					</MenubarItem>
					<MenubarSub>
						<MenubarSubTrigger>{t("locale")}</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarRadioGroup
								value={locale}
								onValueChange={setLocale}
							>
								<MenubarRadioItem value="cs">
									Česky
								</MenubarRadioItem>
								<MenubarRadioItem value="en">
									English
								</MenubarRadioItem>
							</MenubarRadioGroup>
						</MenubarSubContent>
					</MenubarSub>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}
