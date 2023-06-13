export interface MemoryRepository {
    save(memory: any): Promise<void>;
    updateDone(memoryId: string): Promise<any>;
}