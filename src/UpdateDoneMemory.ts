import { MemoryRepository } from "./MemoryRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class UpdateDoneMemory {
    memoryRepository: MemoryRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.memoryRepository = repositoryFactory.createMemoryRepository();
    }

    async execute(idMemory: string, done: boolean): Promise<any> {
        return await this.memoryRepository.updateDone(idMemory, done);
    }
}