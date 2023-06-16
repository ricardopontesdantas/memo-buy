import GetMemories from "../src/GetMemories";
import { MemoryRepository } from "../src/MemoryRepository";

let getMemories: GetMemories;
let memoryRepository: MemoryRepository;

beforeEach(() => {
    const memories = [
        {
            id_memory: "4339187a-bb11-470c-a397-107dd9ac89a5",
            id_user: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
            description: "Buy one something",
            done: false, 
            created_at: "2023-12-01T16:00:00.000Z"
        },
        {
            id_memory: "ac37b140-8e74-4955-ac3f-55a8c253211f",
            id_user: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
            description: "Buy two somethings",
            done: false, 
            created_at: "2023-12-01T16:00:00.000Z"
        },
        {
            id_memory: "8ba660ea-c266-4ef9-8120-565ed96c4623",
            id_user: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
            description: "Buy three somethings",
            done: false, 
            created_at: "2023-12-01T16:00:00.000Z"
        }
    ];
    memoryRepository = {
        async save(memory: any): Promise<void> {
            throw new Error("Function not implemented.");
        },
        async updateDone(idMemory: string, done: boolean): Promise<any> {
            throw new Error("Function not implemented.");
        },
        async list(idUser: string): Promise<any[]> {
            const output = memories.filter(memory => memory.id_user === idUser);
            return output;
        }
    }
    getMemories = new GetMemories(memoryRepository);
});

test("Should list memories using a fake", async function() {
    const input = {
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887"
    }
    const output = await getMemories.execute(input.idUser);
    expect(output).toHaveLength(3);
});