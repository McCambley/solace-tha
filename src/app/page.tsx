"use client";

import { useEffect, useState } from "react";

/**
 * TODO
 * - Style homepage
 * - Add type safety to this file
 * - Fix table error
 * - Fix onClick
 * - Implement sorting
 * - Look at backend for improvements
 * - Update page metadata for SEO
 * - Enhanced filtering ex. click on "specialty" to filter
 * - Implement server side filtering to leverage cache for all users
 */

// TODO: Implement cache expiration of... however long we'd expect advocates results to stay fresh (1 hour?)
const searchCache = {};

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [filterValue, setFilterValue] = useState("");

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
    const caseAgnosticFilterValue = filterValue.toLowerCase();
    // If search has been done before, display cached results
    if (searchCache[caseAgnosticFilterValue]) {
      console.log(
        `debug: Cache hit on ${caseAgnosticFilterValue}. Setting from cache`
      );
      setFilteredAdvocates(searchCache[caseAgnosticFilterValue]);
    } else {
      // If not cached value is found, filter advocates for partial matches on filter value
      const filteredAdvocates = advocates.filter((advocate) => {
        const stringifiedAdvocate = JSON.stringify(advocate).toLowerCase();
        const isMatching = stringifiedAdvocate.includes(
          caseAgnosticFilterValue
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
    <main style={{ margin: "24px" }}>
      <h1 className="font-dmSerifText text-6xl">Solace Advocates</h1>
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          className="border"
          onChange={(e) => setFilterValue(e.target.value)}
          value={filterValue}
        />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
