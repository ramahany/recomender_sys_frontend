"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  movies: string[];
  onSelectMovie: (movie: string) => void;
  loading: boolean;
}

export function SearchBar({ movies, onSelectMovie, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!(event.target instanceof Node)) return;
      if (!containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const suggestions = useMemo(() => {
    if (!query) return movies.slice(0, 8);
    const lower = query.toLowerCase();
    return movies
      .filter((m) => m.toLowerCase().includes(lower))
      .slice(0, 8);
  }, [movies, query]);

  const handleSelect = (movie: string) => {
    setQuery(movie);
    setIsFocused(false);
    onSelectMovie(movie);
  };

  return (
    <div ref={containerRef} className="relative max-w-2xl w-full">
      <label className="block text-sm font-medium text-zinc-400 mb-2">
        Pick a movie to get recommendations
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search movies..."
          className="w-full rounded-xl bg-[#111118] border border-zinc-800/80 px-4 py-3 pr-24 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 transition-all"
        />
        <button
          type="button"
          disabled={loading || !query}
          onClick={() => query && handleSelect(query)}
          className="absolute inset-y-1 right-1 px-4 rounded-lg bg-accent text-xs font-semibold uppercase tracking-wide text-white disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? "Loading..." : "Recommend"}
        </button>
      </div>

      {isFocused && suggestions.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="absolute z-20 mt-2 w-full max-h-64 overflow-y-auto rounded-xl bg-[#050509] border border-zinc-800/90 shadow-2xl shadow-purple-500/30 backdrop-blur-md"
        >
          {suggestions.map((movie) => (
            <li key={movie}>
              <button
                type="button"
                onClick={() => handleSelect(movie)}
                className="w-full text-left px-4 py-2.5 text-sm text-zinc-100 hover:bg-zinc-900/80 hover:text-white transition-colors"
              >
                {movie}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

