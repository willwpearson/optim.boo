import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const headersList = await headers();
    const referer = headersList.get("referer");

    if (referer !== process.env.NEXT_PUBLIC_BASE_URL + "/") {
        return NextResponse.json({ access: false });
    } else {
        return NextResponse.json({ access: true });
    }
}