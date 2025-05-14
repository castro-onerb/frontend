import { Children, useState, useEffect, type ReactNode } from "react";

interface IHeroRootProps {
  children?: ReactNode;
  autoPlay?: boolean;
  interval?: number;
}

export function HeroRoot({ children, autoPlay = true, interval = 3000 }: IHeroRootProps) {
  const cards = Children.toArray(children);
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, interval);
    return () => clearInterval(id);
  }, [current, autoPlay, interval, cards.length]);

  return (
    <div className="relative flex-1 overflow-hidden rounded-4xl bg-primary-500 m-5">
      {/* Viewport */}
      <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
        {cards.map((card, index) => (
          <div key={index} className="flex w-full h-full flex-shrink-0 bg-pink-500">
            {card}
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === current ? 'bg-white scale-125 w-6' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
