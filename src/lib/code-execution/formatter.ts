import { CodeLanguage } from '@/lib/types';

/**
 * Client-side syntax formatter for CodeArena.
 * Standardizes indentations, curly bracket placement, operator spacing, and trailing whitespace.
 */
export function formatCode(code: string, language: CodeLanguage): { formatted: string; changed: boolean } {
  if (!code || code.trim() === '') {
    return { formatted: code, changed: false };
  }

  const lines = code.split('\n');
  const formattedLines: string[] = [];
  let indentLevel = 0;
  const indentSize = language === 'javascript' ? 2 : 4;
  const indentChar = ' '.repeat(indentSize);

  for (let i = 0; i < lines.length; i++) {
    let raw = lines[i].trim();

    // Preserve empty lines, but limit consecutive blanks to 1
    if (raw === '') {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      continue;
    }

    // Adjust indent for closing braces / brackets
    if (language !== 'python') {
      const closingMatches = raw.match(/^[\}\]\)]+/);
      if (closingMatches) {
        indentLevel = Math.max(0, indentLevel - closingMatches[0].length);
      }
    } else {
      // Python unindent heuristics
      if (raw.startsWith('elif ') || raw.startsWith('else:') || raw.startsWith('except') || raw.startsWith('finally:')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
    }

    // Space operators neatly in C++, Java, JS
    if (language !== 'python') {
      // Clean duplicate spaces around standard operators
      raw = raw
        .replace(/\s*([=+\-*/%><!]=?|&&|\|\|)\s*/g, ' $1 ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s*;\s*/g, '; ')
        .replace(/;\s*$/, ';')
        .replace(/\s*\{\s*$/, ' {');
    }

    // Apply indentation
    const lineIndent = indentChar.repeat(indentLevel);
    formattedLines.push(lineIndent + raw);

    // Increase indent for opening braces / blocks
    if (language !== 'python') {
      const openMatches = raw.match(/[\{\[\(]/g);
      const closeMatches = raw.match(/[\}\]\)]/g);
      const netOpen = (openMatches ? openMatches.length : 0) - (closeMatches ? closeMatches.length : 0);
      if (netOpen > 0) {
        indentLevel += netOpen;
      }
    } else {
      if (raw.endsWith(':')) {
        indentLevel += 1;
      }
    }
  }

  const result = formattedLines.join('\n');
  return {
    formatted: result,
    changed: result !== code,
  };
}

