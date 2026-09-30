const courseModel = require('../models/courseModel');

const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.getAllCourses();

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const course = await courseModel.getCourseById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch course'
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      lessons,
      status
    } = req.body;

    if (!name || !description || !duration || !lessons || !status) {
      return res.status(400).json({
        success: false,
        message: 'All course fields are required'
      });
    }

    const courseId = await courseModel.createCourse({
      name,
      description,
      duration,
      lessons,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      id: courseId
    });
  } catch (error) {
    console.error('Create course error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create course'
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const affectedRows = await courseModel.updateCourse(
      id,
      req.body
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Update course error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update course'
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const affectedRows = await courseModel.updateCourseStatus(
      id,
      status
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course status updated successfully'
    });
  } catch (error) {
    console.error('Update status error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update course status'
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const affectedRows = await courseModel.deleteCourse(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete course'
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  updateStatus,
  deleteCourse
};