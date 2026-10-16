import { describe, expect, it } from 'vitest';
import { formatMoney, formatQuantity } from '@/utils/number';

describe('formatMoney', () => {
  it('formats a value as Thai-locale money with two decimals', () => {
    expect(formatMoney(1234.5)).toBe('1,234.50');
  });

  it('keeps zero as 0.00', () => {
    expect(formatMoney(0)).toBe('0.00');
  });
});

describe('formatQuantity', () => {
  it('groups thousands with the Thai locale', () => {
    expect(formatQuantity(1000)).toBe('1,000');
  });

  it('keeps fractional quantities', () => {
    expect(formatQuantity(2.5)).toBe('2.5');
  });

  it('keeps zero as 0', () => {
    expect(formatQuantity(0)).toBe('0');
  });
});
