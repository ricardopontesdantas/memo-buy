import pgp from "pg-promise";
import { MemoryRepository } from "./MemoryRepository";
import Memory from "./Memory";

export default class MemoryRepositoryDatabase implements MemoryRepository {
    async save(memory: Memory): Promise<void> {
        const connection = pgp()("postgres://docker:ignite@localhost:5432/local");
        await connection.query("insert into memobuy.memory (id_memory, id_user, description, done, created_at) values ($1, $2, $3, $4, $5)", [memory.idMemory, memory.idUser, memory.description, memory.done, memory.createdAt]);
        connection.$pool.end();
    }

    async updateDone(idMemory: string, done: boolean): Promise<Memory> {
        const connection = pgp()("postgres://docker:ignite@localhost:5432/local");
        const updatedAt = done === true ? "current_timestamp" : null;
        await connection.query(`update memobuy.memory set done = $1, updated_at = ${updatedAt} where id_memory = $2`, [done, idMemory]);
        const [memoryData] = await connection.query("select * from memobuy.memory where id_memory = $1", [idMemory]);
        connection.$pool.end();
        return new Memory(memoryData.id_memory, memoryData.id_user, memoryData.description, memoryData.done, memoryData.created_at, memoryData.updated_at);
    }

    async listUndone(idUser: string, today: Date): Promise<Memory[]> {
        const connection = pgp()("postgres://docker:ignite@localhost:5432/local");
        const memoriesData = await connection.query("select * from memobuy.memory where id_user = $1 and (done = false or extract(day from $2::timestamp - updated_at) <= 1)", [idUser, today]);
        connection.$pool.end();
        const memories = [];
        for (const memory of memoriesData) {
            memories.push(new Memory(memory.id_memory, memory.id_user, memory.description, memory.description, memory.created_at, memory.updated_at))
        }
        return memories;
    }
}