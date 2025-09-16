import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_USERNAME = "nycthera";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    return NextResponse.json({ error: "Missing GitHub env variables" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `GitHub API error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
