import { CurrencyCode } from "@/types/global"
import { createFormatter } from "next-intl"

/**
 * Format number to selected currency with 4 decimal places.
 * @param number Next.intl `number` function from `useFormatter`.
 * @param value Number value.
 * @param currency ISO 4217 currency code.
 * @returns
 */
export function money(
	number: ReturnType<typeof createFormatter>["number"],
	value: number,
	currency: CurrencyCode
) {
	return number(value, {
		currency,
		maximumFractionDigits: 4,
		minimumFractionDigits: 4,
	})
}
