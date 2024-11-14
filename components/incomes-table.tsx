import { Report } from "@/modules/report-builder"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table"
import { useFormatter, useTranslations } from "next-intl"
import { money } from "@/modules/format-utils"

type IncomesTable = {
	incomes: Report["incomeForegin"]
}

export function IncomesTable({ incomes }: IncomesTable) {
	const t = useTranslations("Components.IncomesTable")
	const { dateTime, number } = useFormatter()

	return (
		<Table>
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
							{dateTime(row.dateOut)}
						</TableCell>
						<TableCell className="text-right">
							{money(number, row.income, row.currency, 4)}
						</TableCell>
						<TableCell className="font-medium text-right">
							{money(number, row.incomeCzk, "CZK")}
						</TableCell>
						<TableCell className="w-[100%]">{row.name}</TableCell>
						<TableCell className="font-medium text-right">
							{money(number, row.expenseCzk, "CZK")}
						</TableCell>
						<TableCell className="text-right">
							{money(number, row.expense, row.currency, 4)}
						</TableCell>
						<TableCell className="text-right">???</TableCell>
						<TableCell className="text-center">
							{dateTime(row.dateIn)}
						</TableCell>
						<TableCell className="text-right">
							{number(row.count, {
								maximumFractionDigits: 4,
								minimumFractionDigits: 4,
							})}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
