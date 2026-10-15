"use client";

import React, { useState, useEffect } from "react";
import { Conference } from "../types";
import { conferenceService } from "../services/conference.service";
import { ConferenceCard } from "./ConferenceCard";
import { NewConferenceModal } from "./NewConferenceModal";
import { InputField, Button, SearchIcon, PlusIcon } from "@/components/ui";

export interface ConferenceListProps {
  initialConferences?: Conference[];
}

export function ConferenceList({ initialConferences }: ConferenceListProps) {
  const [conferences, setConferences] = useState<Conference[]>(initialConferences || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialConferences);

  useEffect(() => {
    if (!initialConferences) {
      conferenceService.getConferences().then((data) => {
        setConferences(data);
        setIsLoading(false);
      });
    }
  }, [initialConferences]);

  const handleConferenceCreated = (newConf: Conference) => {
    setConferences((prev) => [newConf, ...prev]);
  };

  const filteredConferences = conferences.filter((conf) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      conf.name.toLowerCase().includes(q) ||
      conf.acronym.toLowerCase().includes(q) ||
      conf.city.toLowerCase().includes(q) ||
      conf.country?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Control Bar: Search Input (left) & New Conference Button (right) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Search input (matching Figma 352px width with complete round radius) */}
        <div className="w-full sm:w-[352px]">
          <InputField
            id="conference-search"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full pl-5 pr-11"
            rightElement={<SearchIcon className="w-5 h-5 text-[#91949D]" />}
          />
        </div>

        {/* Action Button: "New Conference" (hugs text with matching icon size) */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-auto px-5 h-11 shrink-0 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Conference</span>
        </Button>
      </div>

      {/* Grid of Conference Cards */}
      {isLoading ? (
        <div className="py-20 flex justify-center text-slate-400 text-sm">
          Loading conferences...
        </div>
      ) : filteredConferences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredConferences.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="py-16 text-center bg-white/60 rounded-2xl border border-dashed border-slate-200 p-8">
          <p className="text-base font-medium text-slate-700">No conferences found</p>
          <p className="text-sm text-slate-500 mt-1">
            {searchQuery
              ? `No conferences match "${searchQuery}". Try a different keyword.`
              : "You have not been assigned to any conferences yet."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm text-[#4F46E5] font-medium hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>
      )}

      {/* Modal Dialog for creating a new conference */}
      <NewConferenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConferenceCreated={handleConferenceCreated}
      />
    </div>
  );
}

