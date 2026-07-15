import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/auth";
import { addCaseStudy, deleteCaseStudy, getCaseStudies } from "@/lib/kv";

function isAuthed(request: NextRequest): boolean {
  return isValidSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const caseStudies = await getCaseStudies();
  return NextResponse.json({ caseStudies });
}

export async function POST(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, href, result } = await request.json();

  if (
    typeof name !== "string" ||
    typeof href !== "string" ||
    typeof result !== "string" ||
    !name.trim() ||
    !result.trim()
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    new URL(href);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const caseStudies = await addCaseStudy({
      name: name.trim(),
      href: href.trim(),
      result: result.trim(),
    });
    return NextResponse.json({ caseStudies });
  } catch {
    return NextResponse.json(
      { error: "Storage isn't configured yet — set UPSTASH_REDIS_REST_URL/TOKEN." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  if (typeof id !== "string") {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const caseStudies = await deleteCaseStudy(id);
    return NextResponse.json({ caseStudies });
  } catch {
    return NextResponse.json(
      { error: "Storage isn't configured yet — set UPSTASH_REDIS_REST_URL/TOKEN." },
      { status: 500 }
    );
  }
}
