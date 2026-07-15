import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("Contact form submission:", payload);
  return NextResponse.json({ ok: true }, { status: 200 });
}
