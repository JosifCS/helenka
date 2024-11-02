import { setLocale } from "@/actions/setLocale"
import { LocaleSelect } from "./locale-select"
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarSubTrigger,
	MenubarTrigger,
} from "./ui/menubar"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function TopMenu() {
	const t = useTranslations("Components.TopMenu")
	return (
		<Menubar className="rounded-none border-b  px-2 lg:px-4 fixed top-0 left-0 right-0">
			<MenubarMenu>
				<MenubarTrigger className="font-bold" asChild>
					<Link href={"/"}>Helenka</Link>
				</MenubarTrigger>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>{t("reports")}</MenubarTrigger>
				<MenubarContent>
					<MenubarItem asChild>
						<Link href="/reports">{t("stored")}</Link>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem asChild>
						<Link href="/reports/import">{t("import")}</Link>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>{t("assemblies")}</MenubarTrigger>
				<MenubarContent>
					<MenubarItem asChild>
						<Link href="/assemblies">{t("stored")}</Link>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem asChild>
						<Link href="/assemblies/new">{t("newAssembly")}</Link>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger asChild>{t("about")}</MenubarTrigger>
				<MenubarContent>
					<MenubarItem asChild>
						<Link href="/settings">{t("settings")}</Link>
					</MenubarItem>
					<MenubarSub>
						<MenubarSubTrigger>{t("locale")}</MenubarSubTrigger>
						<LocaleSelect onChange={setLocale} />
					</MenubarSub>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}
