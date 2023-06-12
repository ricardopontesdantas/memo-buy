import { MemoryRepository } from "./MemoryRespository";

export default class MemoryRepositoryInMemory implements MemoryRepository {
    save(memory: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateDone(memoryId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}