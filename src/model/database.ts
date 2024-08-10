import { Pool } from 'pg'

const pool = new Pool({
  user:'luffy',
  host:'localhost',
  database:'e_commerce',
  password: 'pass',
  port: 5432,
})
async function createTable () {
 const client = await pool.connect();
  try {
 // Customer Table 
 await pool.query(`CREATE TABLE IF NOT EXISTS customers(
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(30) NOT NULL,
  customer_email VARCHAR(40) NOT NULL,
  customer_password VARCHAR(100) NOT NULL
)`)

  console.log('Table created succeessfully.');
  } catch (error) {
  console.error('Error creating table',error);
  }finally {
    client.release()
    console.log('client realeased back to teh pool.');
    
  }
}
createTable().finally(()=>pool.end())

export default pool;

