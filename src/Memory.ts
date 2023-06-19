export default class Memory {
    done: boolean;

    constructor(readonly idMemory: string, readonly idUser: string, readonly description: string, done: boolean, readonly createdAt: Date, readonly updatedAt: Date | null = null) {
        if (this.description === "") throw new Error("Invalid description");
        this.done = done;
    }

    updateDone(status: boolean) {
        this.done = status;
    }
}