import DatabaseConnection from "../database/DatabaseConnection";
import { MemoryRepository } from "../../application/repository/MemoryRepository";
import MemoryRepositoryDatabase from "../repository/MemoryRepositoryDatabase";
import RepositoryFactory from "../../application/factory/RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    constructor(readonly connection: DatabaseConnection) {}
    
    createMemoryRepository(): MemoryRepository {
        return new MemoryRepositoryDatabase(this.connection);
    }
}