"use client";

import { useEffect, useState } from "react";
import { AdvocateCard } from "./components/AdvocateCard";

/**
 * TODO
 * - Style homepage
 * - Add type safety to this file
 * - Fix table error
 * - Fix onClick
 * - useSearch custom hook
 * - useAdvocates custom hook
 * - Implement state management
 * - Implement error boundaries for search
 * - Implement Suspense for search
 * - Implement sorting
 * - Look at backend for improvements
 * - Update page metadata for SEO
 * - Enhanced filtering ex. click on "specialty" to filter
 * - Implement server side filtering to leverage cache for all users
 */

// TODO: Implement cache expiration of... however long we'd expect advocates results to stay fresh (1 hour?)
const searchCache: { [key: string]: Advocate[] } = {};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    // Reset search if
    if (!filterValue) return setFilteredAdvocates(advocates);

    const caseAgnosticFilterValue = filterValue.toLowerCase();
    // If search has been done before, display cached results
    if (searchCache[caseAgnosticFilterValue]) {
      console.log(
        `debug: Cache hit on ${caseAgnosticFilterValue}. Setting from cache ${JSON.stringify(
          {
            searchCache,
          }
        )}`
      );
      setFilteredAdvocates(searchCache[caseAgnosticFilterValue]);
    } else {
      // If not cached value is found, filter advocates for partial matches on filter value
      const filteredAdvocates = advocates.filter((advocate) => {
        const advocateValues = Object.values(advocate);
        const isMatching = advocateValues.some((value) =>
          String(value).includes(caseAgnosticFilterValue)
        );
        return isMatching;
      });

      // Cache filtered results
      searchCache[caseAgnosticFilterValue] = filteredAdvocates;

      // Update displayed advocates
      setFilteredAdvocates(filteredAdvocates);
    }
    // Run useEffect when filterValue or advocates list changes
  }, [filterValue, advocates]);

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-6 ">
      <h1 className="font-dmSerifText text-6xl w-100 text-center pb-4">
        Solace Advocates
      </h1>
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="search-input" className="hidden">
          Search
        </label>
        <input
          className="border py-2 px-4 rounded-xl border-amber-900"
          onChange={(e) => setFilterValue(e.target.value)}
          value={filterValue}
          placeholder="Search Advocates"
          id="search-input"
          name="search-input"
        />
        <button
          className="bg-amber-50 border-amber-900 border-2 text-amber-900 py-2 px-4 rounded-xl"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>
      {filteredAdvocates.map((advocate) => {
        return <AdvocateCard key={advocate.id} advocate={advocate} />;
      })}
    </main>
  );
}
