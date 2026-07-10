import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ENVIA_BASE_URL =
    process.env.ENVIA_API_ENV === "production"
      ? "https://api.envia.com"
      : "https://api-test.envia.com";

  const apiKey = process.env.ENVIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta configurar ENVIA_API_KEY en .env.local" },
      { status: 500 }
    );
  }

  const trackingNumber = request.nextUrl.searchParams.get("trackingNumber");
  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Falta el parámetro trackingNumber" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${ENVIA_BASE_URL}/ship/track/?trackingNumber=${encodeURIComponent(
        trackingNumber
      )}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Envia.com track error (${response.status}): ${text}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 502 }
    );
  }
}
