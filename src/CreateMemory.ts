import { MemoryRepository } from "./MemoryRepository";
import Memory from "./Memory";
import RepositoryFactory from "./RepositoryFactory";

export default class CreateMemory {
    memoryRepository: MemoryRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.memoryRepository = repositoryFactory.createMemoryRepository();
    }

    async execute(input: Input): Promise<void> {
        const memory = new Memory(
            input.idMemory,
            input.idUser,
            input.description,
            input.done,
            input.date
        );
        await this.memoryRepository.save(memory);
    }
}

type Input = {
    idMemory: string,
    idUser: string,
    description: string,
    done: boolean,
    date: Date
}