"use client";

import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-7 rounded-full bg-accent"
            animate={{
              scaleX: [1, 1.7, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.12
            }}
          />
        ))}
      </div>
      <p className="text-xs sm:text-sm text-zinc-400 tracking-wide uppercase">
        Calculating recommendations
      </p>
    </div>
  );
}

