import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
	const cs = await cookies();

	const locale = cs.get("locale")?.value ?? "en";
	console.log("LOC", cs.get("locale"));

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
