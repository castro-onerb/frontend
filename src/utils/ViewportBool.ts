import { useEffect, useState } from 'react';

export function useViewport(...breakpoints: number[]) {
  const sortedBreakpoints = [...breakpoints].sort((a, b) => b - a);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const matches = sortedBreakpoints.map(bp => viewportWidth < bp);

  const activeBreakpointIndex = matches.findIndex(match => match);

  return {
    viewer: matches,
    activeBreakpointIndex: activeBreakpointIndex === -1 ? null : activeBreakpointIndex,
    breakpoints: sortedBreakpoints
  };
}