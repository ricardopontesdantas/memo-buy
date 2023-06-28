import Memory from "../../domain/entity/Memory";

export interface MemoryRepository {
    save(memory: Memory): Promise<void>;
    updateDone(idMemory: string, done: boolean): Promise<Memory>;
    listUndone(idUser: string, today: Date): Promise<Memory[]>;
}