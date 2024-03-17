import { Pool, PoolClient } from 'pg';
import { config } from 'dotenv';
config();

export class PGPoolConnection {

    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            port: Number(process.env.PGPORT),
            password: process.env.PGPASSWORD,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            options:"-c search_path=shopping-cart,public",
        });
    }

    public async query(sql: string, values: any[] = []): Promise<any> {
        const client: PoolClient = await this.pool.connect();
        let res;
        try {
            await client.query('BEGIN');
            res = await client.query(sql, values);
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
        return res;
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}
export default PGPoolConnection;
