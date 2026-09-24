import { ArchivedSermon } from '../data/sermonsArchive';
import { Locale } from './types';

/**
 * Returns the current date and time converted to Japan Standard Time (JST, UTC+9).
 */
export function getJapanTime(baseDate: Date = new Date()): Date {
  const utcMs = baseDate.getTime() + baseDate.getTimezoneOffset() * 60 * 1000;
  return new Date(utcMs + 9 * 60 * 60 * 1000);
}

/**
 * Calculates the exact moment a sermon becomes available to the general public online.
 * Rule: Sermons for Sunday are released to the public on the preceding Saturday morning at 06:00 JST.
 * For any other day, it is released on the preceding day at 06:00 JST (or that day at 06:00 JST).
 */
export function getSermonPublicReleaseDate(sermonDateStr: string): Date {
  const parts = sermonDateStr.split('-');
  if (parts.length !== 3) {
    return new Date(0);
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0-indexed
  const day = parseInt(parts[2], 10);

  // Construct UTC date for midnight of sermon day
  const targetDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
  const dayOfWeek = targetDate.getUTCDay(); // 0 = Sunday

  // Release time is Saturday 06:00 JST (which is Friday 21:00 UTC)
  // 06:00 JST = 21:00 UTC on previous calendar day
  const releaseUtc = new Date(Date.UTC(year, month, day, 6 - 9, 0, 0));
  if (dayOfWeek === 0) {
    // If sermon is for Sunday, release is Saturday morning 06:00 JST
    releaseUtc.setUTCDate(releaseUtc.getUTCDate() - 1);
  }
  return releaseUtc;
}

/**
 * Checks whether a given sermon is available online for public view (without admin password).
 */
export function isSermonAvailableToPublic(sermon: ArchivedSermon, now: Date = new Date()): boolean {
  if (!sermon.date) return true;
  const releaseDateUtc = getSermonPublicReleaseDate(sermon.date);
  return now.getTime() >= releaseDateUtc.getTime();
}

/**
 * Determines which sermon should be linked by the "Read Fr. George's Sunday Sermon" button
 * on the app's "Today" page.
 *
 * Rule:
 * The button points back to the PREVIOUS Sunday's sermon until Sunday at 10:00 AM Japan Time,
 * at which point it updates to the CURRENT week's sermon.
 */
export function getEffectiveSundaySermon(
  sermons: ArchivedSermon[],
  lang: Locale = 'ja',
  now: Date = new Date()
): ArchivedSermon | undefined {
  // Compute JST date components: UTC milliseconds + 9 hours
  const jstMs = now.getTime() + 9 * 60 * 60 * 1000;
  const jstDate = new Date(jstMs);
  const dayOfWeek = jstDate.getUTCDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hours = jstDate.getUTCHours();

  const activeSunday = new Date(jstDate);
  if (dayOfWeek === 0) {
    if (hours < 10) {
      // Sunday before 10:00 AM JST -> point to previous Sunday
      activeSunday.setUTCDate(activeSunday.getUTCDate() - 7);
    }
  } else {
    // Monday through Saturday -> point to the most recent past Sunday
    activeSunday.setUTCDate(activeSunday.getUTCDate() - dayOfWeek);
  }

  const y = activeSunday.getUTCFullYear();
  const m = String(activeSunday.getUTCMonth() + 1).padStart(2, '0');
  const d = String(activeSunday.getUTCDate()).padStart(2, '0');
  const activeSundayStr = `${y}-${m}-${d}`;

  // Find the sermon for this language that matches or is closest prior to activeSundayStr
  const langSermons = sermons
    .filter((s) => s.language === lang)
    .sort((a, b) => b.date.localeCompare(a.date));

  const match = langSermons.find((s) => s.date <= activeSundayStr);
  return match || langSermons[0] || sermons[0];
}

/**
 * Filters sermons based on admin status.
 * If user is not admin, future sermons not yet released (until Saturday 06:00 JST) are hidden.
 */
export function filterVisibleSermons(
  sermons: ArchivedSermon[],
  isAdmin: boolean,
  now: Date = new Date()
): ArchivedSermon[] {
  if (isAdmin) {
    return sermons;
  }
  return sermons.filter((s) => isSermonAvailableToPublic(s, now));
}
