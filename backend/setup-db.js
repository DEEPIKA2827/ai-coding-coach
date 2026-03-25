require('dotenv').config();
const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    // Connect without selecting a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    console.log('Connected to MySQL server...');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`✅ Database '${process.env.DB_NAME}' created successfully!`);

    await connection.end();
    console.log('Done! Now run: npm run dev');
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    process.exit(1);
  }
}

createDatabase();
