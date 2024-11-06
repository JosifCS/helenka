import { z } from "zod"

z.setErrorMap((issue, ctx) => {
	if (issue.code === z.ZodIssueCode.too_small) {
		return { message: `tooSmall#${issue.minimum}` }
	}

	if (issue.code === z.ZodIssueCode.too_big) {
		return { message: `tooBig#${issue.maximum}` }
	}

	if (issue.code === z.ZodIssueCode.invalid_string) {
		if (issue.validation === "email") {
			return { message: `invalidEmail` }
		}
	}

	if (issue.code === z.ZodIssueCode.invalid_type) {
		if (issue.received === "undefined") {
			return { message: "required" }
		}
	}

	return { message: ctx.defaultError }
})

export { z }
