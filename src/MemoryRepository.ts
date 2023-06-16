export interface MemoryRepository {
    save(memory: any): Promise<void>;
    updateDone(idMemory: string, done: boolean): Promise<any>;
    list(idUser: string): Promise<any[]>;
}