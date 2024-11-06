import { redirect } from "next/navigation"

// TODO Ověřování přihlášeního uživatele
/**
 * Ověřování přihlášeního uživatele.
 * @todo **Teď je to jen nicnedělající funkce!** Přidat logiku na ověřování. Nějaký jednoduchý systém pro správu uživatelů.
 */
export async function getUser() {
	const access_token = "DEMO TOKEN"

	if (access_token == null) return redirect("/login")

	if (access_token != "DEMO TOKEN") return redirect("/login")

	return { id: 1, neme: "Demo User" }
}
