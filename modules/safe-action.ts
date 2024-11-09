import {
	DEFAULT_SERVER_ERROR_MESSAGE,
	createSafeActionClient,
} from "next-safe-action"
import { getUser } from "./auth"

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
	defaultValidationErrorsShape: "flattened",
	handleServerError(e) {
		if (e instanceof ActionError) {
			return e.message
		}

		if (process.env.NODE_ENV === "development") {
			console.log(e)
		}

		return DEFAULT_SERVER_ERROR_MESSAGE
	},
})

export const authActionClient = actionClient.use(
	async ({ next /*, metadata*/ }) => {
		return next({ ctx: { user: await getUser() } })
	}
)
