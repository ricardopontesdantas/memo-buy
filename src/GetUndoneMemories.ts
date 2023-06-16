import { MemoryRepository } from "./MemoryRepository";
import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";

export default class GetUndoneMemories {
    constructor(readonly memoryRepository: MemoryRepository = new MemoryRepositoryDatabase()) {}

    async execute(idUser: string, today: Date): Promise<any> {
        return await this.memoryRepository.listUndone(idUser, today);
    }
}