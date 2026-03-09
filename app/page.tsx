"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { RecommendationColumn } from "@/components/RecommendationColumn";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { fetchMovieList, fetchRecommendations } from "@/services/api";
import type { RecommendationItem } from "@/types/movies";

export default function HomePage() {
  const [movies, setMovies] = useState<string[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [embdRecs, setEmbdRecs] = useState<RecommendationItem[]>([]);
  const [bowRecs, setBowRecs] = useState<RecommendationItem[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoadingMovies(true);
        const list = await fetchMovieList();
        setMovies(list);
      } catch (e) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoadingMovies(false);
      }
    };

    loadMovies();
  }, []);

  const handleSelectMovie = async (movie: string) => {
    try {
      setError(null);
      setSelectedMovie(movie);
      setLoadingRecs(true);
      const res = await fetchRecommendations(movie);
      setEmbdRecs(res.recommendations_embd ?? []);
      setBowRecs(res.recommendations_bow ?? []);
    } catch (e) {
      setError("Failed to load recommendations. Please try again.");
      setEmbdRecs([]);
      setBowRecs([]);
    } finally {
      setLoadingRecs(false);
    }
  };

  const isLoading = loadingMovies || loadingRecs;

  return (
    <motion.main
      className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-12 lg:py-14 flex items-stretch justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl flex flex-col gap-8">
        <header className="flex flex-col gap-4 sm:gap-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-accent/80">
              R4M4 Recommendation System
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-50">
              Movie recommendations,{" "}
              <span className="bg-gradient-to-r from-accent to-accentSecondary bg-clip-text text-transparent">
                powered by embeddings
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Compare embedding-based vs bag-of-words recommendations side by side.
            </p>
          </div>

          <SearchBar
            movies={movies}
            onSelectMovie={handleSelectMovie}
            loading={loadingRecs}
          />

          {selectedMovie && (
            <p className="text-xs sm:text-sm text-zinc-500">
              Showing recommendations for{" "}
              <span className="font-semibold text-zinc-200">
                {selectedMovie}
              </span>
            </p>
          )}

          {error && (
            <p className="text-xs sm:text-sm text-rose-400 bg-rose-950/40 border border-rose-900/60 px-3 py-2 rounded-lg w-fit">
              {error}
            </p>
          )}
        </header>

        {isLoading && <LoadingAnimation />}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <RecommendationColumn
            title="Embedding Recommendations"
            subtitle=""
            items={embdRecs}
          />
          <RecommendationColumn
            title="Bag of Words Recommendations"
            subtitle=""
            items={bowRecs}
          />
        </section>
      </div>
    </motion.main>
  );
}

