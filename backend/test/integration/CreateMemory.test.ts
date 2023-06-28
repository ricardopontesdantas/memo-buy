import sinon from "sinon";
import CreateMemory from "../../src/application/usecase/CreateMemory";
import MemoryRepositoryDatabase from "../../src/infra/repository/MemoryRepositoryDatabase";
import crypto from "crypto";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";

let createMemory: CreateMemory;
let connection: DatabaseConnection;

beforeEach(async () => {
    connection = new PgPromiseAdapter();
    await connection.connect();
    const repositoryFactory = new DatabaseRepositoryFactory(connection);
    createMemory = new CreateMemory(repositoryFactory);
});

test("Should create a new memory using a spy", async function() {
    const memoryRepositorySpy = sinon.spy(MemoryRepositoryDatabase.prototype, "save");
    const input = {
        idMemory: crypto.randomUUID(),
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
        description: "Buy something",
        done: false,
        date: new Date("2023-12-01T10:00:00")
    };
    await createMemory.execute(input);
    expect(memoryRepositorySpy.calledOnce).toBe(true);
    memoryRepositorySpy.restore();
});

test("Should not create a new memory with an empty description", async function() {
    const input = {
        idMemory: crypto.randomUUID(),
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
        description: "",
        done: false,
        date: new Date("2023-12-01T10:00:00")
    };
    expect(() => createMemory.execute(input)).rejects.toThrow(new Error("Invalid description"));
});

afterEach(async () => {
    await connection.close();
});