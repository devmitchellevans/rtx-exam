'use strict'

import { Router } from 'express';
import handler from './handlers/externalAPIHandler.js';

const router = Router();

router.get(
  '/fromSource',
  async (req, response, next) => {
    try {
      // 6. Call handler to response with data
      await handler.getListFromAPI().then(data => {
        response.json(data);
      }
        );
    } catch (err) {
      next(err);
    }
  }
)

export default router;