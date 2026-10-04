"use client";

import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";

// A slow, endless ribbon of every skill — speeds down when hovered.
export function InfiniteSliderStrip({ items }: { items: string[] }) {
  return (
    <div className="mt-20 -rotate-1 border-y border-ink/10 bg-ink py-5 text-paper">
      <InfiniteSlider gap={40} speed={40} speedOnHover={15}>
        {items.map((item) => (
          <span key={item} className="flex items-center gap-10 font-display text-3xl italic">
            {item}
            <span className="text-rose">✦</span>
          </span>
        ))}
      </InfiniteSlider>
    </div>
  );
}
