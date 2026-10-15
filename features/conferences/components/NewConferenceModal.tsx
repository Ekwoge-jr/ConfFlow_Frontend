"use client";

import React, { useState } from "react";
import { Modal, InputField, Button } from "@/components/ui";
import { conferenceService } from "../services/conference.service";
import { Conference } from "../types";

export interface NewConferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConferenceCreated: (newConf: Conference) => void;
}

export function NewConferenceModal({
  isOpen,
  onClose,
  onConferenceCreated,
}: NewConferenceModalProps) {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [venue, setVenue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !startDate || !endDate || !city) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const created = await conferenceService.createConference({
        name,
        acronym,
        startDate,
        endDate,
        city,
        country,
        venue,
      });

      onConferenceCreated(created);
      onClose();
      // Reset form
      setName("");
      setAcronym("");
      setStartDate("");
      setEndDate("");
      setCity("");
      setCountry("");
      setVenue("");
    } catch {
      setError("Failed to create conference. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Conference"
      description="Configure event branding, venue, and operating dates."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {error && (
          <div className="p-3 text-xs rounded-lg bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <InputField
          id="conf-name"
          label="Conference Name *"
          placeholder="e.g. Data Science Africa 2027"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-3">
          <InputField
            id="conf-acronym"
            label="Acronym"
            placeholder="e.g. DSA 2027"
            value={acronym}
            onChange={(e) => setAcronym(e.target.value)}
            disabled={isLoading}
          />
          <InputField
            id="conf-city"
            label="City *"
            placeholder="e.g. Yaounde"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InputField
            id="conf-start-date"
            type="date"
            label="Start Date *"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            disabled={isLoading}
          />
          <InputField
            id="conf-end-date"
            type="date"
            label="End Date *"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <InputField
          id="conf-country"
          label="Country"
          placeholder="e.g. Cameroon"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Conference
          </Button>
        </div>
      </form>
    </Modal>
  );
}

