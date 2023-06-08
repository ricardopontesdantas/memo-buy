import axios from "axios";

axios.defaults.validateStatus = function() {
    return true;
}

test("Should create a new memory", async function() {
    const input = {
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
    expect(output.message).toBe("Invalid description");
});