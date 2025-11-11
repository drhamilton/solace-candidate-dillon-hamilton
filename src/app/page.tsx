"use client";

import { useEffect, useState, useRef } from "react";
import { SpecialtyTag } from "./components/SpecialtyTag";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

const initialAdvocates: Advocate[] = [];
const DEBOUNCE_DELAY = 300;
const ADVOCATE_API_URL = "/api/advocates";
const NUM_SPECIALTIES_DISPLAYED = 3;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>(initialAdvocates);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch(ADVOCATE_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }
        return response.json();
      })
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching advocates:", error);
        setAdvocates([]);
      });

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const performSearch = (term: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const url = term
        ? `${ADVOCATE_API_URL}?search=${encodeURIComponent(term)}`
        : ADVOCATE_API_URL;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Search request failed");
          }
          return response.json();
        })
        .then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
        })
        .catch((error) => {
          console.error("Error searching advocates:", error);
          setAdvocates([]);
        });
    }, DEBOUNCE_DELAY);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);
  };

  const handleSpecialtyClick = (specialty: string) => {
    setSearchTerm(specialty);
    performSearch(specialty);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Solace Advocates
        </h1>

        <div className="mb-6">
          <label htmlFor="advocate-search" className="sr-only">
            Search advocates
          </label>
          <input
            id="advocate-search"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
            placeholder="Search for advocates by name, city, degree, specialty, or experience"
            type="text"
            onChange={onChange}
            value={searchTerm}
            aria-label="Search advocates by name, city, degree, specialty, or experience"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="min-w-full divide-y divide-gray-200"
              aria-label="Advocates directory"
            >
              <caption className="sr-only">
                List of available advocates with their specialties and contact information
              </caption>
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Degree
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Years of Experience
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {advocates.map((advocate) => {
                  const uniqueKey = `${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`;
                  return (
                    <tr key={uniqueKey} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {advocate.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {advocate.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {advocate.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {advocate.degree}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          {advocate.specialties
                            .slice(0, NUM_SPECIALTIES_DISPLAYED)
                            .map((s) => (
                              <SpecialtyTag
                                onClick={() => handleSpecialtyClick(s)}
                                specialty={s}
                                key={s}
                              />
                            ))}
                          {advocate.specialties.length >
                            NUM_SPECIALTIES_DISPLAYED && (
                            <div className="text-xs text-gray-500 mt-1">
                              +
                              {advocate.specialties.length -
                                NUM_SPECIALTIES_DISPLAYED}{" "}
                              more
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {advocate.yearsOfExperience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {advocate.phoneNumber}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {advocates.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No advocates found
          </div>
        )}
      </div>
    </main>
  );
}
