/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { log } from '../../../shared/utils/logger';

/**
 * Service class for text manipulation operations
 */
export class TextManipulationService {
  /**
   * Remove all formatting from text, converting to plain text
   * @param text - The text to clean
   * @returns Cleaned plain text
   */
  stripFormatting(text: string): string {
    try {
      let cleanedText = text;

      // Remove HTML tags
      cleanedText = cleanedText.replace(/<[^>]*>/g, '');

      // Decode HTML entities
      cleanedText = this.decodeHTMLEntities(cleanedText);

      // Remove markdown formatting
      cleanedText = this.removeMarkdown(cleanedText);

      // Remove RTF control sequences
      cleanedText = cleanedText.replace(/\\[a-z]+\d*\s?/gi, '');

      // Remove zero-width characters and other invisible characters
      cleanedText = cleanedText.replace(/[\u200B-\u200D\uFEFF]/g, '');

      // Remove non-breaking spaces
      cleanedText = cleanedText.replace(/\u00A0/g, ' ');

      // Remove multiple consecutive spaces
      cleanedText = cleanedText.replace(/  +/g, ' ');

      // Remove leading/trailing whitespace from each line
      cleanedText = cleanedText.split('\n').map(line => line.trim()).join('\n');

      // Remove excessive blank lines (more than 2 consecutive)
      cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');

      // Final trim
      cleanedText = cleanedText.trim();

      log.info('Text formatting stripped successfully', {
        originalLength: text.length,
        cleanedLength: cleanedText.length,
      });

      return cleanedText;
    } catch (error) {
      log.error('Error stripping text formatting', error);
      throw new Error('Failed to strip text formatting');
    }
  }

  /**
   * Decode HTML entities to their character equivalents
   * @param text - Text with HTML entities
   * @returns Decoded text
   */
  private decodeHTMLEntities(text: string): string {
    const entities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&nbsp;': ' ',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™',
      '&euro;': '€',
      '&pound;': '£',
    };

    let decoded = text;
    for (const [entity, char] of Object.entries(entities)) {
      decoded = decoded.replace(new RegExp(entity, 'g'), char);
    }

