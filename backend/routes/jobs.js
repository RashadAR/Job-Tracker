const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jobController = require('../controller/jobController');

// Job routes
router.post('/', auth, jobController.createJob);
router.get('/', auth, jobController.getAllJobs);
router.put('/:id', auth, jobController.updateJob);
router.delete('/:id', auth, jobController.deleteJob);
router.get('/:id', auth, jobController.getJob);

module.exports = router;