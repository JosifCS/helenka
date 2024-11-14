import { getTranslations } from "next-intl/server"

export type Translations = Awaited<ReturnType<typeof getTranslations>>

/** Possible values are the ISO 4217 currency codes,
 * such as "USD" for the US dollar or "EUR" for the euro — see
 * the {@link https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes Current currency & funds code list}.  */
export type CurrencyCode = "USD" | "EUR" | "CZK" | "GBP"
