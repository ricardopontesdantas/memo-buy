import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";
import { MemoryRepository } from "./MemoryRepository";
import Memory from "./Memory";

export default class CreateMemory {
    constructor(readonly memoryRepository: MemoryRepository = new MemoryRepositoryDatabase()) {}

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