    // Decode numeric entities
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(dec);
    });

    decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });

    return decoded;
  }

  /**
   * Remove markdown formatting
   * @param text - Text with markdown
   * @returns Text without markdown
   */
  private removeMarkdown(text: string): string {
    let cleaned = text;

    // Remove headers
    cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');

    // Remove bold/italic
    cleaned = cleaned.replace(/(\*\*|__)(.*?)\1/g, '$2');
    cleaned = cleaned.replace(/(\*|_)(.*?)\1/g, '$2');

    // Remove strikethrough
    cleaned = cleaned.replace(/~~(.*?)~~/g, '$1');

    // Remove code blocks
    cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
    cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

    // Remove links but keep text
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Remove images
    cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');

    // Remove horizontal rules
    cleaned = cleaned.replace(/^(-{3,}|[*]{3,}|_{3,})$/gm, '');

    // Remove blockquotes
    cleaned = cleaned.replace(/^>\s+/gm, '');

    // Remove list markers
    cleaned = cleaned.replace(/^[*\-+]\s+/gm, '');
    cleaned = cleaned.replace(/^\d+\.\s+/gm, '');

    return cleaned;
  }

  /**
   * Compare two text files and generate a diff
   * @param fileA - Content of first file
   * @param fileB - Content of second file
   * @param fileAName - Name of first file (optional)
   * @param fileBName - Name of second file (optional)
   * @param outputFormat - Output format ('html' or 'text')
   * @returns Diff result
   */
  compareFiles(
    fileA: string,
    fileB: string,
    fileAName?: string,
    fileBName?: string,
    outputFormat: 'html' | 'text' = 'html'
  ): { diff: string; format: string; stats: { additions: number; deletions: number; modifications: number } } {
    try {
      const linesA = fileA.split('\n');
      const linesB = fileB.split('\n');

      const diff = this.computeDiff(linesA, linesB);
      
      let formattedDiff: string;
      if (outputFormat === 'html') {
        formattedDiff = this.formatDiffAsHTML(diff, fileAName, fileBName);
      } else {
        formattedDiff = this.formatDiffAsText(diff, fileAName, fileBName);
      }

      const stats = this.calculateDiffStats(diff);

      log.info('File comparison completed', {
        fileALines: linesA.length,
        fileBLines: linesB.length,
        stats,
      });

      return {
        diff: formattedDiff,
        format: outputFormat,
        stats,
      };
    } catch (error) {
      log.error('Error comparing files', error);
      throw new Error('Failed to compare files');
    }
  }

  /**
   * Compute line-by-line diff using a simple LCS algorithm
   */
  private computeDiff(linesA: string[], linesB: string[]): Array<{ type: 'equal' | 'delete' | 'insert' | 'modify'; lineA?: string; lineB?: string; indexA?: number; indexB?: number }> {
    const result: Array<{ type: 'equal' | 'delete' | 'insert' | 'modify'; lineA?: string; lineB?: string; indexA?: number; indexB?: number }> = [];
    
    let i = 0;
    let j = 0;

    while (i < linesA.length || j < linesB.length) {
      if (i >= linesA.length) {
        // Remaining lines in B are insertions
        result.push({ type: 'insert', lineB: linesB[j] || '', indexB: j });
        j++;
      } else if (j >= linesB.length) {
        // Remaining lines in A are deletions
        result.push({ type: 'delete', lineA: linesA[i] || '', indexA: i });
        i++;
      } else if (linesA[i] === linesB[j]) {
        // Lines are equal
        result.push({ type: 'equal', lineA: linesA[i] || '', lineB: linesB[j] || '', indexA: i, indexB: j });
        i++;
        j++;
      } else {
        // Lines differ - check if it's a modification or insert/delete
        const nextMatchInB = linesB.slice(j + 1).findIndex(line => line === linesA[i]);
        const nextMatchInA = linesA.slice(i + 1).findIndex(line => line === linesB[j]);

        if (nextMatchInB === -1 && nextMatchInA === -1) {
          // No match found - treat as modification
          result.push({ type: 'modify', lineA: linesA[i] || '', lineB: linesB[j] || '', indexA: i, indexB: j });
          i++;
          j++;
        } else if (nextMatchInB !== -1 && (nextMatchInA === -1 || nextMatchInB < nextMatchInA)) {
          // Found match in B sooner - current line in A is deleted
          result.push({ type: 'delete', lineA: linesA[i] || '', indexA: i });
          i++;
        } else {
          // Found match in A sooner - current line in B is inserted
          result.push({ type: 'insert', lineB: linesB[j] || '', indexB: j });
          j++;
        }
      }
    }

    return result;
  }

  /**
   * Format diff as HTML
   */
  private formatDiffAsHTML(diff: Array<{ type: string; lineA?: string; lineB?: string; indexA?: number; indexB?: number }>, fileAName?: string, fileBName?: string): string {
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Comparison</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .header {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .file-names {
      display: flex;
      gap: 20px;
      font-size: 14px;
      color: #666;
    }
    .diff-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .diff-line {
      display: flex;
      font-size: 13px;
      line-height: 1.5;
      border-bottom: 1px solid #e0e0e0;
    }
    .line-number {
      padding: 4px 12px;
      background: #fafafa;
      color: #999;
      text-align: right;
      min-width: 50px;
      user-select: none;
      border-right: 1px solid #e0e0e0;
    }
    .line-content {
      padding: 4px 12px;
      flex: 1;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .equal {
      background: white;
    }
    .delete {
      background: #ffebee;
    }
    .delete .line-content {
      color: #c62828;
    }
    .insert {
      background: #e8f5e9;
    }
    .insert .line-content {
      color: #2e7d32;
    }
    .modify {
      background: #fff3e0;
    }
    .modify .line-content {
      color: #e65100;
    }
    .stats {
      background: white;
      padding: 15px 20px;
      margin-top: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      gap: 30px;
      font-size: 14px;
    }
    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .stat-label {
      color: #666;
    }
    .stat-value {
      font-weight: bold;
    }
    .stat-additions { color: #2e7d32; }
    .stat-deletions { color: #c62828; }
    .stat-modifications { color: #e65100; }
  </style>
</head>
<body>
  <div class="header">
    <h1>File Comparison</h1>
    <div class="file-names">
      <div><strong>File A:</strong> ${escapeHtml(fileAName || 'File A')}</div>
      <div><strong>File B:</strong> ${escapeHtml(fileBName || 'File B')}</div>
    </div>
  </div>
  <div class="diff-container">`;

    diff.forEach((item) => {
      if (item.type === 'equal') {
        html += `
    <div class="diff-line equal">
      <div class="line-number">${(item.indexA ?? 0) + 1}</div>
      <div class="line-content">${escapeHtml(item.lineA || '')}</div>
    </div>`;
      } else if (item.type === 'delete') {
        html += `
    <div class="diff-line delete">
      <div class="line-number">${(item.indexA ?? 0) + 1}</div>
      <div class="line-content">- ${escapeHtml(item.lineA || '')}</div>
    </div>`;
      } else if (item.type === 'insert') {
        html += `
    <div class="diff-line insert">
      <div class="line-number">${(item.indexB ?? 0) + 1}</div>
      <div class="line-content">+ ${escapeHtml(item.lineB || '')}</div>
    </div>`;
      } else if (item.type === 'modify') {
        html += `
    <div class="diff-line modify">
      <div class="line-number">${(item.indexA ?? 0) + 1}</div>
      <div class="line-content">~ ${escapeHtml(item.lineA || '')} → ${escapeHtml(item.lineB || '')}</div>
    </div>`;
      }
    });

    const stats = this.calculateDiffStats(diff);
    html += `
  </div>
  <div class="stats">
    <div class="stat-item">
      <span class="stat-label">Additions:</span>
      <span class="stat-value stat-additions">+${stats.additions}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Deletions:</span>
      <span class="stat-value stat-deletions">-${stats.deletions}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Modifications:</span>
      <span class="stat-value stat-modifications">~${stats.modifications}</span>
    </div>
  </div>
</body>
</html>`;

    return html;
  }

  /**
   * Format diff as plain text
   */
  private formatDiffAsText(diff: Array<{ type: string; lineA?: string; lineB?: string; indexA?: number; indexB?: number }>, fileAName?: string, fileBName?: string): string {
    let text = `File Comparison\n`;
    text += `File A: ${fileAName || 'File A'}\n`;
    text += `File B: ${fileBName || 'File B'}\n`;
    text += `${'='.repeat(80)}\n\n`;

    diff.forEach((item) => {
      if (item.type === 'equal') {
        text += `  ${item.lineA}\n`;
      } else if (item.type === 'delete') {
        text += `- ${item.lineA}\n`;
      } else if (item.type === 'insert') {
        text += `+ ${item.lineB}\n`;
      } else if (item.type === 'modify') {
        text += `~ ${item.lineA}\n`;
        text += `→ ${item.lineB}\n`;
      }
    });

    const stats = this.calculateDiffStats(diff);
    text += `\n${'='.repeat(80)}\n`;
    text += `Statistics:\n`;
    text += `  Additions: +${stats.additions}\n`;
    text += `  Deletions: -${stats.deletions}\n`;
    text += `  Modifications: ~${stats.modifications}\n`;

    return text;
  }

  /**
   * Calculate diff statistics
   */
  private calculateDiffStats(diff: Array<{ type: string }>): { additions: number; deletions: number; modifications: number } {
    const stats = {
      additions: 0,
      deletions: 0,
      modifications: 0,
    };

    diff.forEach((item) => {
      if (item.type === 'insert') {
        stats.additions++;
      } else if (item.type === 'delete') {
        stats.deletions++;
      } else if (item.type === 'modify') {
        stats.modifications++;
      }
    });

    return stats;
  }
}
