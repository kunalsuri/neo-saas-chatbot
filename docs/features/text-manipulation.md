# Text Manipulation Module

## Overview

The Text Manipulation module provides powerful tools for cleaning text and comparing files. It includes two main features:

1. **Remove Formatting** - Clean text by removing HTML, markdown, RTF, and other formatting
2. **Compare Files** - Compare two text files and view differences side-by-side

## Features

### 1. Remove Formatting

The Remove Formatting feature allows users to clean text by removing all formatting and converting it to plain text.

#### Capabilities

- **HTML Removal**: Strips all HTML tags and decodes HTML entities
- **Markdown Removal**: Removes markdown formatting (headers, bold, italic, links, code blocks, etc.)
- **RTF Removal**: Removes RTF control sequences
- **Invisible Characters**: Removes zero-width characters, non-breaking spaces, and other invisible characters
- **Whitespace Cleanup**: Removes excessive spaces and blank lines
- **File Upload**: Supports uploading text files (.txt, .html, .md, .rtf)

#### Usage

1. Navigate to `/text-manipulation` in the application
2. Select the "Remove Formatting" tab
3. Either paste text directly or upload a file
4. Click "Remove Formatting" to clean the text
5. Copy the cleaned text to clipboard or edit it further

#### API Endpoint

```
POST /api/text/strip-formatting
```

**Request Body:**
```json
{
  "text": "Your text with formatting here..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cleanedText": "Your cleaned plain text...",
    "originalLength": 1234,
    "cleanedLength": 1000
  },
  "timestamp": "2025-01-11T12:00:00.000Z"
}
```

### 2. Compare Files

The Compare Files feature allows users to compare two text files and view differences in a visual diff format.

#### Capabilities

- **Line-by-Line Comparison**: Compares files line by line using a custom diff algorithm
- **Visual Diff**: Displays differences with color-coded highlighting
  - Green: Added lines
  - Red: Deleted lines
  - Orange: Modified lines
- **Multiple Output Formats**: Supports HTML (visual) and plain text formats
- **Statistics**: Shows counts of additions, deletions, and modifications
- **Download**: Export diff results as HTML or text file
- **File Support**: Supports various file types (.txt, .md, .json, .js, .ts, .tsx, .jsx, .html, .css, .py, .java, .cpp, .c, .h)

#### Usage

1. Navigate to `/text-manipulation` in the application
2. Select the "Compare Files" tab
3. Upload File A and File B
4. Select output format (HTML or Plain Text)
5. Click "Compare Files" to generate the diff
6. View the visual diff with statistics
7. Download the diff if needed

#### API Endpoint

```
POST /api/text/compare-files
```

**Request Body:**
```json
{
  "fileA": "Content of first file...",
  "fileB": "Content of second file...",
  "fileAName": "file1.txt",
  "fileBName": "file2.txt",
  "outputFormat": "html"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "diff": "HTML or text diff content...",
    "format": "html",
    "stats": {
      "additions": 5,
      "deletions": 3,
      "modifications": 2
    }
  },
  "timestamp": "2025-01-11T12:00:00.000Z"
}
```

## Architecture

### Backend Structure

```
server/features/text-manipulation/
├── routes/
│   └── text-manipulation.ts      # API routes
└── services/
    └── text-manipulation.ts      # Business logic
```

### Frontend Structure

```
client/src/features/text-manipulation/
├── components/
│   ├── TextManipulation.tsx      # Main component with tabs
│   ├── RemoveFormatting.tsx      # Remove formatting feature
│   └── CompareFiles.tsx          # File comparison feature
└── index.ts                      # Feature exports
```

### Service Methods

#### TextManipulationService

**stripFormatting(text: string): string**
- Removes all formatting from text
- Handles HTML, markdown, RTF, and invisible characters
- Returns cleaned plain text

**compareFiles(fileA, fileB, fileAName?, fileBName?, outputFormat?): ComparisonResult**
- Compares two text files line by line
- Generates visual diff in HTML or plain text format
- Returns diff content and statistics

## Security

- All endpoints require authentication (`requireAuth` middleware)
- CSRF protection enabled (`csrfProtection` middleware)
- Input validation using Zod schemas
- File size limits enforced (max 100,000 characters for strip-formatting)
- All operations are logged for audit purposes

## Validation Schemas

### stripFormattingSchema
```typescript
{
  text: string (min: 1, max: 100000)
}
```

### compareFilesSchema
```typescript
{
  fileA: string (min: 1),
  fileB: string (min: 1),
  fileAName?: string,
  fileBName?: string,
  outputFormat?: "html" | "text" (default: "html")
}
```

## Error Handling

All errors are properly handled and logged:
- Invalid input returns 400 Bad Request
- Authentication failures return 401 Unauthorized
- Server errors return 500 Internal Server Error
- User-friendly error messages displayed in UI via toast notifications

## Performance Considerations

- Text processing is done server-side to avoid blocking the UI
- Large files may take longer to process
- Diff algorithm is optimized for typical file sizes
- HTML diff output is rendered in an iframe for isolation

## Future Enhancements

Potential improvements for future versions:

1. **Advanced Diff Options**
   - Ignore whitespace changes
   - Case-insensitive comparison
   - Regex-based filtering

2. **Additional Text Tools**
   - Text case conversion (uppercase, lowercase, title case)
   - Find and replace with regex support
   - Text statistics (word count, character count, reading time)

3. **Batch Processing**
   - Process multiple files at once
   - Bulk text cleaning

4. **Export Options**
   - Export cleaned text to various formats
   - Save comparison results to database

5. **Diff Algorithm Improvements**
   - Use more sophisticated diff algorithms (Myers, Patience)
   - Better handling of moved lines
   - Syntax highlighting for code files

## Testing

To test the Text Manipulation module:

1. **Remove Formatting**
   ```bash
   curl -X POST http://localhost:5173/api/text/strip-formatting \
     -H "Content-Type: application/json" \
     -d '{"text": "<p>Hello <b>World</b></p>"}'
   ```

2. **Compare Files**
   ```bash
   curl -X POST http://localhost:5173/api/text/compare-files \
     -H "Content-Type: application/json" \
     -d '{
       "fileA": "Line 1\nLine 2\nLine 3",
       "fileB": "Line 1\nLine 2 modified\nLine 3\nLine 4",
       "outputFormat": "text"
     }'
   ```

## Troubleshooting

### Common Issues

1. **"Failed to remove formatting"**
   - Check that the text is not empty
   - Ensure text length is within limits (100,000 characters)
   - Verify authentication token is valid

2. **"Failed to compare files"**
   - Ensure both files are selected
   - Check file content is not empty
   - Verify files are text-based (not binary)

3. **Diff not displaying correctly**
   - Try switching output format (HTML ↔ Text)
   - Check browser console for errors
   - Ensure iframe is not blocked by browser settings

## Contributing

When contributing to the Text Manipulation module:

1. Follow the existing code style and structure
2. Add tests for new features
3. Update documentation
4. Ensure all lint checks pass
5. Test with various file types and edge cases

## License

Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0
