export default class Memory {
    constructor(readonly idMemory: string, readonly idUser: string, readonly description: string, readonly done: boolean, readonly createdAt: Date, readonly updatedAt: Date | null = null) {
        if (this.description === "") throw new Error("Invalid description");
    }
}