import { MemoryRepository } from "../../application/repository/MemoryRepository";
import Memory from "../../domain/entity/Memory";
import DatabaseConnection from "../database/DatabaseConnection";

export default class MemoryRepositoryDatabase implements MemoryRepository {
    constructor(readonly connection: DatabaseConnection) {}

    async save(memory: Memory): Promise<void> {
        await this.connection.query("insert into memobuy.memory (id_memory, id_user, description, done, created_at) values ($1, $2, $3, $4, $5)", [memory.idMemory, memory.idUser, memory.description, memory.done, memory.createdAt]);
    }

    async updateDone(idMemory: string, done: boolean): Promise<Memory> {
        const updatedAt = done === true ? "current_timestamp" : null;
        await this.connection.query(`update memobuy.memory set done = $1, updated_at = ${updatedAt} where id_memory = $2`, [done, idMemory]);
        const [memoryData] = await this.connection.query("select * from memobuy.memory where id_memory = $1", [idMemory]);
        return new Memory(memoryData.id_memory, memoryData.id_user, memoryData.description, memoryData.done, memoryData.created_at, memoryData.updated_at);
    }

    async listUndone(idUser: string, today: Date): Promise<Memory[]> {
        const memoriesData = await this.connection.query("select * from memobuy.memory where id_user = $1 and (done = false or extract(day from $2::timestamp - updated_at) <= 1)", [idUser, today]);
        const memories = [];
        for (const memory of memoriesData) {
            memories.push(new Memory(memory.id_memory, memory.id_user, memory.description, memory.description, memory.created_at, memory.updated_at))
        }
        return memories;
    }
}