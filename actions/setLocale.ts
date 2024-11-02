"use server";

import { cookies } from "next/headers";

export async function setLocale(locale: "en" | "cs") {
	const cs = await cookies();
	cs.set("locale", locale);
}
