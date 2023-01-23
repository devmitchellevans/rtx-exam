import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

//imported pg and dotenv for configuration of database connections

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

export default {
  service: {
    port: 3000
  },
  pool,
  source: {
    url: "https://hiring.zumata.xyz/job01"
  }
}