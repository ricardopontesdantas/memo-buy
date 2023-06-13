export default class CreateMemory {
    async execute(input: Input): Promise<Output> {
        if (input.description === "") throw new Error("Invalid description");
        const memory = {
            idMemory: input.idMemory,
            description: input.description,
            done: false
        };
        return memory;
    }
}

type Input = {
    idMemory: string,
    description: string
}

type Output = {
    idMemory: string,
    description: string,
    done: boolean
}