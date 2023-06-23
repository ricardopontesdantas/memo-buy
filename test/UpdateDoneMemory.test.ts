import CreateMemory from "../src/CreateMemory";
import DatabaseConnection from "../src/DatabaseConnection";
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
import UpdateDoneMemory from "../src/UpdateDoneMemory";
import crypto from "crypto";

let createMemory: CreateMemory;
let updateDoneMemory: UpdateDoneMemory;
let connection: DatabaseConnection;

beforeEach(async () => {
    connection = new PgPromiseAdapter();
    await connection.connect();
    const repositoryFactory = new DatabaseRepositoryFactory(connection);
    createMemory = new CreateMemory(repositoryFactory);
    updateDoneMemory = new UpdateDoneMemory(repositoryFactory);
});

test("Should update a done memory with true", async function() {
    const memory = {
        idMemory: crypto.randomUUID(),
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
        description: "Buy something",
        done: false,
        date: new Date("2023-12-01T10:00:00")
    };
    await createMemory.execute(memory);
    const output = await updateDoneMemory.execute(memory.idMemory, true);
    expect(output.done).toBe(true);
});

test("Should update a done memory with false", async function() {
    const memory = {
        idMemory: crypto.randomUUID(),
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
        description: "Buy something",
        done: false,
        date: new Date("2023-12-01T10:00:00")
    };
    await createMemory.execute(memory);
    await updateDoneMemory.execute(memory.idMemory, true);
    const output = await updateDoneMemory.execute(memory.idMemory, false);
    expect(output.done).toBe(false);
});

afterEach(async () => {
    await connection.close();
});