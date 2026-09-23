import { calculateOrthodoxPascha, getMoveableCycle, gregorianToJulian } from './src/lib/paschalion.js';

console.log('--- Testing Orthodox Paschalion Algorithm ---');

const testYears = [
  { year: 2024, expected: '2024-05-05' },
  { year: 2025, expected: '2025-04-20' },
  { year: 2026, expected: '2026-04-12' },
  { year: 2027, expected: '2027-05-02' },
  { year: 2028, expected: '2028-04-16' },
];

let allPassed = true;

for (const t of testYears) {
  const pascha = calculateOrthodoxPascha(t.year);
  const iso = pascha.toISOString().split('T')[0];
  const passed = iso === t.expected;
  console.log(`Year ${t.year}: Pascha = ${iso} (Expected: ${t.expected}) -> ${passed ? '✓ PASS' : '✗ FAIL'}`);
  if (!passed) allPassed = false;
}

// Test Julian conversion
const julianCheck = gregorianToJulian(new Date(Date.UTC(2026, 8, 23))); // Sept 23, 2026
console.log(`\nJulian date for Sept 23, 2026: Month ${julianCheck.month}, Day ${julianCheck.day} (Expected: Month 9, Day 10) -> ${julianCheck.month === 9 && julianCheck.day === 10 ? '✓ PASS' : '✗ FAIL'}`);

// Test Moveable Cycle for 2027 (Osaka church schedule ending year)
const cycle2027 = getMoveableCycle(2027);
console.log(`\n2027 Great Lent begins: ${cycle2027.greatLentBegins.toISOString().split('T')[0]} (Clean Monday)`);
console.log(`2027 Palm Sunday: ${cycle2027.palmSunday.toISOString().split('T')[0]}`);
console.log(`2027 Pascha: ${cycle2027.pascha.toISOString().split('T')[0]}`);
console.log(`2027 Pentecost: ${cycle2027.pentecost.toISOString().split('T')[0]}`);

if (allPassed) {
  console.log('\n✓ ALL PASCHALION TESTS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
