import React, { useState } from "react";

interface Props {
  advocate: Advocate;
}
export const AdvocateCard = ({ advocate }: Props) => {
  const {
    firstName,
    lastName,
    city,
    degree,
    specialties = [],
    yearsOfExperience,
    phoneNumber,
  } = advocate;
  const [displayedSpecialties, setDisplayedSpecialties] = useState(
    specialties.slice(0, 3)
  );
  const [viewingMore, setViewingMore] = useState(false);

  const viewAll = () => {
    setViewingMore(true);
    setDisplayedSpecialties(advocate.specialties);
  };

  const viewLess = () => {
    setViewingMore(false);
    setDisplayedSpecialties(advocate.specialties.slice(0, 3));
  };
  return (
    <a
      href={`https://example.com/${firstName}-${lastName}`}
      target="_blank"
      className="shadow-lg rounded-xl transition hover:shadow-xl p-6 flex flex-col justify-between border-amber-900 border-[1px]"
    >
      <div>
        <div className="flex gap-4 pb-4 items-center">
          <div className="h-12 w-12 rounded-full flex items-center justify-center border-amber-900 border">
            🙂
          </div>
          <div>
            <p className="text-xl">
              {firstName} {lastName}{" "}
              <span className="text-gray-400">{degree}</span>
            </p>
            <p className="italic">{city}</p>
          </div>
        </div>
        <p className="text-amber-900 pb-4">
          {displayedSpecialties.join(", ")}{" "}
          {viewingMore ? (
            <button className="underline inline" onClick={viewLess}>
              view less
            </button>
          ) : (
            <button
              onClick={viewAll}
              className={
                advocate.specialties.length < 4 ? "hidden" : "underline"
              }
            >
              view more
            </button>
          )}
        </p>
      </div>
      <p className="text-gray-400">
        Active since {new Date().getFullYear() - yearsOfExperience}
      </p>
    </a>
  );
};
