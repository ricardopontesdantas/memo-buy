import sinon from "sinon";
import GetUndoneMemories from "../../src/application/usecase/GetUndoneMemories";
import { MemoryRepository } from "../../src/application/repository/MemoryRepository";
import MemoryRepositoryDatabase from "../../src/infra/repository/MemoryRepositoryDatabase";
import Memory from "../../src/domain/entity/Memory";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";

let getUndoneMemories: GetUndoneMemories;
let connection: DatabaseConnection;

beforeEach(async () => {
    connection = new PgPromiseAdapter();
    await connection.connect();
    const repositoryFactory = new DatabaseRepositoryFactory(connection);
    getUndoneMemories = new GetUndoneMemories(repositoryFactory);
});

test("Should list undone memories using a stub", async function() {
    const memoryRepositoryStub = sinon.stub(MemoryRepositoryDatabase.prototype, "listUndone").resolves([
        new Memory("060a3604-98ff-4977-8065-45fd7e593cf7", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy something", false, new Date("2023-12-03T10:00:00"), null)
    ]);
    const idUser = "fe103b13-e357-4c6c-9aaf-dbe671f18887";
    const output = await getUndoneMemories.execute(idUser, new Date("2023-12-03T10:00:00"));
    expect(output.length).toBe(1);
    memoryRepositoryStub.restore();
});

afterEach(async () => {
    await connection.close();
});