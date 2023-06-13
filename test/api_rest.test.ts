import axios from "axios";

axios.defaults.validateStatus = function() {
    return true;
}

test("Should create a new memory", async function() {
    const input = {
        idMemory: "ac37b140-8e74-4955-ac3f-55a8c253211f",
        description: "Buy something"
    };
    const response = await axios.post("http://localhost:3000/memories", input);
    expect(response.status).toBe(201);
});

test("Should not create a new memory with an empty description", async function() {
    const input = {
        description: ""
    };
    const response = await axios.post("http://localhost:3000/memories", input);
    const output = response.data;
    expect(response.status).toBe(422);
    expect(output.message).toBe("Invalid description");
});

test("Should update status done with true if memory exists", async function() {
    const idMemory = "63b0948a-f587-4a05-a1e3-48a83d160c1c";
    const memory = {
        idMemory,
        description: "Buy something",
        done: false
    };
    await axios.post("http://localhost:3000/memories", memory);
    const input = {
        done: true
    };
    const response = await axios.patch(`http://localhost:3000/memories/${idMemory}/done`, input);
    const output = response.data;
    expect(output.done).toBe(true);
});
