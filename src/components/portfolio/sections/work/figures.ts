import { getMozeicDownloads } from "../projects/npm";
import { DID_APP } from "./data";

/** D-ID's US App Store rating, refreshed daily, `DID_APP` when Apple doesn't answer. */
const getRating = async () => {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${DID_APP.id}&country=us`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) throw new Error(`itunes ${res.status}`);
    const body = (await res.json()) as {
      results?: { averageUserRating?: unknown; userRatingCount?: unknown }[];
    };
    const { averageUserRating: rating, userRatingCount: ratings } =
      body.results?.[0] ?? {};
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      throw new Error("itunes: no rating");
    }
    if (typeof ratings !== "number" || ratings < 1) {
      throw new Error("itunes: no count");
    }
    return { rating, ratings };
  } catch {
    return { rating: DID_APP.rating, ratings: DID_APP.ratings };
  }
};

/**
 * The live numbers inside work and services copy, as the copy prints them:
 * the rating to one decimal the way the store rounds it ("4.6"), the count
 * compact ("3.4K", "3,4 mil"), and Mozeic floored to the thousand for "177k+".
 * `stars` is the rating as a number, for the star badge.
 */
export const getFigures = async (locale: string) => {
  const [{ rating, ratings }, mozeic] = await Promise.all([
    getRating(),
    getMozeicDownloads(),
  ]);
  const stars = Math.round(rating * 10) / 10;
  return {
    stars,
    params: {
      rating: new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(stars),
      ratings: new Intl.NumberFormat(locale, {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(ratings),
      mozeic: new Intl.NumberFormat(locale).format(Math.floor(mozeic / 1000)),
    },
  };
};
