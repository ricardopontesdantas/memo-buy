import pgp from "pg-promise";
import { MemoryRepository } from "./MemoryRespository";

export default class MemoryRepositoryInMemory implements MemoryRepository {
    async save(memory: any): Promise<void> {
        const connection = pgp()("");
        await connection.query("insert into memory (idMemory, description) values ($1, $2)", [memory.idMemory, memory.description]);
        connection.$pool.end();
    }

    async updateDone(idMemory: string, done: boolean): Promise<any> {
        const connection = pgp()("");
        await connection.query("update memory set done = $1 where id_memory = $2", [done, idMemory]);
        connection.$pool.end();
    }
}