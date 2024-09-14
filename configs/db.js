import { neon } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon('postgresql://db_owner:MjKy9IO4DHxU@ep-frosty-mode-a5gt4pcp.us-east-2.aws.neon.tech/AI%20Course?sslmode=require')
export const db = drizzle(sql)