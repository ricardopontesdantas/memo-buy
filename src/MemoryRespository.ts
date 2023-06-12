export interface MemoryRepository {
    save(memory: any): Promise<any>;
    updateDone(memoryId: string): Promise<any>;
}