import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const poolA = new Pool({
  host: process.env.PGHOST_A,
  user: process.env.PGUSER_A,
  password: process.env.PGPASSWORD_A,
  database: process.env.PGDATABASE_A,
  port: process.env.PGPORT_A,
  ssl: {
    rejectUnauthorized: false // allows self-signed certs, needed for most cloud PG
  }
});

export default poolA;
