const db = require('./config/db');

async function testDatabase() {
  try {
    const [rows] = await db.query('SELECT 1 AS result');

    console.log('Database connection successful');
    console.log(rows);
  } catch (error) {
    console.error('Database connection failed');
    console.error(error);
  } finally {
    process.exit();
  }
}

testDatabase();