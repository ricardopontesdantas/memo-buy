import CreateMemory from "../src/CreateMemory";

test("Should create a new memory", async function() {
    const input = {
        idMemory: "ac37b140-8e74-4955-ac3f-55a8c253211f",
        description: "Buy something"
    };
    const createMemory = new CreateMemory();
    const output = await createMemory.execute(input);
    expect(output.idMemory).toBe("ac37b140-8e74-4955-ac3f-55a8c253211f");
});

test("Should not create a new memory with an empty description", async function() {
    const input = {
        idMemory: "ac37b140-8e74-4955-ac3f-55a8c253211f",
        description: ""
    };
    const createMemory = new CreateMemory();
    expect(() => createMemory.execute(input)).rejects.toThrow(new Error("Invalid description"));
});