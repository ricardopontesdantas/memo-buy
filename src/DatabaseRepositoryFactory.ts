import DatabaseConnection from "./DatabaseConnection";
import { MemoryRepository } from "./MemoryRepository";
import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";
import RepositoryFactory from "./RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    constructor(readonly connection: DatabaseConnection) {}
    
    createMemoryRepository(): MemoryRepository {
        return new MemoryRepositoryDatabase(this.connection);
    }
}