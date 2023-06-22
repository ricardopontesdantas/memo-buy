import CreateMemory from "../src/CreateMemory";
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";
import UpdateDoneMemory from "../src/UpdateDoneMemory";
import crypto from "crypto";

let createMemory: CreateMemory;
let updateDoneMemory: UpdateDoneMemory;

beforeEach(() => {
    const repositoryFactory = new DatabaseRepositoryFactory();
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