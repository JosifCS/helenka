import { CurrencyCode } from "@/types/global"
import { createFormatter } from "next-intl"

/**
 * Format number to selected currency with 4 decimal places.
 * @param number Next.intl `number` function from `useFormatter`.
 * @param value Number value.
 * @param currency ISO 4217 currency code.
 * @param fractionDigits Number of fraction digits. Default value is *2*.
 * @returns Number formatted as money value.
 */
export function money(
	number: ReturnType<typeof createFormatter>["number"],
	value: number,
	currency: CurrencyCode,
	fractionDigits: number = 2
) {
	return number(value, {
		style: "currency",
		currency,
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: fractionDigits,
	})
}
