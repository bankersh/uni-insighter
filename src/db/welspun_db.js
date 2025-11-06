import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const poolC = new Pool({
  host: process.env.PGHOST_C,
  user: process.env.PGUSER_C,
  password: process.env.PGPASSWORD_C,
  database: process.env.PGDATABASE_C,
  port: process.env.PGPORT_C,
  ssl: {
    rejectUnauthorized: false // allows self-signed certs, needed for most cloud PG
  }
});

export default poolC;
