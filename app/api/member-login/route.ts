import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const validKeys = [
  "NAMELESS-123",
  "PREMIUM-ACCESS",
  "MEMBER-KEY-001",
  "G8D9-VFQ8-KKUH-JPE4",
  "58HQ-9L29-WPYR-MDMD",
];

export async function POST(req: Request) {
  try {
    const { memberKey, discordUser } = await req.json();

    if (!memberKey || typeof memberKey !== "string") {
      return NextResponse.json({ error: "Key required" }, { status: 400 });
    }

    if (!validKeys.includes(memberKey.trim())) {
      return NextResponse.json({ error: "Invalid key" }, { status: 401 });
    }

    const cookieStore = await cookies();

    cookieStore.set("member_session", "active", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("member_name", (discordUser || "Member").trim() || "Member", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}