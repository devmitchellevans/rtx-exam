'use strict'

import { Router } from 'express';

// 4. Import routes
import externalApi from './externalAPI.js';

const router = Router({
  caseSensitive: true,
});

import internalAPI from './internalAPI.js';

// 5. Use imported routes in router
//created dynamic routes for easier api calls to frontend
router.route("/fromSource").get(externalApi);
router.route("/:table").get(internalAPI);
router.route("/:table/:id").get(internalAPI);
router.route("/:table/delete/:id").delete(internalAPI);
router.route("/:table/add").post(internalAPI);
router.route("/:table/update/:id").put(internalAPI);

export default router;