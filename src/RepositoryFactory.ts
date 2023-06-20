import { MemoryRepository } from "./MemoryRepository";

export default interface RepositoryFactory {
    createMemoryRepository(): MemoryRepository;
}