import type { MovieName, RecommendResponse } from "@/types/movies";

const BASE_URL = "/api";

function normalizeRecommendationItems(input: unknown) {
  if (!Array.isArray(input)) return [];

  return input
    .map((raw) => {
      if (typeof raw === "string") {
        return { title: raw, score: 0, posterUrl: undefined, id: raw };
      }

      if (raw && typeof raw === "object") {
        const r = raw as Record<string, unknown>;
        const title =
          (typeof r.title === "string" && r.title) ||
          (typeof r.movie_name === "string" && r.movie_name) ||
          (typeof r.name === "string" && r.name) ||
          "";

        const score =
          typeof r.score === "number"
            ? r.score
            : typeof r.score === "string"
              ? Number(r.score)
              : 0;

        const posterUrl =
          (typeof r.posterUrl === "string" && r.posterUrl) ||
          (typeof r.poster === "string" && r.poster) ||
          undefined;

        const id =
          (typeof r.id === "number" || typeof r.id === "string" ? r.id : undefined) ??
          (typeof r.movie_id === "number" || typeof r.movie_id === "string"
            ? r.movie_id
            : undefined);

        if (!title) return null;

        return {
          id,
          title,
          score: Number.isFinite(score) ? score : 0,
          posterUrl
        };
      }

      return null;
    })
    .filter((v): v is { id?: number | string; title: string; score: number; posterUrl?: string } =>
      Boolean(v)
    );
}

export async function fetchMovieList(): Promise<MovieName[]> {
  const res = await fetch(`${BASE_URL}/listmovies`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to load movie list");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : data.movies ?? [];
}

export async function fetchRecommendations(
  movieName: MovieName
): Promise<RecommendResponse> {
  const encoded = encodeURIComponent(movieName);
  const res = await fetch(`${BASE_URL}/recommend/${encoded}`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to load recommendations");
  }

  const data = await res.json();
  return {
    recommendations_embd: normalizeRecommendationItems(data?.recommendations_embd),
    recommendations_bow: normalizeRecommendationItems(data?.recommendations_bow)
  };
}

