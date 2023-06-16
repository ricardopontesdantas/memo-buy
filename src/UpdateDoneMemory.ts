import { MemoryRepository } from "./MemoryRepository";
import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";

export default class UpdateDoneMemory {
    constructor(readonly memoryRepository: MemoryRepository = new MemoryRepositoryDatabase()) {}

    async execute(idMemory: string, done: boolean): Promise<any> {
        const memory = await this.memoryRepository.updateDone(idMemory, done);
        return memory;
    }
}