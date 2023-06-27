import axios from "axios";
import crypto from "crypto";

axios.defaults.validateStatus = function() {
    return true;
}

test("Should create a new memory", async function() {
    const input = {
        idMemory: crypto.randomUUID(),
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
        description: "Buy something",
        done: false,
        date: new Date("2023-12-01T10:00:00")
    };
    const response = await axios.post("http://localhost:3000/memories", input);
    expect(response.status).toBe(200);
});

test("Should not create a new memory with an invalid description", async function() {
    const input = {
        description: ""
    };
    const response = await axios.post("http://localhost:3000/memories", input);
    const output = response.data;
    expect(response.status).toBe(422);
    expect(output.message).toBe("Invalid description");
});

test("Should update status done with true if memory exists", async function() {
    const idMemory = crypto.randomUUID();
    const memory = {
        idMemory,
        idUser: "fe103b13-e357-4c6c-9aaf-dbe671f18887",
        description: "Buy something",
        done: false,
        date: new Date("2023-12-01T10:00:00")
    };
    await axios.post("http://localhost:3000/memories", memory);
    const input = {
        done: true
    };
    const response = await axios.patch(`http://localhost:3000/memories/${idMemory}/done`, input);
    const output = response.data;
    expect(output.done).toBe(true);
    expect(output.idMemory).toBe(idMemory);
});

test("Should list undone memories from an user", async function() {
    const idMemory = crypto.randomUUID();
    const idUser = "fe103b13-e357-4c6c-9aaf-dbe671f18887";
    const memory = {
        idMemory,
        idUser,
        description: "Buy something",
        done: false,
        date: new Date("2023-12-01T10:00:00")
    };
    await axios.post("http://localhost:3000/memories", memory);
    const response = await axios.get(`http://localhost:3000/memories/user/${idUser}`);
    const output = response.data;
    expect(output.length > 0).toBe(true);
});