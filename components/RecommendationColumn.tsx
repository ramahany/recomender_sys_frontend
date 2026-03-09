"use client";

import { motion } from "framer-motion";
import type { RecommendationItem } from "@/types/movies";
import { MovieCard } from "./MovieCard";

interface RecommendationColumnProps {
  title: string;
  subtitle: string;
  items: RecommendationItem[];
}

export function RecommendationColumn({
  title,
  subtitle,
  items
}: RecommendationColumnProps) {
  const topItems = items.slice(0, 6);

  return (
    <motion.section
      className="bg-[#050509]/80 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-black/60"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-50 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">
            {title[0]}
          </span>
          {title}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">{subtitle}</p>
      </header>

      {topItems.length === 0 ? (
        <p className="text-xs sm:text-sm text-zinc-500">
          No recommendations yet. Choose a movie to get started.
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {topItems.map((item, index) => (
            <MovieCard
              key={String(item.id ?? item.title ?? index)}
              item={item}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}

