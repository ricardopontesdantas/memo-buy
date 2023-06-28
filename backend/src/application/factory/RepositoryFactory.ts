import { MemoryRepository } from "../repository/MemoryRepository";

export default interface RepositoryFactory {
    createMemoryRepository(): MemoryRepository;
}