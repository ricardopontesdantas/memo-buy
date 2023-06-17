import Memory from "../src/Memory";

test("Should be create a memory", async function() {
    const memory = new Memory("0bbed485-e186-473c-ab60-3e04aed388fd", "fe103b13-e357-4c6c-9aaf-dbe671f18887", "Buy something", false, new Date("2023-12-01:10:00:00"));
    expect(memory.idMemory).toBe("0bbed485-e186-473c-ab60-3e04aed388fd");
    expect(memory.description).toBe("Buy something");
});