export type MovieName = string;

export interface RecommendationItem {
  id?: number | string;
  title: string;
  posterUrl?: string;
  score: number;
}

export interface RecommendResponse {
  recommendations_embd: RecommendationItem[];
  recommendations_bow: RecommendationItem[];
}

