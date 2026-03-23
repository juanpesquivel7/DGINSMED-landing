import { NextRequest, NextResponse } from "next/server";

const ANDREANI_BASE_URL = "https://apis.andreani.com";
// Origin postal code (your warehouse/store)
const ORIGIN_POSTAL_CODE = "1414";
const CONTRACT_NUMBER = process.env.ANDREANI_CONTRACT || "AND00001";

async function getAndreaniToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.ANDREANI_USER}:${process.env.ANDREANI_PASSWORD}`
  ).toString("base64");

  const res = await fetch(`${ANDREANI_BASE_URL}/login`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Andreani auth failed: ${res.status}`);
  }

  // Andreani returns the token in the x-authorization-token header
  const token = res.headers.get("x-authorization-token");
  if (!token) throw new Error("No token received from Andreani");
  return token;
}

export async function POST(req: NextRequest) {
  try {
    const { postalCode, weight } = await req.json();

    if (!postalCode || !weight) {
      return NextResponse.json(
        { error: "Código postal y peso son requeridos." },
        { status: 400 }
      );
    }

    const cpNumeric = postalCode.replace(/\D/g, "");
    if (cpNumeric.length < 4) {
      return NextResponse.json(
        { error: "Código postal inválido." },
        { status: 400 }
      );
    }

    // Check if Andreani credentials are configured
    if (!process.env.ANDREANI_USER || !process.env.ANDREANI_PASSWORD) {
      // Return a placeholder price for development
      const placeholderPrice = Math.floor(Math.random() * 2000) + 2500;
      return NextResponse.json({
        price: placeholderPrice,
        estimatedDays: "3 a 7 días hábiles",
        service: "Andreani Estándar (simulado)",
      });
    }

    const token = await getAndreaniToken();

    const quoteRes = await fetch(`${ANDREANI_BASE_URL}/v2/tarifas`, {
      method: "POST",
      headers: {
        "x-authorization-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contrato: CONTRACT_NUMBER,
        origen: {
          codigoPostal: ORIGIN_POSTAL_CODE,
        },
        destino: {
          codigoPostal: cpNumeric,
        },
        bultos: [
          {
            kilos: Math.max(weight / 1000, 0.1),
            largo: 30,
            ancho: 20,
            alto: 15,
            volumen: 9000,
          },
        ],
      }),
    });

    if (!quoteRes.ok) {
      throw new Error(`Andreani quote failed: ${quoteRes.status}`);
    }

    const quoteData = await quoteRes.json();

    // Parse Andreani response
    const tarifa = quoteData?.[0];
    if (!tarifa) throw new Error("No se recibió tarifa de Andreani");

    return NextResponse.json({
      price: Math.ceil(tarifa.tarifaConIva || tarifa.tarifa || 0),
      estimatedDays: `${tarifa.plazoEntrega || "3 a 7"} días hábiles`,
      service: tarifa.modalidad || "Andreani Estándar",
    });
  } catch (error) {
    console.error("[andreani-quote] Error:", error);
    // Fallback: return a placeholder on error
    return NextResponse.json(
      { error: "No se pudo cotizar el envío. Por favor, contactanos." },
      { status: 500 }
    );
  }
}
