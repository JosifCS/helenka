import { uploadPortu } from "@/actions/uploadPortu"
import { Artwork } from "@/components/artwork"
import { PageTitle } from "@/components/page-title"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

const brokers = ["eToro", "Portu", "XTB"]

export default async function Page() {
	const t = await getTranslations("Reports.Import")
	return (
		<main>
			<PageTitle title={t("title")} description={t("description")} />
			<div className="relative">
				<ScrollArea>
					<div className="flex space-x-4 pb-4">
						{brokers.map((x) => (
							<Link href="" passHref>
								<Artwork
									alt=""
									description={t(
										`Brokers.${x.toLowerCase()}`
									)}
									label={x}
									src={`/${x.toLowerCase()}.png`}
									className="w-[250px]"
									aspectRatio="portrait"
									width={250}
									height={330}
								/>
							</Link>
						))}
					</div>
				</ScrollArea>
			</div>
			<div className="">
				<form action={uploadPortu}>
					<Input type="file" name="file" accept="text/csv" />
					<button type="submit">Odeslat</button>
				</form>
			</div>
		</main>
	)
}
