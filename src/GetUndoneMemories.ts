import { MemoryRepository } from "./MemoryRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class GetUndoneMemories {
    memoryRepository: MemoryRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.memoryRepository = repositoryFactory.createMemoryRepository();
    }

    async execute(idUser: string, today: Date): Promise<any> {
        return await this.memoryRepository.listUndone(idUser, today);
    }
}