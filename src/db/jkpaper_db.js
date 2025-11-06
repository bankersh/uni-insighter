import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const poolB = new Pool({
  host: process.env.PGHOST_B,
  user: process.env.PGUSER_B,
  password: process.env.PGPASSWORD_B,
  database: process.env.PGDATABASE_B,
  port: process.env.PGPORT_B,
  ssl: {
    rejectUnauthorized: false // allows self-signed certs, needed for most cloud PG
  }
});

export default poolB;
