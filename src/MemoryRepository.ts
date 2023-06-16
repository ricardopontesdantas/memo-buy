export interface MemoryRepository {
    save(memory: any): Promise<void>;
    updateDone(idMemory: string, done: boolean): Promise<any>;
    listUndone(idUser: string, today: Date): Promise<any[]>;
}