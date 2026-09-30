require('dotenv').config();

console.log('DB_HOST:', JSON.stringify(process.env.DB_HOST));
console.log('DB_USER:', JSON.stringify(process.env.DB_USER));
console.log('DB_NAME:', JSON.stringify(process.env.DB_NAME));
console.log('DB_PORT:', JSON.stringify(process.env.DB_PORT));
console.log('Password length:', process.env.DB_PASSWORD?.length);