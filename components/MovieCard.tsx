"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { RecommendationItem } from "@/types/movies";

interface MovieCardProps {
  item: RecommendationItem;
  index: number;
}

export function MovieCard({ item, index }: MovieCardProps) {
  const scoreDisplay = item.score.toFixed(3);

  return (
    <motion.div
      className="group bg-card rounded-xl p-3 sm:p-4 border border-zinc-800/80 shadow-lg shadow-black/50 hover:shadow-purple-glow transition-all cursor-pointer flex gap-3 sm:gap-4"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{
        scale: 1.03
      }}
    >
      <div className="relative h-20 w-14 sm:h-28 sm:w-20 overflow-hidden rounded-lg bg-zinc-900/80 flex-shrink-0">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          {item.posterUrl ? (
            <Image
              src={item.posterUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-zinc-500 bg-gradient-to-br from-zinc-900 to-zinc-800">
              No Poster
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent/80 mb-1">
            Movie
          </p>
          <h3 className="text-sm sm:text-base font-semibold text-zinc-50 line-clamp-2">
            {item.title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] sm:text-xs text-zinc-400">
            Score{" "}
            <span className="font-mono text-accentSecondary font-semibold">
              {scoreDisplay}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

