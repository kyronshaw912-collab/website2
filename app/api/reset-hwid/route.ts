import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "keys.json");

export async function POST(req: Request) {
  const body = await req.json();
  const { key } = body;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const index = data.findIndex((k: any) => k.key === key);

  if (index === -1) {
    return NextResponse.json({ error: "Invalid key" }, { status: 404 });
  }

  if (data[index].hwidResetCount <= 0) {
    return NextResponse.json({ error: "No resets left" }, { status: 400 });
  }

  data[index].hwid = null;
  data[index].hwidLocked = false;
  data[index].hwidResetCount -= 1;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}