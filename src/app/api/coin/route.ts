import { NextResponse } from "next/server";

type CoinPayload = {
  price: number;
  delta: number;
  currency: "USD";
  stale: boolean;
};

const FALLBACK: CoinPayload = {
  price: 248.92,
  delta: 0.0,
  currency: "USD",
  stale: true,
};

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300",
};

export async function GET() {
  try {
    const res = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/COIN?interval=1d&range=1d",
      {
        next: { revalidate: 300 },
        headers: {
          // Yahoo sometimes 401s requests without a UA.
          "User-Agent":
            "Mozilla/5.0 (compatible; portfolio-ticker/1.0; +https://gabrieltaveira.com)",
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(FALLBACK, { status: 200, headers: CACHE_HEADERS });
    }

    const json = (await res.json()) as {
      chart?: {
        result?: Array<{
          meta?: {
            regularMarketPrice?: number;
            previousClose?: number;
            chartPreviousClose?: number;
          };
        }>;
        error?: unknown;
      };
    };

    const meta = json?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    const prev = meta?.previousClose ?? meta?.chartPreviousClose;

    if (typeof price !== "number" || typeof prev !== "number" || prev === 0) {
      return NextResponse.json(FALLBACK, { status: 200, headers: CACHE_HEADERS });
    }

    const delta = ((price - prev) / prev) * 100;

    const payload: CoinPayload = {
      price: Number(price.toFixed(2)),
      delta: Number(delta.toFixed(2)),
      currency: "USD",
      stale: false,
    };

    return NextResponse.json(payload, { status: 200, headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json(FALLBACK, { status: 200, headers: CACHE_HEADERS });
  }
}
