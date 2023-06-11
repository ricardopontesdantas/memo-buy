export default class CreateMemory {
    async execute(input: Input): Promise<Output> {
        if (input.description === "") throw new Error("Invalid description");
        const memory = {
            memoryId: input.memoryId,
            description: input.description,
            done: false
        };
        return memory;
    }
}

type Input = {
    memoryId: string,
    description: string
}

type Output = {
    memoryId: string,
    description: string,
    done: boolean
}