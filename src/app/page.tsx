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
    fetch(ADVOCATE_API_URL).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const performSearch = (term: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const url = term
        ? `${ADVOCATE_API_URL}?search=${encodeURIComponent(term)}`
        : ADVOCATE_API_URL;

      fetch(url).then((response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
        });
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
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
            placeholder="Search for advocates by name, city, degree, specialty, or experience"
            type="text"
            onChange={onChange}
            value={searchTerm}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Degree
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Years of Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {advocates.map((advocate, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-50">
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
                            .map((s, i) => (
                              <SpecialtyTag
                                onClick={() => handleSpecialtyClick(s)}
                                specialty={s}
                                key={i}
                              />
                            ))}
                          {advocate.specialties.length > 5 && (
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
