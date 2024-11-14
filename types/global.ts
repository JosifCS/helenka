import { getTranslations } from "next-intl/server"

export type Translations = Awaited<ReturnType<typeof getTranslations>>

/** Possible values are the ISO 4217 currency codes,
 * such as "USD" for the US dollar or "EUR" for the euro — see
 * the {@link https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes Current currency & funds code list}.  */
export type CurrencyCode = "USD" | "EUR" | "CZK" | "GBP"

/**
 * A type for easy definition of Page or Layout parameters. In the KEYS type parameter,
 * just enter a list of expected `params` parameters.
 * Plus the type contains a general definition of `searchParams`.
 *
 * @example
 * type Props = PageProps<"id" | "name">
 * // Result:
 * // {
 * //   params: Promise<{ id: string; name: string }>;
 * //   searchParams: Promise<Record<string, string | string[] | undefined>>;
 * // }
 */
export type PageProps<KEYS extends keyof any = string> = {
	params: Promise<{ [P in KEYS]: string }>
	searchParams: Promise<Record<string, string | string[] | undefined>>
}
