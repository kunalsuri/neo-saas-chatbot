/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Router } from 'express';
import { TextManipulationService } from '../services/text-manipulation';
import { validateBody } from '../../../shared/middleware/validation';
import { requireAuth } from '../../../shared/middleware/auth';
import { csrfProtection } from '../../../shared/middleware/csrf';
import { asyncHandler } from '../../../shared/middleware/errorHandler';
import { stripFormattingSchema, compareFilesSchema } from '@shared/validation';
import { log } from '../../../shared/utils/logger';

const router = Router();
const textManipulationService = new TextManipulationService();

/**
 * POST /api/text/strip-formatting
 * Remove all formatting from text
 */
router.post(
  '/strip-formatting',
  validateBody(stripFormattingSchema),
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { text } = req.body;

    log.info('Processing strip formatting request', {
      userId: req.user?.id,
      textLength: text.length,
    });

    const cleanedText = textManipulationService.stripFormatting(text);

    res.json({
      success: true,
      data: {
        cleanedText,
        originalLength: text.length,
        cleanedLength: cleanedText.length,
      },
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * POST /api/text/compare-files
 * Compare two files and generate a diff
 */
router.post(
  '/compare-files',
  validateBody(compareFilesSchema),
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { fileA, fileB, fileAName, fileBName, outputFormat } = req.body;

    log.info('Processing file comparison request', {
      userId: req.user?.id,
      fileALength: fileA.length,
      fileBLength: fileB.length,
      outputFormat,
    });

    const result = textManipulationService.compareFiles(
      fileA,
      fileB,
      fileAName,
      fileBName,
      outputFormat
    );

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
