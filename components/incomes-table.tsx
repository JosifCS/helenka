import { Report } from "@/modules/report-builder"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table"
import { useTranslations } from "next-intl"

type IncomesTable = {
	incomes: Report["incomeForegin"]
}

export function IncomesTable({ incomes }: IncomesTable) {
	const t = useTranslations("Components.IncomesTable")

	return (
		<Table>
			<TableCaption>\t A list</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-center">
						{t("currency")}
					</TableHead>
					<TableHead className="text-center">
						{t("dateOut")}
					</TableHead>
					<TableHead className="text-right">
						{t("salePrice")}
					</TableHead>
					<TableHead className="font-medium text-right">
						{t("incomeCzk")}
					</TableHead>
					<TableHead className="w-[100%]">{t("name")}</TableHead>
					<TableHead className="font-medium text-right">
						{t("expenseCzk")}
					</TableHead>
					<TableHead className="text-right">{t("price")}</TableHead>
					<TableHead className="text-right">{t("saleFee")}</TableHead>
					<TableHead className="text-center">{t("dateIn")}</TableHead>
					<TableHead className="text-right">{t("count")}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{incomes?.map((row, i) => (
					<TableRow key={i}>
						<TableCell className="text-center">
							{row.currency}
						</TableCell>
						<TableCell className="text-center">
							{row.dateOut?.toString()}
						</TableCell>
						<TableCell className="text-right">
							{row.income.toFixed(4)}
						</TableCell>
						<TableCell className="font-medium text-right">
							???
						</TableCell>
						<TableCell className="w-[100%]">{row.name}</TableCell>
						<TableCell className="font-medium text-right">
							???
						</TableCell>
						<TableCell className="text-right">
							{row.expense.toFixed(4)}
						</TableCell>
						<TableCell className="text-right">???</TableCell>
						<TableCell className="text-center">
							{row.dateIn?.toString()}
						</TableCell>
						<TableCell className="text-right">
							{row.count.toFixed(4)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
