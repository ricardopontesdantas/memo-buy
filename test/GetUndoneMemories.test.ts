import sinon from "sinon";
import GetUndoneMemories from "../src/GetUndoneMemories";
import { MemoryRepository } from "../src/MemoryRepository";
import MemoryRepositoryDatabase from "../src/MemoryRepositoryDatabase";
import Memory from "../src/Memory";

let getUndoneMemories: GetUndoneMemories;
let memoryRepository: MemoryRepository;

beforeEach(() => {
    const memories = [
        new Memory("4339187a-bb11-470c-a397-107dd9ac89a5", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy one something", false, new Date("2023-12-01T10:00:00"), null),
        new Memory("ac37b140-8e74-4955-ac3f-55a8c253211f", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy two somethings", true, new Date("2023-12-01T10:00:00"), new Date("2023-12-01T11:00:00")),
        new Memory("8ba660ea-c266-4ef9-8120-565ed96c4623", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy three somethings", false, new Date("2023-12-02T10:00:00"), null),
        new Memory("b6dd327e-606e-4067-b608-6ae56e2e1d91", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy four somethings", true, new Date("2023-12-02T10:00:00"), new Date("2023-12-02T11:00:00")),
        new Memory("752aed9c-de2d-478d-9cfc-c9d7817b0450", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy five somethings", false, new Date("2023-12-03T10:00:00"), null),
        new Memory("ef5dcde9-9671-4146-935e-257c859ed306", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy six somethings", true, new Date("2023-12-03T10:00:00"), new Date("2023-12-03T11:00:00"))
    ];
    memoryRepository = {
        async save(memory: any): Promise<void> {
            throw new Error("Function not implemented.");
        },
        async updateDone(idMemory: string, done: boolean): Promise<any> {
            throw new Error("Function not implemented.");
        },
        async listUndone(idUser: string, today: Date): Promise<any[]> {
            const output = memories.filter(memory => {
                const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
                const differenceBetweenTodayAndUpdatedAt = memory.updatedAt ? today.getTime() - new Date(memory.updatedAt).getTime() : 0;
                return memory.idUser === idUser && (memory.done === false || differenceBetweenTodayAndUpdatedAt < oneDayInMilliseconds)
            });
            return output;
        }
    }
    getUndoneMemories = new GetUndoneMemories(memoryRepository);
});

test("Should list undone memories using a fake", async function() {
    const input = {
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
        today: new Date("2023-12-03T10:00:00")
    }
    const output = await getUndoneMemories.execute(input.idUser, input.today);
    expect(output).toHaveLength(5);
});

test("Should list undone memories using a stub", async function() {
    const memoryRepositoryStub = sinon.stub(MemoryRepositoryDatabase.prototype, "listUndone").resolves([
        new Memory("060a3604-98ff-4977-8065-45fd7e593cf7", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy something", false, new Date("2023-12-03T10:00:00"), null)
    ]);
    const getUndoneMemories = new GetUndoneMemories();
    const idUser = "fe103b13-e357-4c6c-9aaf-dbe671f18887";
    const output = await getUndoneMemories.execute(idUser, new Date("2023-12-03T10:00:00"));
    expect(output.length).toBe(1);
    memoryRepositoryStub.restore();
});