import { redirect } from "next/navigation"

export async function GET() {
	return redirect("/dashboard/reports")
}
