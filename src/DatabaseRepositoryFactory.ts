import { MemoryRepository } from "./MemoryRepository";
import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";
import RepositoryFactory from "./RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    createMemoryRepository(): MemoryRepository {
        return new MemoryRepositoryDatabase();
    }
}