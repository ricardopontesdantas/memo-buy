import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";
import { MemoryRepository } from "./MemoryRepository";

export default class CreateMemory {
    constructor(readonly memoryRepository: MemoryRepository = new MemoryRepositoryDatabase()) {}

    async execute(input: Input): Promise<void> {
        if (input.description === "") throw new Error("Invalid description");
        const memory = {
            idMemory: input.idMemory,
            idUser: input.idUser,
            description: input.description,
            done: input.done,
            createdAt: input.date
        };
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