const db = require('../config/db');

const getAllCourses = async () => {
  const [rows] = await db.query(
    'SELECT * FROM courses ORDER BY name ASC'
  );

  return rows;
};

const getCourseById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM courses WHERE id = ?',
    [id]
  );

  return rows[0];
};

const createCourse = async (course) => {
  const {
    name,
    description,
    duration,
    lessons,
    status
  } = course;

  const [result] = await db.query(
    `INSERT INTO courses
    (name, description, duration, lessons, status)
    VALUES (?, ?, ?, ?, ?)`,
    [name, description, duration, lessons, status]
  );

  return result.insertId;
};

const updateCourse = async (id, course) => {
  const {
    name,
    description,
    duration,
    lessons,
    status
  } = course;

  const [result] = await db.query(
    `UPDATE courses
    SET name = ?, description = ?, duration = ?, lessons = ?, status = ?
    WHERE id = ?`,
    [name, description, duration, lessons, status, id]
  );

  return result.affectedRows;
};

const updateCourseStatus = async (id, status) => {
  const [result] = await db.query(
    'UPDATE courses SET status = ? WHERE id = ?',
    [status, id]
  );

  return result.affectedRows;
};

const deleteCourse = async (id) => {
  const [result] = await db.query(
    'DELETE FROM courses WHERE id = ?',
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  updateCourseStatus,
  deleteCourse
};