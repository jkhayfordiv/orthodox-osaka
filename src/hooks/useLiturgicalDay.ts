'use client';

import { useState, useEffect } from 'react';
import { DayInfo } from '../lib/types';
import { getDayInfo } from '../lib/calendarEngine';

export function useLiturgicalDay(date: Date) {
  // Start with synchronous local baseline
  const [dayInfo, setDayInfo] = useState<DayInfo>(() => getDayInfo(date));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Immediate local baseline
    const baseInfo = getDayInfo(date);
    setDayInfo(baseInfo);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // Try reading from cache
    try {
      const cached = localStorage.getItem(`ortho_day_${dateStr}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        // Merge cached saints & readings into baseInfo
        if (parsed.saints && parsed.saints.length > 0) {
          baseInfo.saints = parsed.saints.map((sName: string) => ({
            name: { ja: sName, en: sName, ru: sName },
          }));
        }
        setDayInfo({ ...baseInfo });
      }
    } catch {}

    // Fetch from internal API route
    let isCancelled = false;
    setLoading(true);

    fetch(`/api/calendar/${dateStr}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isCancelled || !data || !data.success) return;

        // If Orthocal provided rich readings
        if (data.readings && data.readings.length > 0) {
          const apiReadings = data.readings.map((r: any) => ({
            source: r.source,
            book: r.book,
            reference: r.reference,
            text: {
              ja: r.fullTextEn, // fallback or mapped
              en: r.fullTextEn,
              ru: r.fullTextEn,
            },
            verses: r.verses,
          }));

          // Cache locally
          try {
            localStorage.setItem(
              `ortho_day_${dateStr}`,
              JSON.stringify({ saints: data.saints, readings: data.readings })
            );
          } catch {}

          setDayInfo((prev) => ({
            ...prev,
            tone: data.tone > 0 ? data.tone : prev.tone,
          }));
        }
      })
      .catch(() => {
        // Network failure / offline: keep local baseline
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [date]);

  return { dayInfo, loading };
}
