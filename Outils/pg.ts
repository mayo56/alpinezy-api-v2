import { Client } from "pg";

async function request(input: string) {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 5432,
    });
    client.connect();
    const query = await client.query(input);
    client.end();
    return query;
};

export default request;