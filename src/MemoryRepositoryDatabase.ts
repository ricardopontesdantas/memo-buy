import pgp from "pg-promise";
import { MemoryRepository } from "./MemoryRepository";

export default class MemoryRepositoryDatabase implements MemoryRepository {
    async save(memory: any): Promise<void> {
        const connection = pgp()("postgres://docker:ignite@localhost:5432/local");
        await connection.query("insert into memobuy.memory (id_memory, id_user, description, done, created_at) values ($1, $2, $3, $4, $5)", [memory.idMemory, memory.idUser, memory.description, memory.done, memory.createdAt]);
        connection.$pool.end();
    }

    async updateDone(idMemory: string, done: boolean): Promise<any> {
        const connection = pgp()("postgres://docker:ignite@localhost:5432/local");
        await connection.query("update memobuy.memory set done = $1 where id_memory = $2", [done, idMemory]);
        const [updatedMemory] = await connection.query("select * from memobuy.memory where id_memory = $1", [idMemory]);
        connection.$pool.end();
        return { idMemory: updatedMemory.id_memory, done: updatedMemory.done }
    }

    async list(idUser: string): Promise<any[]> {
        const connection = pgp()("postgres://docker:ignite@localhost:5432/local");
        const memoriesData = await connection.query("select * from memobuy.memory where id_user = $1", [idUser]);
        connection.$pool.end();
        return memoriesData;
    }
}