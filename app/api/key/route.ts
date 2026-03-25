import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "keys.json");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = (searchParams.get("key") || "").trim();

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const found = data.find((k: any) => String(k.key).trim() === key);

  if (!found) {
    return NextResponse.json({ error: "Invalid key" }, { status: 404 });
  }

  return NextResponse.json(found);
}