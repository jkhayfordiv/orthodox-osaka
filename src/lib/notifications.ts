import { Locale, NameDayEntry, ScriptureReading } from './types';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  try {
    const result = await Notification.requestPermission();
    return result === 'granted';
  } catch {
    return false;
  }
}

export function sendLocalNotification(
  title: string,
  options?: NotificationOptions
): Notification | null {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return null;
  }

  try {
    const defaultOptions: NotificationOptions = {
      icon: '/brand/church-app-icon.png',
      badge: '/brand/church-seal-round.png',
      ...options,
    };
    return new Notification(title, defaultOptions);
  } catch (e) {
    console.error('Failed to send notification', e);
    return null;
  }
}

/**
 * Converts Julian (Old Calendar) Month-Day to Civil (New Calendar) Month-Day by adding 13 days
 */
export function convertJulianToCivil(julianMonth: number, julianDay: number): { month: number; day: number; formatted: string } {
  // Use year 2026 as standard reference
  const d = new Date(Date.UTC(2026, julianMonth - 1, julianDay));
  d.setUTCDate(d.getUTCDate() + 13);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  return {
    month: m,
    day: day,
    formatted: `${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  };
}

/**
 * Converts Civil (New Calendar) Month-Day to Julian (Old Calendar) Month-Day by subtracting 13 days
 */
export function convertCivilToJulian(civilMonth: number, civilDay: number): { month: number; day: number; formatted: string } {
  const d = new Date(Date.UTC(2026, civilMonth - 1, civilDay));
  d.setUTCDate(d.getUTCDate() - 13);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  return {
    month: m,
    day: day,
    formatted: `${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  };
}

/**
 * Send notification for user or family Name Days if not already sent today
 */
export function notifyNameDaysIfDue(
  isUserPatronToday: boolean,
  userPatronSaint: NameDayEntry | null,
  celebratingFamilyMembers: { name: string; saint: NameDayEntry }[],
  locale: Locale
) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  const todayStr = new Date().toISOString().split('T')[0];
  const lastSentKey = 'orthodox_last_nameday_notification';
  const lastSent = localStorage.getItem(lastSentKey);

  if (lastSent === todayStr) return; // Already notified today

  if (isUserPatronToday && userPatronSaint) {
    const title =
      locale === 'ja'
        ? '☦ 聖名日のお祝い（多くの歳月を！）'
        : locale === 'ru'
        ? '☦ С Днём Ангела! (Многая лета!)'
        : '☦ Blessed Name Day! (Many Years!)';

    const body =
      locale === 'ja'
        ? `本日はあなたの守護聖人「${userPatronSaint.name[locale]}（${userPatronSaint.saint[locale]}）」の記念日です。`
        : locale === 'ru'
        ? `Сегодня день памяти вашего святого покровителя: ${userPatronSaint.saint[locale]}.`
        : `Today is the feast of your patron saint: ${userPatronSaint.saint[locale]}.`;

    sendLocalNotification(title, { body, tag: 'nameday-user' });
    localStorage.setItem(lastSentKey, todayStr);
    return;
  }

  if (celebratingFamilyMembers.length > 0) {
    const firstMember = celebratingFamilyMembers[0];
    const title =
      locale === 'ja'
        ? `🎉 ${firstMember.name}さんの聖名日`
        : locale === 'ru'
        ? `🎉 Именины: ${firstMember.name}`
        : `🎉 Name Day: ${firstMember.name}`;

    const body =
      locale === 'ja'
        ? `${firstMember.name}さんの守護聖人（${firstMember.saint.saint[locale]}）の記念日です。`
        : locale === 'ru'
        ? `День памяти святого: ${firstMember.saint.saint[locale]}.`
        : `Feast of ${firstMember.saint.saint[locale]}.`;

    sendLocalNotification(title, { body, tag: 'nameday-family' });
    localStorage.setItem(lastSentKey, todayStr);
  }
}

/**
 * Send notification for daily scripture reading reminder if not already sent today
 */
export function notifyDailyReadingIfDue(readings: ScriptureReading[], locale: Locale) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  const todayStr = new Date().toISOString().split('T')[0];
  const lastSentKey = 'orthodox_last_reading_notification';
  const lastSent = localStorage.getItem(lastSentKey);

  if (lastSent === todayStr) return;

  const gospel = readings.find((r) => r.source === 'Gospel');
  const epistle = readings.find((r) => r.source === 'Epistle');

  const title =
    locale === 'ja'
      ? '📖 本日の日課聖書朗読'
      : locale === 'ru'
      ? '📖 Евангельские и Апостольские чтения'
      : '📖 Daily Scripture Readings';

  const body = [
    epistle ? `${epistle.book[locale]} ${epistle.reference}` : '',
    gospel ? `${gospel.book[locale]} ${gospel.reference}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  sendLocalNotification(title, {
    body: body || (locale === 'ja' ? '本日の聖書箇所をお読みください。' : 'Open to read today’s readings.'),
    tag: 'daily-reading',
  });

  localStorage.setItem(lastSentKey, todayStr);
}
