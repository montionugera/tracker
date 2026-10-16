import { describe, expect, it } from 'vitest';
import { escapeMarkdownV2 } from '@/utils/telegram';

describe('escapeMarkdownV2', () => {
  it('escapes the MarkdownV2 special-character set', () => {
    expect(escapeMarkdownV2('a_b*c.d!')).toBe('a\\_b\\*c\\.d\\!');
  });

  it('escapes a trailing backslash instead of letting it consume the next character', () => {
    expect(escapeMarkdownV2('Para\\')).toBe('Para\\\\');
  });

  it('escapes a backslash next to a special character', () => {
    expect(escapeMarkdownV2('A\\_B')).toBe('A\\\\\\_B');
  });

  it('collapses control characters such as NUL, newlines, and tabs', () => {
    expect(escapeMarkdownV2('ยา\u0000\n\tแก้ปวด')).toBe('ยา แก้ปวด');
  });

  it('collapses unicode whitespace runs and repeated spaces', () => {
    expect(escapeMarkdownV2('a\u2028\u00A0 b')).toBe('a b');
  });

  it('returns an empty string for nullish and blank values', () => {
    expect(escapeMarkdownV2(null)).toBe('');
    expect(escapeMarkdownV2(undefined)).toBe('');
    expect(escapeMarkdownV2('   ')).toBe('');
  });

  it('keeps numbers and Thai text intact', () => {
    expect(escapeMarkdownV2(42)).toBe('42');
    expect(escapeMarkdownV2('บริษัท ยา')).toBe('บริษัท ยา');
  });
});
