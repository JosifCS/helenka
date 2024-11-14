import en from "./messages/en.json"

type Messages = typeof en

declare global {
	// Use type safe message keys with `next-intl`
	interface IntlMessages extends Messages {}

	interface StringConstructor {
		/** Ekvivalent prázdného stringu *""*. */
		Empty: string
		/** *\r* */
		CR: string
		/** *\n* */
		LF: string
		/** *r\n* */
		CRLF: string
	}
}
