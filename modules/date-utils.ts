const PORTU_FORMAT = /^(?<date>\d{1,2})\.(?<month>\d{1,2})\.(?<year>\d{4})$/
const ETORO_FORMAT =
	/^(?<date>\d{1,2})\/(?<month>\d{1,2})\/(?<year>\d{4}) (?<hours>\d{1,2}):(?<minutes>\d{1,2}):(?<seconds>\d{1,2})$/

/**
 * Parsing date and time. Using local time. Performs trimming.
 * @param value String value can be of the form *DD.MM.YYYY* or *DD/MM/YYYY HH:mm:ss*.
 * @returns Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC or *null*.
 */
export function parseDate(value: Date | string | number) {
	if (value instanceof Date) return value.getTime()
	if (typeof value === "number") return value

	value = value.trim()

	if (PORTU_FORMAT.test(value)) {
		const match = value.match(PORTU_FORMAT)
		if (match == null || match.groups == undefined) return null
		return new Date(
			+match.groups.year,
			+match.groups.month - 1,
			+match.groups.date
		).getTime()
	}
	if (ETORO_FORMAT.test(value)) {
		const match = value.match(ETORO_FORMAT)
		if (match == null || match.groups == undefined) return null
		return new Date(
			+match.groups.year,
			+match.groups.month - 1,
			+match.groups.date,
			+match.groups.hours,
			+match.groups.minutes,
			+match.groups.seconds
		).getTime()
	}
	return null
}
