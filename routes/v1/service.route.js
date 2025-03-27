// ✅ Cleaned and corrected service.route.js
const express = require('express');
const serviceController = require('../../controllers/service.controller');
const asyncHandler = require('../../helper/asyncHandler');
const validate = require('../../middleware/validate');
const authMiddleware = require('../../middleware/auth');
const { createServiceSchema } = require('../../validations/service.validation');

const router = express.Router();

// Temporary route to test Render deployment
router.get('/ping', (req, res) => {
  res.send({ message: 'Service route working on Render' });
});

// POST: Create a new service
router.post('/',
  validate(createServiceSchema),
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.createService)
);

// PUT: Update a service by ID
router.put('/:serviceId',
  validate(createServiceSchema),
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.updateService)
);

// GET: Get services for the currently logged-in mentor
router.get('/',
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.getServiceByMentor)
);

// ✅ FIXED: Get services of a specific mentor by ID
router.get('/mentor/:mentorId',
  asyncHandler(serviceController.getServicesOfMentor)
);

// GET: Get a service by ID
router.get('/:serviceId',
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.getServiceById)
);

module.exports = router;
