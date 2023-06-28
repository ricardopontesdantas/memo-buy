import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

export default class PgPromiseAdapter implements DatabaseConnection {
    private connection: any;

    async connect(): Promise<void> {
        this.connection = pgp()("postgres://docker:ignite@localhost:5432/local");
    }

    async query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<void> {
        this.connection.$pool.end();
    }
}