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

export function TopMenu() {
	const t = useTranslations("Components.TopMenu")
	return (
		<Menubar className="rounded-none border-b border-none px-2 lg:px-4">
			<MenubarMenu>
				<MenubarTrigger className="font-bold">Helenka</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>{t("about")}</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>{t("settings")}</MenubarItem>
					<MenubarSub>
						<MenubarSubTrigger>{t("locale")}</MenubarSubTrigger>
						<LocaleSelect onChange={setLocale} />
					</MenubarSub>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}
