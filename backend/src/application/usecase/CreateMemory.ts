import { MemoryRepository } from "../repository/MemoryRepository";
import Memory from "../../domain/entity/Memory";
import RepositoryFactory from "../factory/RepositoryFactory";

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