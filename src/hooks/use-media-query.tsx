import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  const matchQuery = window.matchMedia(query);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    setMatches(matchQuery.matches);

    function handleChange(e: any) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
