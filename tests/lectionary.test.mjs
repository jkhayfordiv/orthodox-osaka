import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Orthodox Lectionary & Old Calendar Verification Suite', () => {
  const TEST_DATES = [
    {
      name: 'Autumn (Luke Cycle / Nativity Fast approach)',
      civilDate: '2026-11-12',
      expectedJulian: { year: 2026, month: 10, day: 30 },
      expectedTone: 6,
      expectedGospelBook: 'LUK',
      expectedEpistleBook: '1TH',
    },
    {
      name: 'Late Winter (Mark Weekdays / Pre-Lenten season)',
      civilDate: '2027-01-28',
      expectedJulian: { year: 2027, month: 1, day: 15 },
      expectedTone: 1,
      expectedGospelBook: 'MRK',
      expectedEpistleBook: 'HEB',
    },
    {
      name: 'Great Lent (First Week / Clean Wednesday - Old Testament Readings)',
      civilDate: '2027-03-17',
      expectedJulian: { year: 2027, month: 3, day: 4 },
      isGreatLentOldTestament: true,
    },
    {
      name: 'Paschal Season (Bright / Post-Pascha - Acts & John Cycle)',
      civilDate: '2027-05-14',
      expectedJulian: { year: 2027, month: 5, day: 1 },
      expectedTone: 1,
      expectedGospelBook: 'JHN',
      expectedEpistleBook: 'ACT',
    },
    {
      name: 'Summer (Pentecost Cycle - Romans & Matthew Cycle)',
      civilDate: '2027-07-20',
      expectedJulian: { year: 2027, month: 7, day: 7 },
      expectedTone: 3,
      expectedGospelBook: 'MAT',
      expectedEpistleBook: 'ROM',
    },
  ];

  for (const t of TEST_DATES) {
    it(`validates ${t.name} on ${t.civilDate}`, async () => {
      const [y, m, d] = t.civilDate.split('-').map(Number);
      const url = `https://orthocal.info/api/julian/${y}/${m}/${d}/`;

      const res = await fetch(url);
      assert.equal(res.ok, true, `Orthocal API request failed with status ${res.status}`);

      const data = await res.json();

      // 1. Verify Julian date offset (must be exactly 13 days behind Gregorian)
      assert.equal(data.year, t.expectedJulian.year, `Julian year mismatch for ${t.civilDate}`);
      assert.equal(data.month, t.expectedJulian.month, `Julian month mismatch for ${t.civilDate}`);
      assert.equal(data.day, t.expectedJulian.day, `Julian day mismatch for ${t.civilDate}`);

      // 2. Verify Tone if specified
      if (t.expectedTone !== undefined) {
        assert.equal(data.tone, t.expectedTone, `Tone mismatch on ${t.civilDate}`);
      }

      // 3. Verify Great Lent Old Testament Readings (Genesis, Proverbs, Isaiah)
      if (t.isGreatLentOldTestament) {
        const sources = data.readings.map((r) => r.source);
        const displays = data.readings.map((r) => r.display);

        const hasGenesis = displays.some((d) => d.includes('Genesis'));
        const hasProverbs = displays.some((d) => d.includes('Proverbs'));
        const hasIsaiah = displays.some((d) => d.includes('Isaiah'));

        assert.ok(hasGenesis, `Expected Genesis reading during Clean Week Wednesday on ${t.civilDate}`);
        assert.ok(hasProverbs, `Expected Proverbs reading during Clean Week Wednesday on ${t.civilDate}`);
        assert.ok(hasIsaiah, `Expected Isaiah 6th Hour reading on ${t.civilDate}`);
        return;
      }

      // 4. Verify Gospel book code
      if (t.expectedGospelBook) {
        const gospelReading = data.readings.find((r) => r.source === 'Gospel');
        assert.ok(gospelReading, `Missing Gospel reading on ${t.civilDate}`);
        const passageBook = gospelReading.passage?.[0]?.book;
        assert.equal(
          passageBook,
          t.expectedGospelBook,
          `Expected Gospel book ${t.expectedGospelBook} but received ${passageBook} on ${t.civilDate} (${gospelReading.display})`
        );
      }

      // 5. Verify Epistle book code
      if (t.expectedEpistleBook) {
        const epistleReading = data.readings.find((r) => r.source === 'Epistle');
        assert.ok(epistleReading, `Missing Epistle reading on ${t.civilDate}`);
        const passageBook = epistleReading.passage?.[0]?.book;
        assert.equal(
          passageBook,
          t.expectedEpistleBook,
          `Expected Epistle book ${t.expectedEpistleBook} but received ${passageBook} on ${t.civilDate} (${epistleReading.display})`
        );
      }
    });
  }

  it('ensures chapter references never drop the first digit (e.g. Mark 12 vs Mark 1)', async () => {
    // September 25, 2026 is Mark 12:1-12
    const res = await fetch('https://orthocal.info/api/julian/2026/9/25/');
    assert.equal(res.ok, true);
    const data = await res.json();
    const markReading = data.readings.find((r) => r.display.includes('Mark 12'));
    assert.ok(markReading, 'Should contain Mark 12:1-12 without digit truncation');
    assert.match(markReading.display, /^Mark 12\.\d+/, 'Mark 12 chapter prefix must remain intact');
  });
});
