const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  updateStatus,
  deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

router.get('/', getCourses);

router.get('/:id', getCourse);

router.post('/', createCourse);

router.put('/:id', updateCourse);

router.patch('/:id/status', updateStatus);

router.delete('/:id', deleteCourse);

module.exports = router;