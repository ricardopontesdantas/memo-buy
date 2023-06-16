import { MemoryRepository } from "./MemoryRepository";
import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";

export default class GetUndoneMemories {
    constructor(readonly memoryRepository: MemoryRepository = new MemoryRepositoryDatabase()) {}

    async execute(idUser: string, today: Date): Promise<any> {
        const output = await this.memoryRepository.listUndone(idUser, today);
        return output;
    }
}