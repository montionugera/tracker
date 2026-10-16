/**
 * Telegram message-formatting utilities.
 */

const MARKDOWN_V2_SPECIAL_CHARS = /([_*[\]()~`>#+\-=|{}.!])/g;

/**
 * Escapes a value for Telegram MarkdownV2 parse mode.
 *
 * Runs of Unicode whitespace and control characters (NUL included) are
 * collapsed to a single space so the value always stays on one line, and
 * backslashes are escaped before the special-character set so a value ending
 * in one cannot consume the next structural character. Safely handles `null`,
 * `undefined`, and non-string values.
 */
export function escapeMarkdownV2(text: string | number | null | undefined): string {
  const singleLine = String(text ?? '')
    .replace(/[\p{Cc}\s]+/gu, ' ')
    .trim();

  return singleLine
    .replace(/\\/g, '\\\\')
    .replace(MARKDOWN_V2_SPECIAL_CHARS, '\\$1');
}
